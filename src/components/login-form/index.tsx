import * as React from 'react';
import { FormText, FormFeedback, Input, FormGroup, Form } from 'reactstrap';

import { PASSWORD_REGEX, EMAIL_REGEX } from '../../utils/regex';
import { getInputValidationState } from 'src/utils/helpers';

interface IProps {
  t: (key: string) => string;
  handleSignIn: (email: string, password: string) => void;
}

interface IState {
  email: string;
  emailValid: boolean;
  emailInvalid: boolean;

  password: string;
  passwordValid: boolean;
  passwordInvalid: boolean;
}

export default class LoginForm extends React.Component<IProps, IState> {
  public readonly state: IState = {
    email: '',
    emailValid: false,
    emailInvalid: false,

    password: '',
    passwordValid: false,
    passwordInvalid: false
  };

  public render() {
    const { t } = this.props;
    const { emailInvalid, passwordInvalid, emailValid, passwordValid } = this.state;

    return (
      <Form>
        <FormGroup>
          <Input
            type="text"
            data-test-id="my-email-input"
            value={this.state.email}
            onChange={this.changeEmail}
            valid={this.state.emailValid}
            invalid={this.state.emailInvalid}
            placeholder={t('auth.email')}
            autoComplete="new-password"
            maxLength={32}
          />
          <FormFeedback>{t('signup.emailInvalidMessage')}</FormFeedback>
          <FormFeedback valid={true}>{t('signup.emailValidMessage')}</FormFeedback>
          {!(emailValid || emailInvalid) ? <FormText>{t('signup.emailMessage')}</FormText> : null}
        </FormGroup>

        <FormGroup>
          <Input
            type="password"
            data-test-id="my-password-input"
            value={this.state.password}
            onChange={this.changePassword}
            valid={this.state.passwordValid}
            invalid={this.state.passwordInvalid}
            placeholder={t('auth.password')}
            autoComplete="new-password"
            maxLength={32}
          />

          <FormFeedback>{t('signup.passwordInvalidMessage')}</FormFeedback>
          <FormFeedback valid={true}>{t('signup.passwordValidMessage')}</FormFeedback>
          {!(passwordValid || passwordInvalid) ? (
            <FormText>{t('auth.passwordMessage')}</FormText>
          ) : null}
        </FormGroup>
        <br />
        <div className="text-center">
          <button className="btn btn-outline-primary" onClick={this.onSubmit}>
            {t('form.submit')}
          </button>
        </div>
      </Form>
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

  private onSubmit = (e): void => {
    e.preventDefault();
    const { password, email } = this.state;
    this.props.handleSignIn(email, password);
  };
}
