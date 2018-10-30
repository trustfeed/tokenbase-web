import * as React from 'react';
import {
  FormFeedback,
  FormText,
  Col,
  Row,
  Input,
  FormGroup,
  Card,
  CardBody,
  Container,
  Form
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { paths } from 'src/routes';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../utils/regex';
import { getInputValidationState } from 'src/utils/helpers';

interface IProps {
  t: (key: string) => string;
  handleSignUp: (email: string, password: string) => void;
}
interface IState {
  email: string;
  emailValid: boolean;
  emailInvalid: boolean;

  password: string;
  passwordValid: boolean;
  passwordInvalid: boolean;

  password2: string;
  password2Valid: boolean;
  password2Invalid: boolean;
}

class LoginCard extends React.Component<IProps, IState> {
  public readonly state: IState = {
    email: '',
    emailValid: false,
    emailInvalid: false,

    password: '',
    passwordValid: false,
    passwordInvalid: false,

    password2: '',
    password2Valid: false,
    password2Invalid: false
  };
  public render() {
    const t = (s) => s;
    const {
      emailInvalid,
      passwordInvalid,
      password2Invalid,
      emailValid,
      password2Valid,
      passwordValid
    } = this.state;

    const isSubmitDisabled =
      emailInvalid ||
      passwordInvalid ||
      password2Invalid ||
      !(emailValid && password2Valid && passwordValid);

    return (
      <Row>
        <Col sm={10} md={8} lg={5} className="mr-auto ml-auto">
          <Container>
            <Card className="login-card">
              <CardBody>
                <h3 className="text-center">{t('signup.title')}</h3>
                <br />
                <Form>
                  <FormGroup>
                    <Input
                      type="text"
                      data-test-id="my-email-input"
                      value={this.state.email}
                      onChange={this.changeEmail}
                      valid={this.state.emailValid}
                      invalid={this.state.emailInvalid}
                      placeholder={t('signup.email')}
                      autoComplete="new-password"
                      maxLength={32}
                    />
                    <FormFeedback>{t('signup.emailInvalidMessage')}</FormFeedback>
                    <FormFeedback valid={true}>{t('signup.emailValidMessage')}</FormFeedback>
                    {!(emailValid || emailInvalid) ? (
                      <FormText>{t('signup.emailMessage')}</FormText>
                    ) : null}
                  </FormGroup>
                  <br />
                  <FormGroup>
                    <Input
                      type="password"
                      data-test-id="my-password-input"
                      value={this.state.password}
                      onChange={this.changePassword}
                      valid={this.state.passwordValid}
                      invalid={this.state.passwordInvalid}
                      placeholder={t('signup.password')}
                      autoComplete="new-password"
                      maxLength={32}
                    />

                    <FormFeedback>{t('signup.passwordInvalidMessage')}</FormFeedback>
                    <FormFeedback valid={true}>{t('signup.passwordValidMessage')}</FormFeedback>
                    {!(passwordValid || passwordInvalid) ? (
                      <FormText>{t('signup.passwordMessage')}</FormText>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="password"
                      data-test-id="my-password2-input"
                      value={this.state.password2}
                      onChange={this.changePassword2}
                      valid={this.state.password2Valid}
                      invalid={this.state.password2Invalid}
                      placeholder={t('signup.password2')}
                      autoComplete="new-password2"
                      maxLength={32}
                    />

                    <FormFeedback>{t('signup.password2InvalidMessage')}</FormFeedback>
                    <FormFeedback valid={true}>{t('signup.password2ValidMessage')}</FormFeedback>
                    {!(password2Valid || password2Invalid) ? (
                      <FormText>{t('signup.password2Message')}</FormText>
                    ) : null}
                  </FormGroup>
                  <br />
                  <div className="text-center">
                    <button
                      className="btn btn-outline-primary"
                      onClick={this.onSubmit}
                      disabled={isSubmitDisabled}
                    >
                      {t('signup.submit')}
                    </button>
                  </div>
                </Form>
                <br />

                <small>
                  <Link to={paths.login}>{'back to login'}</Link>
                </small>
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
    const key = 'email';
    const regex = EMAIL_REGEX;
    const validationResult = getInputValidationState(key, value, regex);
    this.setState({ ...validationResult, [key]: value });
  };

  private changePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const value = e.target.value;
    const key = 'password';
    const regex = PASSWORD_REGEX;
    const validationResult = getInputValidationState(key, value, regex);
    this.setState({ ...validationResult, [key]: value });
  };

  private changePassword2 = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { password } = this.state;
    const password2 = e.target.value;

    const isSamePassword = password2 === password;

    if (!password2) {
      return this.setState({ password2, password2Valid: false, password2Invalid: false });
    }
    if (isSamePassword) {
      this.setState({ password2, password2Valid: true, password2Invalid: false });
    } else {
      this.setState({ password2, password2Valid: false, password2Invalid: true });
    }
  };

  private onSubmit = (): void => {
    const { password, email } = this.state;
    this.props.handleSignUp(email, password);
  };
}

export default LoginCard;
