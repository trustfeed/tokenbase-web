import * as React from 'react';
import './eth-token.css';
import { Col, Row, Card, CardTitle, CardText } from 'reactstrap';

interface IProps {
  ethToken: any;
}

const mockupEthToken = {
  id: 'fdsafdsafas',
  network: 'rinkeby(mockup)',
  name: 'Mockup Coin',
  symbol: 'MC',
  decimals: 18,
  mintable: true,
  minters: ['0x432343'],
  status: 'DRAFT'
};

class EthToken extends React.Component<IProps, {}> {
  public render() {
    const ethToken = this.props.ethToken || mockupEthToken || {};
    const { status, network, mintable, minters = [] } = ethToken;
    const minterList = minters.map((item) => <li key={item}>{item}</li>);
    return (
      <Card body={true} className="token-card">
        <CardTitle className="text-center" style={{ fontSize: 32, margin: 20 }}>
          <span>{ethToken.name} </span>
          <small>({ethToken.symbol})</small>
        </CardTitle>
        <div className="text-center">
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <CardText>
                <span className="text-gray float-right">{'status:'}</span>
                <br />
                <span className="text-gray float-right">{'network:'}</span>
                <br />
                <span className="text-gray float-right">{'mintable:'}</span>
                <br />
                <span className="text-gray float-right">{'minters:'}</span>
              </CardText>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <CardText>
                <span className="text-gray float-left">{status}</span>
                <br />
                <span className="text-gray float-left">{network}</span>
                <br />
                <span className="text-gray float-left">
                  {mintable ? 'mintable' : 'non-mintable'}
                </span>
                <br />
                <span className="text-gray float-left">{minterList}</span>
              </CardText>
            </Col>
          </Row>
        </div>
      </Card>
    );
  }
}

export default EthToken;
