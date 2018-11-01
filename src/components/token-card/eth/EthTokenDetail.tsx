import * as React from 'react';
import './eth-token-card.css';
import { Card, CardTitle, Row, Col } from 'reactstrap';
import { IEthToken } from '../../../ethTypes';
import uuidv4 from 'uuid/v4';

interface IProps {
  ethToken?: IEthToken;
}

const mockupEthToken: IEthToken = {
  id: 'fdsafdsafas',
  network: 'rinkeby(mockup)',
  name: 'Mockup Coin',
  symbol: 'MC',
  decimals: 18,
  mintable: true,
  minters: ['0x432sdflkajfd;klajsf;kl343'],
  status: 'DRAFT'
};

class EthTokenDetail extends React.Component<IProps, {}> {
  public render() {
    const ethToken = this.props.ethToken || mockupEthToken || {};
    const { status, network, mintable, minters = [] } = ethToken;
    const minterList = minters.map((item) => <small key={item}>{item}</small>);
    return (
      <Card body={true} className="token-card">
        <CardTitle className="text-center token-title" style={{ margin: 10 }}>
          <span>{ethToken.name} </span>
          <small>({ethToken.symbol})</small>
        </CardTitle>
        <div className="text-center">
          <Row>
            <Col xs={4} sm={4} md={4} lg={4}>
              <span className="float-right">{'Minters: '}</span>
              {minterList.map(() => (
                <br key={uuidv4()} />
              ))}
              <span className="float-right">{'Mintable: '}</span>
              <br />
              <span className="float-right">{'Network: '}</span>
              <br />
              <span className="float-right">{'Status: '}</span>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              {minterList.map((item) => (
                <span key={uuidv4()} className="float-left text-gray">
                  {item}
                </span>
              ))}
              <br />
              <span className="float-left text-gray">{mintable ? 'True' : 'False'}</span>
              <br />
              <span className="float-left text-gray">{network}</span>
              <br />
              <span className="float-left text-gray">{status}</span>
            </Col>
          </Row>
        </div>
      </Card>
    );
  }
}

export default EthTokenDetail;
