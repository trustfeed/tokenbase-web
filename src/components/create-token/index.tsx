import * as React from 'react';

import { Row, Col, Input, Label, FormGroup, Button, Form, FormFeedback } from 'reactstrap';
import { ALPHANUMERIC_REGEX, TOKEN_SYMBOL_REGEX, ETH_ADDRESS_REGEX } from 'src/utils/regex';
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
  minter: string;

  nameValid: boolean;
  nameInvalid: boolean;
  symbolValid: boolean;
  symbolInvalid: boolean;
  minterValid: boolean;
  minterInvalid: boolean;
}

export default class CreateTokenForm extends React.Component<IProps, IState> {
  public readonly state: IState = {
    id: '',
    name: '',
    nameInvalid: false,
    nameValid: false,

    symbol: '',
    symbolValid: false,
    symbolInvalid: false,

    minter: '',
    minterValid: false,
    minterInvalid: false,

    network: 'rinkeby',
    mintable: false
  };

  public render(): React.ReactNode {
    const { t } = this.props;

    return (
      <Form>
        <Row>
          <Col xs={10} sm={8} md={7} lg={6} className="mr-auto ml-auto">
            <FormGroup>
              <Label className="text-left text-gray">{t('ethToken.network')}</Label>
              <br />
              <FormGroup check={true} inline={true}>
                <Label check={true}>
                  <Input
                    type="radio"
                    name="radio-network"
                    value="mainnet"
                    checked={this.state.network === 'mainnet'}
                    onChange={this.handleNetworkOptionChange}
                  />{' '}
                  {t('ethToken.mainnet')}
                </Label>
              </FormGroup>
              <FormGroup check={true} inline={true}>
                <Label check={true}>
                  <Input
                    type="radio"
                    name="radio-network"
                    value="rinkeby"
                    checked={this.state.network === 'rinkeby'}
                    onChange={this.handleNetworkOptionChange}
                  />{' '}
                  {t('ethToken.rinkeby')}
                </Label>
              </FormGroup>
            </FormGroup>
            <br />
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
                    onChange={this.changeName}
                    maxLength={32}
                    placeholder="Sample Token"
                    autoComplete="new-password"
                    invalid={this.state.nameInvalid}
                    valid={this.state.nameValid}
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
                    onChange={this.changeSymbol}
                    invalid={this.state.symbolInvalid}
                    valid={this.state.symbolValid}
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
              <Label className="text-left" for="minter">
                {t('ethToken.minter')}
              </Label>
              <Col>
                <div className="center">
                  <Input
                    type="text"
                    data-test-id="minter-input"
                    value={this.state.minter}
                    onChange={this.changeMinter}
                    invalid={this.state.minterInvalid}
                    valid={this.state.minterValid}
                    placeholder="ethereum address"
                    autoComplete="new-password"
                    maxLength={42}
                  />
                  <FormFeedback>{t('ethToken.minterInvalid')}</FormFeedback>
                  <FormFeedback valid={true}>{t('ethToken.minterValid')}</FormFeedback>
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

  private changeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const value = e.target.value;
    const key = 'name';
    const regex = ALPHANUMERIC_REGEX;
    const validationResult = getInputValidationState(key, value, regex);
    this.setState({ ...validationResult, [key]: value });
  };

  private changeSymbol = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const value = e.target.value.toUpperCase();
    const key = 'symbol';
    const regex = TOKEN_SYMBOL_REGEX;
    const validationResult = getInputValidationState(key, value, regex);
    this.setState({ ...validationResult, [key]: value });
  };

  private changeMinter = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const value = e.target.value;
    const key = 'minter';
    const regex = ETH_ADDRESS_REGEX;
    const validationResult = getInputValidationState(key, value, regex);
    this.setState({ ...validationResult, [key]: value });
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
    const { network, name, symbol, mintable, minter } = this.state;
    const body = {
      network,
      name,
      symbol,
      mintable,
      decimals: 18,
      minters: [minter]
    };
    this.props.onSubmit(body);
  };
}
