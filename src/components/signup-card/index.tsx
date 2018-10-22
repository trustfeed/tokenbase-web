import * as React from 'react';
import {
  FormFeedback,
  FormText,
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
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../utils/regex';

interface IProps {
  t: (key: string) => string;
  handleSignUp: (email: string, password: string) => void;
}
interface IState {
  email: string;
  isEmailValid: boolean;
  isEmailInvalid: boolean;

  password: string;
  isPasswordValid: boolean;
  isPasswordInvalid: boolean;

  password2: string;
  isPassword2Valid: boolean;
  isPassword2Invalid: boolean;
}

class LoginCard extends React.Component<IProps, IState> {
  public readonly state: IState = {
    email: '',
    isEmailValid: false,
    isEmailInvalid: false,

    password: '',
    isPasswordValid: false,
    isPasswordInvalid: false,

    password2: '',
    isPassword2Valid: false,
    isPassword2Invalid: false
  };
  public render() {
    const t = (s) => s;
    const {
      isEmailInvalid,
      isPasswordInvalid,
      isPassword2Invalid,
      isEmailValid,
      isPassword2Valid,
      isPasswordValid
    } = this.state;

    const isSubmitDisabled =
      isEmailInvalid ||
      isPasswordInvalid ||
      isPassword2Invalid ||
      !(isEmailValid && isPassword2Valid && isPasswordValid);

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
                  <br />
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
                  <FormGroup>
                    <Input
                      type="password"
                      data-test-id="my-password2-input"
                      value={this.state.password2}
                      onChange={this.changePassword2}
                      valid={this.state.isPassword2Valid}
                      invalid={this.state.isPassword2Invalid}
                      placeholder={t('signup.password2')}
                      autoComplete="new-password2"
                      maxLength={32}
                    />

                    <FormFeedback>{t('signup.password2InvalidMessage')}</FormFeedback>
                    <FormFeedback valid={true}>{t('signup.password2ValidMessage')}</FormFeedback>
                    {!(isPassword2Valid || isPassword2Invalid) ? (
                      <FormText>{t('signup.password2Message')}</FormText>
                    ) : null}
                  </FormGroup>
                  <br />
                  <div className="text-center">
                    <Button color="primary" onClick={this.onSubmit} disabled={isSubmitDisabled}>
                      {t('signup.submit')}
                    </Button>
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
    this.setState({ email: e.target.value }, this.validateEmail);
  };

  private validateEmail = (): void => {
    const { email } = this.state;
    const isEmailValid: boolean = EMAIL_REGEX.test(email);
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
    const isValid: boolean = PASSWORD_REGEX.test(password);
    if (!password) {
      return this.setState({ isPasswordValid: false, isPasswordInvalid: false });
    }
    if (isValid) {
      this.setState({ isPasswordValid: true, isPasswordInvalid: false });
    } else {
      this.setState({ isPasswordValid: false, isPasswordInvalid: true });
    }
  };

  private changePassword2 = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    this.setState({ password2: e.target.value }, this.validatePassword2);
  };

  private validatePassword2 = (): void => {
    const { password, password2 } = this.state;
    const isSamePassword = password2 === password;
    if (!password2) {
      return this.setState({ isPassword2Valid: false, isPassword2Invalid: false });
    }
    if (isSamePassword) {
      this.setState({ isPassword2Valid: true, isPassword2Invalid: false });
      if (!isSamePassword) {
        this.setState({ isPassword2Valid: false, isPassword2Invalid: true });
      }
    } else {
      this.setState({ isPassword2Valid: false, isPassword2Invalid: true });
    }
  };

  private onSubmit = (): void => {
    const { password, email } = this.state;
    this.props.handleSignUp(email, password);
  };
}

export default LoginCard;
