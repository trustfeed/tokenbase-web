import * as React from 'react';
import {
  FormText,
  FormFeedback,
  Col,
  Row,
  Input,
  FormGroup,
  Button,
  Card,
  CardBody,
  Container,
  Form
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { paths } from 'src/routes';
import { PASSWORD_REGEX, EMAIL_REGEX } from '../../utils/regex';
import { getInputValidationState } from 'src/utils/helpers';

interface IProps {
  t: (key: string) => string;
  handleSignIn: (email: string, password: string) => void;
}
interface IState {
  email: string;
  isEmailValid: boolean;
  isEmailInvalid: boolean;

  password: string;
  isPasswordValid: boolean;
  isPasswordInvalid: boolean;
}

class LoginCard extends React.Component<IProps, IState> {
  public readonly state: IState = {
    email: '',
    isEmailValid: false,
    isEmailInvalid: false,

    password: '',
    isPasswordValid: false,
    isPasswordInvalid: false
  };

  public render() {
    const { t } = this.props;
    const { isEmailInvalid, isPasswordInvalid, isEmailValid, isPasswordValid } = this.state;

    return (
      <Row>
        <Col sm={10} md={8} lg={5} className="mr-auto ml-auto">
          <Container>
            <Card className="login-card">
              <CardBody>
                <h3 className="text-center">{t('login.title')}</h3>
                <br />
                <Form>
                  <FormGroup>
                    <Input
                      type="text"
                      data-test-id="my-email-input"
                      value={this.state.email}
                      onChange={this.changeEmail}
                      valid={this.state.isEmailValid}
                      invalid={this.state.isEmailInvalid}
                      placeholder={t('signup.email')}
                      autoComplete="new-password"
                      maxLength={32}
                    />
                    <FormFeedback>{t('signup.emailInvalidMessage')}</FormFeedback>
                    <FormFeedback valid={true}>{t('signup.emailValidMessage')}</FormFeedback>
                    {!(isEmailValid || isEmailInvalid) ? (
                      <FormText>{t('signup.emailMessage')}</FormText>
                    ) : null}
                  </FormGroup>

                  <FormGroup>
                    <Input
                      type="password"
                      data-test-id="my-password-input"
                      value={this.state.password}
                      onChange={this.changePassword}
                      valid={this.state.isPasswordValid}
                      invalid={this.state.isPasswordInvalid}
                      placeholder={t('signup.password')}
                      autoComplete="new-password"
                      maxLength={32}
                    />

                    <FormFeedback>{t('signup.passwordInvalidMessage')}</FormFeedback>
                    <FormFeedback valid={true}>{t('signup.passwordValidMessage')}</FormFeedback>
                    {!(isPasswordValid || isPasswordInvalid) ? (
                      <FormText>{t('signup.passwordMessage')}</FormText>
                    ) : null}
                  </FormGroup>
                  <br />
                  <div className="text-center">
                    <Button onClick={this.onSubmit} color="primary">
                      {t('login.submit')}
                    </Button>
                  </div>
                </Form>
                <br />
                <div className="float-left">
                  <small>
                    <Link to={paths.login}>{t('login.forgotPassword')}</Link>
                  </small>
                </div>
                <div className="float-right">
                  <small>
                    <Link to={paths.signup}>{t('login.linkToSignUp')}</Link>
                  </small>
                </div>
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
    );
  }

  private changeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const value = e.target.value;
    const key = 'Email';
    const regex = EMAIL_REGEX;
    const validationResult = getInputValidationState(key, value, regex);
    this.setState({ ...validationResult, email: value });
  };

  private changePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const value = e.target.value;
    const key = 'Password';
    const regex = PASSWORD_REGEX;
    const validationResult = getInputValidationState(key, value, regex);
    this.setState({ ...validationResult, password: value });
  };

  private onSubmit = (): void => {
    const { password, email } = this.state;
    this.props.handleSignIn(email, password);
  };
}

export default LoginCard;
