import * as React from 'react';
import { Card, CardTitle, Row, Col } from 'reactstrap';
import { IEthTokenPayment } from '../../ethTypes';
import './token-payment-card.css';
import * as moment from 'moment';
interface IProps {
  payment: IEthTokenPayment;
}

const mockupEthToken: IEthTokenPayment = {
  amount: '1065902250000000',
  expireAt: 1540987663,
  id: '5bd970dfba94900001b0ad11',
  network: 'rinkeby',
  publicAddress: '0x7A1E673eBd9cD6107EF4bB85587905E800a66B3F',
  received: '0',
  status: 'PENDING'
};

class EthTokenPayment extends React.Component<IProps, {}> {
  public render() {
    const payment = this.props.payment || mockupEthToken || {};
    return (
      <Card body={true} className="token-payment-card">
        <div className="text-center">
          <CardTitle className="token-title">{'Payment Info'}</CardTitle>
          <br />
          <Row>
            <Col xs={4} sm={4} md={4} lg={4}>
              <span className="float-right text-gray">{'Status: '}</span>
              <br />
              <span className="float-right text-gray">{'Amount: '}</span>
              <br />
              <span className="float-right text-gray">{'Expiriration: '}</span>
              <br />
              <span className="float-right text-gray">{'Ethereum Address: '}</span>
              <br />
              <span className="float-right text-gray">{'Received: '}</span>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <span className="float-left text-gray">{payment.status}</span>
              <br />
              <span className="float-left text-gray">{payment.amount}</span>
              <br />
              <span className="float-left text-gray">
                {moment(payment.expireAt * 1000).format()}
              </span>
              <br />
              <small className="float-left text-gray">{payment.publicAddress}</small>
              <br />
              <span className="float-left text-gray">{payment.received}</span>
            </Col>
          </Row>
          <div />
        </div>
      </Card>
    );
  }
}

export default EthTokenPayment;
