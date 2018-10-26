import * as React from 'react';
import * as moment from 'moment';
import * as DatetimePicker from 'react-datetime';
import { Row, Col, Input, Label, FormGroup, Button, Form, FormFeedback } from 'reactstrap';
// import { ALPHANUMERIC_REGEX, ALPHABETIC_REGEX } from 'src/utils/regex';
// import { getInputValidationState } from '../../utils/helpers';
import './';
interface IProps {
  t: (key: string) => string;
  onSubmit: (body) => void;
}

interface IState {
  id: string;
  pricePerEth: string;
  softCap: string;
  hardCap: string;
  duration: string;
  startingTime: any; // Unix timestamp to start the campaign. Must be at least 24 hours in the future.
}

export default class CreateTokenForm extends React.Component<IProps, IState> {
  public readonly state: IState = {
    id: '',
    pricePerEth: '0.01',
    softCap: '',
    hardCap: '',
    duration: '60', // The number of days the campaign will run. Must be greater than 1.
    startingTime: moment().valueOf() // Unix timestamp to start the campaign. Must be at least 24 hours in the future.
  };

  public render(): React.ReactNode {
    const { t, onSubmit } = this.props;

    // const aWeekAfter = moment().add(1, 'week');
    const yesterday = moment().subtract(1, 'day');
    const validateDate = (current) => {
      return current.isAfter(yesterday);
    };

    return (
      <Form>
        <Row>
          <Col xs={10} sm={8} md={7} lg={5} className="mr-auto ml-auto">
            <FormGroup>
              <Label className="text-left" for="soft-cap">
                {t('createCrowdsale.softCap')}
              </Label>
              <Col>
                <Input
                  value={this.state.softCap}
                  type="number"
                  min={0}
                  onChange={() => {
                    return;
                  }}
                  name="soft-cap"
                  id="soft-cap-input"
                  placeholder="5 ETH"
                  autoComplete="new-password"
                />
                <FormFeedback>{'soft cap is invalid'}</FormFeedback>
              </Col>
            </FormGroup>

            <FormGroup>
              <Label className="text-left" for="hard-cap">
                {t('createCrowdsale.hardCap')}
              </Label>
              <Col>
                <Input
                  value={this.state.hardCap}
                  type="number"
                  onChange={() => {
                    return;
                  }}
                  min={0}
                  name="hard-cap"
                  id="hard-cap-input"
                  placeholder="100 ETH"
                  autoComplete="new-password"
                />
                <FormFeedback>{'hard cap is invalid'}</FormFeedback>
              </Col>
            </FormGroup>

            <FormGroup>
              <Label className="text-left" for="starting-time-input">
                {t('createCrowdsale.startingTime')}
              </Label>
              <Col>
                <DatetimePicker
                  value={moment(this.state.startingTime)}
                  isValidDate={validateDate}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Label className="text-left" for="duration">
                {t('createCrowdsale.duration')}
              </Label>
              <Col>
                <Input
                  type="select"
                  value={this.state.duration}
                  onChange={() => {
                    return;
                  }}
                  name="duration"
                  id="duration-input"
                >
                  <option value={'30'}>{'30 days'}</option>
                  <option value={'60'}>{'60 days'}</option>
                  <option value={'90'}>{'90 days'}</option>
                  <option value={'180'}>{'180 days'}</option>
                </Input>
                <FormFeedback>{'duration is invalid'}</FormFeedback>
              </Col>
            </FormGroup>
          </Col>
          <Col sm={12} md={12} lg={12}>
            <div className="py-3 text-center">
              <Button color="primary" onClick={onSubmit}>
                {t('createCrowdsale.submit')}
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }
}
