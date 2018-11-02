import * as React from 'react';
import { Card, CardTitle, Row, Col } from 'reactstrap';
import { IEthPaymentType } from '../../ethTypes';
import './index.css';
import * as moment from 'moment';
import { getAddressURLFromEtherScan } from 'src/utils/helpers';
interface IProps {
  payment: IEthPaymentType;
}

const mockupEthToken: IEthPaymentType = {
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
    const { status, publicAddress, expireAt, network, received, amount } = payment;
    return (
      <Card body={true} className="token-payment-card">
        <div className="text-center">
          <CardTitle className="token-title">{'Payment Info'}</CardTitle>
          <br />
          <Row>
            <Col xs={4} sm={4} md={4} lg={4}>
              <span className="float-right text-gray">{'Status: '}</span>
              <br />
              <span className="float-right text-gray">{'Address: '}</span>
              <br />
              <span className="float-right text-gray">{'Amount: '}</span>
              <br />
              <span className="float-right text-gray">{'Expiration: '}</span>
              <br />
              <span className="float-right text-gray">{'Received: '}</span>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <span className="float-left text-gray">{status}</span>
              <br />
              <span className="float-left text-gray">
                <a href={getAddressURLFromEtherScan(publicAddress, network)} target="_blank">
                  <small>{publicAddress}</small>
                </a>
              </span>
              <br />
              <span className="float-left text-gray">{amount}</span>
              <br />
              <span className="float-left text-gray">{moment(expireAt * 1000).format()}</span>
              <br />
              <span className="float-left text-gray">{received}</span>
            </Col>
          </Row>
          <div />
        </div>
      </Card>
    );
  }
}

export default EthTokenPayment;
