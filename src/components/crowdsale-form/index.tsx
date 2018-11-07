import React from 'react';
import DatetimePicker from 'react-datetime';
import Slider from 'react-rangeslider';
import EthToken from '../../components/token-card/eth/Detail';
import { Row, Col, Label, FormGroup, Form, FormFeedback } from 'reactstrap';
import Input from 'reactstrap/lib/Input';
import { ETH_ADDRESS_REGEX } from '../../utils/regex';
import { getInputValidationState, getRate } from '../../utils/helpers';
import { IEthToken } from '../../ethTypes';
// tslint:disable-next-line
const moment = require('moment');

interface IProps {
  t: (key: string) => string;
  onSubmit: (body) => void;
  ethTokens?: IEthToken[];
}

interface IState {
  tokenId: string;
  id: string;
  pricePerEther: string;
  goal: number;
  cap: number;
  duration: number;
  openingTime: any; // Unix timestamp to start the campaign. Must be at least 24 hours in the future.

  wallet: string;
  walletValid: boolean;
  walletInvalid: boolean;
}

const MAX_GOAL = 10000;
const MAX_CAP = 20000;

const getCap = (goal: number, maxCap: number) => (maxCap + goal) / 2;
const roundOff = (value: number): number => {
  return value - (value % 100);
};

export default class CreateTokenForm extends React.Component<IProps, IState> {
  public readonly state: IState = {
    id: '',
    tokenId: '',
    pricePerEther: '0.01',
    goal: 5000,
    cap: getCap(5000, MAX_CAP),
    duration: 30, // The number of days the campaign will run. Must be greater than 1.
    openingTime: moment().valueOf(), // Unix timestamp to start the campaign. Must be at least 24 hours in the future.
    wallet: '',
    walletValid: false,
    walletInvalid: false
  };

  public render(): React.ReactNode {
    const { t, ethTokens } = this.props;
    const { tokenId } = this.state;
    // const aWeekAfter = moment().add(1, 'week');
    const yesterday = moment().subtract(1, 'day');
    const validateDate = (current) => {
      return current.isAfter(yesterday);
    };
    const unit = 'Ether';

    const deployedTokenOptions =
      (ethTokens && ethTokens.filter((item) => item.publicAddress !== undefined)) || [];
    const selectedToken = deployedTokenOptions.find((item) => item.id === tokenId);

    return (
      <Form>
        <Row>
          <Col xs={10} sm={8} md={7} lg={6} className="mr-auto ml-auto">
            <FormGroup>
              <Label className="text-gray">{t('ethCrowdsale.token')}</Label>
              <Input type="select" onChange={this.handleChange}>
                <option value={''}>{'Select token'}</option>
                {deployedTokenOptions.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </Input>
              <br />
              {selectedToken ? <EthToken ethToken={selectedToken} /> : null}
            </FormGroup>
            <br />
            <FormGroup>
              <Label className="text-gray">{t('ethCrowdsale.goal')}</Label>
              <Slider
                min={10}
                max={MAX_GOAL}
                step={10}
                value={this.state.goal}
                onChange={this.changeSoftCap}
              />
              <div className="text-center">{`${this.state.goal} ${unit}`}</div>
            </FormGroup>
            <br />
            <FormGroup>
              <Label className="text-gray">{t('ethCrowdsale.cap')}</Label>
              <Slider
                min={this.state.goal}
                max={MAX_CAP}
                step={10}
                value={this.state.cap}
                onChange={this.changeHardCap}
              />
              <div className="text-center">{`${this.state.cap} ${unit}`}</div>
            </FormGroup>
            <br />
            <FormGroup>
              <Label className="text-gray">{t('ethCrowdsale.openingTime')}</Label>
              <DatetimePicker
                value={moment(this.state.openingTime)}
                onChange={this.changeDatetime}
                isValidDate={validateDate}
              />
            </FormGroup>
            <br />
            <FormGroup>
              <Label className="text-gray">{t('ethCrowdsale.duration')}</Label>
              <Slider min={1} max={60} value={this.state.duration} onChange={this.changeDuration} />
              <div className="text-center">{`${this.state.duration} Days`}</div>
            </FormGroup>
            <br />
            <FormGroup>
              <Label className="text-left text-gray">{t('ethToken.pricePerEther')}</Label>
              <br />
              {this.renderRadioPricePerEther()}
            </FormGroup>
            <br />

            <FormGroup>
              <Label className="text-left" for="wallet">
                {t('ethToken.wallet')}
              </Label>
              <div className="center">
                <Input
                  type="text"
                  data-test-id="wallet-input"
                  value={this.state.wallet}
                  onChange={this.changewallet}
                  invalid={this.state.walletInvalid}
                  valid={this.state.walletValid}
                  placeholder="ethereum address"
                  autoComplete="new-password"
                  maxLength={42}
                />
                <FormFeedback>{t('ethToken.walletInvalid')}</FormFeedback>
                <FormFeedback valid={true}>{t('ethToken.walletValid')}</FormFeedback>
              </div>
            </FormGroup>
          </Col>
          <Col sm={12} md={12} lg={12}>
            <div className="py-3 text-center">
              <button className="btn btn-primary" onClick={this.handleSubmit}>
                {t('form.submit')}
              </button>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }

  private renderRadioPricePerEther = () => {
    const list = ['1', '0.1', '0.01', '0.001', '0.0001'];
    return list.map((item) => (
      <FormGroup check={true} inline={true} key={item}>
        <Label check={true}>
          <Input
            type="radio"
            name="radio-network"
            value={item}
            checked={this.state.pricePerEther === item}
            onChange={this.changePricePerEther}
          />{' '}
          {item}
        </Label>
      </FormGroup>
    ));
  };

  private handleChange = (e) => {
    this.setState({ tokenId: e.target.value });
  };

  private changeSoftCap = (value) => {
    const goal = roundOff(value);
    this.setState({
      goal,
      cap: getCap(goal, MAX_CAP)
    });
  };

  private changeHardCap = (value) => {
    const cap = roundOff(value);
    this.setState({
      cap
    });
  };

  private changePricePerEther = (e) => {
    this.setState({
      pricePerEther: e.target.value
    });
  };

  private changeDuration = (value) => {
    this.setState({
      duration: value
    });
  };

  private changeDatetime = (momentInput): void => {
    this.setState({ openingTime: momentInput.valueOf() });
  };

  private changewallet = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const value = e.target.value;
    const key = 'wallet';
    const regex = ETH_ADDRESS_REGEX;
    const validationResult = getInputValidationState(key, value, regex);
    this.setState({ ...validationResult, [key]: value });
  };

  private handleSubmit = (e) => {
    e.preventDefault();
    const { ethTokens } = this.props;
    const { cap, goal, duration, openingTime, pricePerEther, wallet, tokenId } = this.state;
    const selectedToken = ethTokens.find((item) => item.id === tokenId);

    const body = {
      network: selectedToken.network,
      openingTime,
      duration,
      name: selectedToken.name,
      rate: getRate(pricePerEther),
      wallet,
      cap,
      goal,
      minted: selectedToken.mintable,
      token: selectedToken.publicAddress
    };
    this.props.onSubmit(body);
  };
}
