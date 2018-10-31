import * as React from 'react';
import './eth-token-card.css';
import { Col, Row, Card, CardTitle } from 'reactstrap';
import { IEthToken } from '../../../ethTypes';

interface IProps {
  ethToken: IEthToken | undefined;
}

const mockupEthToken: IEthToken = {
  id: 'fdsafdsafas',
  network: 'rinkeby(mockup)',
  name: 'Mockup Coin',
  symbol: 'MC',
  decimals: 18,
  mintable: true,
  minters: ['0x432343'],
  status: 'DRAFT'
};

class EthTokenDetail extends React.Component<IProps, {}> {
  public render() {
    const ethToken = this.props.ethToken || mockupEthToken || {};
    const { status, network, mintable, minters = [] } = ethToken;
    const minterList = minters.map((item) => <small key={item}>{item}</small>);
    return (
      <Card body={true} className="token-card">
        <CardTitle className="text-center" style={{ fontSize: 32, margin: 10 }}>
          <span>{ethToken.name} </span>
          <small>({ethToken.symbol})</small>
        </CardTitle>
        <div className="text-center">
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <span className="text-gray text-center">{'minters:'}</span>
              <br />
              <span className="text-gray text-center">{minterList}</span>

              <hr />
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <span className="text-gray float-right">{'status:'}</span>
              <br />
              <span className="text-gray float-right">{'network:'}</span>
              <br />
              <span className="text-gray float-right">{'mintable:'}</span>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <span className="text-gray float-left">{status}</span>
              <br />
              <span className="text-gray float-left">{network}</span>
              <br />
              <span className="text-gray float-left">{mintable ? '✔' : '✘'}</span>
            </Col>
          </Row>
        </div>
      </Card>
    );
  }
}

export default EthTokenDetail;
