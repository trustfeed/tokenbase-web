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
import { PASSWORD_REGEXP, EMAIL_REGEXP } from 'src/utils/validators/regex';

interface IState {
  email: string;
  isEmailValid: boolean;
  isEmailInvalid: boolean;

  password: string;
  isPasswordValid: boolean;
  isPasswordInvalid: boolean;
}

class LoginCard extends React.Component<{}, {}> {
  public readonly state: IState = {
    email: '',
    isEmailValid: false,
    isEmailInvalid: false,

    password: '',
    isPasswordValid: false,
    isPasswordInvalid: false
  };

  public render() {
    const t = s => s;
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
                    <Button color="primary">{t('login.submit')}</Button>
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
    this.setState({ email: e.target.value }, this.validateEmail);
  };

  private validateEmail = (): void => {
    const { email } = this.state;
    const isEmailValid: boolean = EMAIL_REGEXP.test(email);
    if (!email) {
      return this.setState({ isEmailValid: false, isEmailInvalid: false });
    }
    if (isEmailValid) {
      this.setState({ isEmailValid: true, isEmailInvalid: false });
    } else {
      this.setState({ isEmailValid: false, isEmailInvalid: true });
    }
  };

  private changePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    this.setState(
      {
        password: e.target.value,
        password2: '',
        isPassword2Valid: false,
        isPassword2Invalid: false
      },
      this.validatePassword
    );
  };

  private validatePassword = (): void => {
    const { password } = this.state;
    const isValid: boolean = PASSWORD_REGEXP.test(password);
    if (!password) {
      return this.setState({ isPasswordValid: false, isPasswordInvalid: false });
    }
    if (isValid) {
      this.setState({ isPasswordValid: true, isPasswordInvalid: false });
    } else {
      this.setState({ isPasswordValid: false, isPasswordInvalid: true });
    }
  };
}

export default LoginCard;
