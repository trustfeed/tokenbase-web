import * as React from 'react';

import { Row, Col, Input, Label, FormGroup, Button, Form, FormFeedback } from 'reactstrap';
import { ALPHANUMERIC_REGEX, ALPHABETIC_REGEX } from 'src/utils/regex';
import { getInputValidationState } from '../../utils/helpers';

interface IProps {
  t: (key: string) => string;
  onSubmit: (body) => void;
}

interface IState {
  id: string;
  tokenName: string;
  tokenSymbol: string;
  isMintable: boolean;

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
    isMintable: false,

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
                      checked={this.state.isMintable}
                      onChange={this.checkMintable}
                      className="form-check-input"
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
    const value = e.target.value;
    const key = 'TokenName';
    const regex = ALPHANUMERIC_REGEX;
    const validationResult = getInputValidationState(key, value, regex);
    this.setState({ ...validationResult, tokenName: value });
  };

  private changeTokenSymbol = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const value = e.target.value;
    const key = 'TokenSymbol';
    const regex = ALPHABETIC_REGEX;
    const validationResult = getInputValidationState(key, value, regex);
    this.setState({ ...validationResult, tokenSymbol: value });
  };

  private checkMintable = (e) => {
    const target = e.target;
    const isMintable = target.checked;
    this.setState({ isMintable });
  };
}
