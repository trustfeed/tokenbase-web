import * as React from 'react';

import { Row, Col, Input, Label, FormGroup, Button, Form, FormFeedback } from 'reactstrap';
import { ALPHANUMERIC_REGEX, ALPHABETIC_REGEX } from 'src/utils/regex';

interface IProps {
  t: (key: string) => string;
  onSubmit: (body) => void;
}

interface IState {
  id: string;
  tokenName: string;
  tokenSymbol: string;
  isMinted: boolean;

  isTokenNameValid: boolean;
  isTokenNameInvalid: boolean;
  isTokenSymbolValid: boolean;
  isTokenSymbolInvalid: boolean;
}

export default class CreateTokenForm extends React.Component<IProps, IState> {
  public readonly state: IState = {
    id: '',
    tokenName: '',
    tokenSymbol: '',
    isMinted: false,

    isTokenNameInvalid: false,
    isTokenNameValid: false,
    isTokenSymbolValid: false,
    isTokenSymbolInvalid: false
  };

  public render(): React.ReactNode {
    const { t, onSubmit } = this.props;
    const colLabel = 4;
    const colInput = 12 - colLabel;

    return (
      <Form>
        <Row>
          <Col sm={12} md={12} lg={10} className="mr-auto ml-auto">
            <FormGroup row={true}>
              <Label className="text-left" for="token-name" sm={colLabel}>
                {t('createToken.name')}
              </Label>
              <Col sm={colInput}>
                <Input
                  type="text"
                  data-test-id="token-name-input"
                  value={this.state.tokenName}
                  onChange={this.changeTokenName}
                  maxLength={20}
                  placeholder="Sample Token"
                  autoComplete="new-password"
                  invalid={this.state.isTokenNameInvalid}
                  valid={this.state.isTokenNameValid}
                />
                <FormFeedback>{t('createToken.tokenNameInvalid')}</FormFeedback>
                <FormFeedback valid={true}>{t('createToken.tokenNameValid')}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Label className="text-left" for="token-symbol" sm={colLabel}>
                {t('createToken.symbol')}
              </Label>
              <Col sm={colInput}>
                <Input
                  type="text"
                  data-test-id="token-symbol-input"
                  value={this.state.tokenSymbol}
                  onChange={this.changeTokenSymbol}
                  invalid={this.state.isTokenSymbolInvalid}
                  valid={this.state.isTokenSymbolValid}
                  placeholder="ST"
                  autoComplete="new-password"
                  maxLength={6}
                />
                <FormFeedback>{t('createToken.tokenSymbolInvalid')}</FormFeedback>
                <FormFeedback valid={true}>{t('createToken.tokenSymbolValid')}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Label className="text-left" for="is-mintable" sm={colLabel}>
                {t('createToken.isMintable')}
              </Label>
              <Col sm={colInput}>
                <FormGroup check={true}>
                  <Label check={true}>
                    <Input
                      name="is-mintable"
                      type="checkbox"
                      className="form-check-input"
                      checked={this.state.isMinted}
                    />{' '}
                    <span className="form-check-sign">{'Mintable'}</span>
                  </Label>
                </FormGroup>
              </Col>
            </FormGroup>
          </Col>
          <Col sm={12} md={12} lg={12}>
            <div className="py-3 text-center">
              <Button color="primary" onSubmit={onSubmit}>
                {t('createToken.submit')}
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }

  private changeTokenName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    this.setState({ tokenName: e.target.value }, this.validateTokenName);
  };

  private validateTokenName = (): void => {
    const { tokenName } = this.state;
    const isTokenNameValid: boolean = ALPHANUMERIC_REGEX.test(tokenName);
    if (!tokenName) {
      return this.setState({ isTokenNameValid: false, isTokenNameInvalid: false });
    }
    if (isTokenNameValid) {
      this.setState({ isTokenNameValid: true, isTokenNameInvalid: false });
    } else {
      this.setState({ isTokenNameValid: false, isTokenNameInvalid: true });
    }
  };

  private changeTokenSymbol = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    this.setState({ tokenSymbol: e.target.value }, this.validateTokenSymbol);
  };

  private validateTokenSymbol = (): void => {
    const { tokenSymbol } = this.state;
    const isTokenSymbolValid: boolean = ALPHABETIC_REGEX.test(tokenSymbol);
    if (!tokenSymbol) {
      return this.setState({ isTokenNameValid: false, isTokenSymbolInvalid: false });
    }
    if (isTokenSymbolValid) {
      this.setState({ isTokenSymbolValid: true, isTokenSymbolInvalid: false });
    } else {
      this.setState({ isTokenSymbolValid: false, isTokenSymbolInvalid: true });
    }
  };
}
