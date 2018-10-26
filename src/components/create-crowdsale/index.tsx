import * as React from 'react';
import * as moment from 'moment';
import * as DatetimePicker from 'react-datetime';
import Slider from 'react-rangeslider';

import { Row, Col, Label, FormGroup, Button, Form } from 'reactstrap';
import Input from 'reactstrap/lib/Input';

interface IProps {
  t: (key: string) => string;
  onSubmit: (body) => void;
}

interface IState {
  id: string;
  pricePerEther: string;
  softCap: number;
  hardCap: number;
  duration: number;
  startingTime: any; // Unix timestamp to start the campaign. Must be at least 24 hours in the future.
}

export default class CreateTokenForm extends React.Component<IProps, IState> {
  public readonly state: IState = {
    id: '',
    pricePerEther: '0.01',
    softCap: 250000,
    hardCap: 500000,
    duration: 30, // The number of days the campaign will run. Must be greater than 1.
    startingTime: moment().valueOf() // Unix timestamp to start the campaign. Must be at least 24 hours in the future.
  };

  public render(): React.ReactNode {
    const { t, onSubmit } = this.props;

    // const aWeekAfter = moment().add(1, 'week');
    const yesterday = moment().subtract(1, 'day');
    const validateDate = (current) => {
      return current.isAfter(yesterday);
    };
    const unit = 'Ether';
    return (
      <Form>
        <Row>
          <Col xs={10} sm={8} md={7} lg={5} className="mr-auto ml-auto">
            <FormGroup>
              <Label className="text-gray">{t('ethCrowdsale.softCap')}</Label>
              <Slider
                min={10}
                max={500000}
                step={10}
                value={this.state.softCap}
                onChange={this.changeSoftCap}
              />
              <div className="text-center">{`${this.state.softCap} ${unit}`}</div>
            </FormGroup>
            <br />
            <FormGroup>
              <Label className="text-gray">{t('ethCrowdsale.hardCap')}</Label>
              <Slider
                min={10}
                max={500000}
                step={10}
                value={this.state.hardCap}
                onChange={this.changeHardCap}
              />
              <div className="text-center">{`${this.state.hardCap} ${unit}`}</div>
            </FormGroup>
            <br />
            <FormGroup>
              <Label className="text-left text-gray">{t('ethToken.pricePerEtherer')}</Label>
              <br />
              {this.renderRadioPricePerEther()}
            </FormGroup>
            <br />
            <FormGroup>
              <Label className="text-gray">{t('ethCrowdsale.startingTime')}</Label>
              <DatetimePicker value={moment(this.state.startingTime)} isValidDate={validateDate} />
            </FormGroup>
            <br />
            <FormGroup>
              <Label className="text-gray">{t('ethCrowdsale.duration')}</Label>
              <Slider min={1} max={60} value={this.state.duration} onChange={this.changeDuration} />
              <div className="text-center">{`${this.state.duration} Days`}</div>
            </FormGroup>
          </Col>
          <Col sm={12} md={12} lg={12}>
            <div className="py-3 text-center">
              <Button color="primary" onClick={onSubmit}>
                {t('ethCrowdsale.submit')}
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }

  private renderRadioPricePerEther = () => {
    const list = ['0.001', '0.01', '0.1', '1'];
    return list.map((item) => (
      <FormGroup check={true} inline={true}>
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

  private changeSoftCap = (value) => {
    this.setState({
      softCap: value
    });
  };

  private changeHardCap = (value) => {
    this.setState({
      hardCap: value
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
}
