import * as React from 'react';
import { Card, CardTitle } from 'reactstrap';
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
          <CardTitle className="token-title">{payment.status}</CardTitle>
          <div>
            <span className="text-gray">{payment.amount}</span>
            <br />
            <span className="text-gray">{moment(payment.expireAt * 1000).toLocaleString()}</span>
            <br />
            <small className="text-gray">{payment.publicAddress}</small>
            <br />
            <span className="text-gray">{payment.received}</span>
          </div>
        </div>
      </Card>
    );
  }
}

export default EthTokenPayment;
