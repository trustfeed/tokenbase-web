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
  name: string;
  symbol: string;
  network: string;
  mintable: boolean;

  isTokenNameValid: boolean;
  isTokenNameInvalid: boolean;
  isTokenSymbolValid: boolean;
  isTokenSymbolInvalid: boolean;
}

export default class CreateTokenForm extends React.Component<IProps, IState> {
  public readonly state: IState = {
    id: '',
    name: '',
    symbol: '',
    network: 'rinkeby',
    mintable: false,

    isTokenNameInvalid: false,
    isTokenNameValid: false,
    isTokenSymbolValid: false,
    isTokenSymbolInvalid: false
  };

  public render(): React.ReactNode {
    const { t } = this.props;

    return (
      <Form>
        <Row>
          <Col xs={10} sm={8} md={7} lg={5} className="mr-auto ml-auto">
            <FormGroup>
              <Label className="text-left" for="token-name">
                {t('ethToken.name')}
              </Label>
              <Col>
                <div className="center">
                  <Input
                    type="text"
                    data-test-id="token-name-input"
                    value={this.state.name}
                    onChange={this.changeTokenName}
                    maxLength={20}
                    placeholder="Sample Token"
                    autoComplete="new-password"
                    invalid={this.state.isTokenNameInvalid}
                    valid={this.state.isTokenNameValid}
                  />
                  <FormFeedback>{t('ethToken.nameInvalid')}</FormFeedback>
                  <FormFeedback valid={true}>{t('ethToken.nameValid')}</FormFeedback>
                </div>
              </Col>
            </FormGroup>

            <FormGroup>
              <Label className="text-left" for="token-symbol">
                {t('ethToken.symbol')}
              </Label>
              <Col>
                <div className="center">
                  <Input
                    type="text"
                    data-test-id="token-symbol-input"
                    value={this.state.symbol}
                    onChange={this.changeTokenSymbol}
                    invalid={this.state.isTokenSymbolInvalid}
                    valid={this.state.isTokenSymbolValid}
                    placeholder="ST"
                    autoComplete="new-password"
                    maxLength={6}
                  />
                  <FormFeedback>{t('ethToken.symbolInvalid')}</FormFeedback>
                  <FormFeedback valid={true}>{t('ethToken.symbolValid')}</FormFeedback>
                </div>
              </Col>
            </FormGroup>
            <br />
            <FormGroup>
              <Label className="text-left" for="is-mintable">
                {t('ethToken.mintable')}
              </Label>
              <Col>
                <FormGroup check={true}>
                  <div className="center">
                    <Label check={true}>
                      <Input
                        name="is-mintable"
                        type="checkbox"
                        checked={this.state.mintable}
                        onChange={this.checkMintable}
                        className="form-check-input"
                      />
                      <span className="form-check-sign">{'Mintable'}</span>
                    </Label>
                  </div>
                </FormGroup>
              </Col>
            </FormGroup>
            <br />
            <FormGroup tag="fieldset">
              <Label className="text-left">{t('ethToken.network')}</Label>
              <FormGroup check={true}>
                <Label check={true}>
                  <Input
                    type="radio"
                    name="radio-network"
                    value="mainnet"
                    checked={this.state.network === 'mainnet'}
                    onChange={this.handleNetworkOptionChange}
                  />{' '}
                  <small>{t('ethToken.mainnet')}</small>
                </Label>
              </FormGroup>
              <FormGroup check={true}>
                <Label check={true}>
                  <Input
                    type="radio"
                    name="radio-network"
                    value="rinkeby"
                    checked={this.state.network === 'rinkeby'}
                    onChange={this.handleNetworkOptionChange}
                  />{' '}
                  <small>{t('ethToken.rinkeby')}</small>
                </Label>
              </FormGroup>
            </FormGroup>
            <br />
            <FormGroup>
              <Label className="text-left" for="minters">
                {t('ethToken.minters')}
              </Label>
              <Col>
                <div className="center">
                  <Input
                    type="text"
                    data-test-id="minters-input"
                    value={this.state.symbol}
                    onChange={this.changeTokenSymbol}
                    invalid={this.state.isTokenSymbolInvalid}
                    valid={this.state.isTokenSymbolValid}
                    placeholder="ethereum address"
                    autoComplete="new-password"
                    maxLength={6}
                  />
                  <FormFeedback>{t('ethToken.mintersInvalid')}</FormFeedback>
                  <FormFeedback valid={true}>{t('ethToken.mintersValid')}</FormFeedback>
                </div>
              </Col>
            </FormGroup>
          </Col>
          <Col sm={12} md={12} lg={12}>
            <div className="py-3 text-center">
              <Button color="primary" onClick={this.handleSubmit}>
                {t('ethToken.submit')}
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
    this.setState({ ...validationResult, name: value });
  };

  private changeTokenSymbol = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const value = e.target.value;
    const key = 'TokenSymbol';
    const regex = ALPHABETIC_REGEX;
    const validationResult = getInputValidationState(key, value, regex);
    this.setState({ ...validationResult, symbol: value });
  };

  private checkMintable = (e) => {
    const target = e.target;
    const mintable = target.checked;
    this.setState({ mintable });
  };

  private handleNetworkOptionChange = (e) => {
    this.setState({
      network: e.target.value
    });
  };

  private handleSubmit = (e) => {
    const { network, name, symbol, mintable } = this.state;
    const body = {
      network,
      name,
      symbol,
      mintable,
      decimals: 18,
      minters: ['0xf9253378464CF9A100d76f51a6B2d29Bd30a49Bb']
    };

    console.log(body);
  };
}
