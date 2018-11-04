import * as React from 'react';
import { FormText, FormFeedback, Input, FormGroup, Form } from 'reactstrap';
import { EMAIL_REGEX } from '../../utils/regex';
import { getInputValidationState } from 'src/utils/helpers';

interface IProps {
  t: (key: string) => string;
  handlePasswordResetRequest: (email: string) => void;
}
interface IState {
  email: string;
  emailValid: boolean;
  emailInvalid: boolean;
}

export default class PasswordResetForm extends React.Component<IProps, IState> {
  public readonly state: IState = {
    email: '',
    emailValid: false,
    emailInvalid: false
  };

  public render() {
    const { t } = this.props;
    const { emailInvalid, emailValid } = this.state;

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
            placeholder={t('signup.email')}
            autoComplete="new-password"
            maxLength={32}
          />
          <FormFeedback>{t('signup.emailInvalidMessage')}</FormFeedback>
          <FormFeedback valid={true}>{t('signup.emailValidMessage')}</FormFeedback>
          {!(emailValid || emailInvalid) ? <FormText>{t('signup.emailMessage')}</FormText> : null}
        </FormGroup>
        <br />
        <div className="text-center">
          <button className="btn btn-outline-primary" onClick={this.onSubmit}>
            {t('login.submit')}
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

  private onSubmit = (e): void => {
    e.preventDefault();
    const email: string = this.state.email;
    if (email === undefined) {
      return;
    }

    this.props.handlePasswordResetRequest(email);
  };
}
