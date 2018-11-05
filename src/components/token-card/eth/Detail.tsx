import * as React from 'react';
import './index.css';
import { Card, CardTitle, Row, Col } from 'reactstrap';
import { IEthToken } from '../../../ethTypes';
import uuidv4 from 'uuid/v4';
import { getAddressURLFromEtherScan } from '../../../utils/helpers';

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
    const ethToken = this.props.ethToken || mockupEthToken;
    const { name, symbol, status, network, mintable, minters = [], publicAddress } = ethToken;
    const minterList = minters.map((item) => <small key={item}>{item}</small>);
    return (
      <Card body={true} className="token-card">
        <CardTitle className="text-center token-title" style={{ margin: 10 }}>
          <span>{'Token Info'}</span>
        </CardTitle>
        <br />
        <div className="text-center">
          <Row>
            <Col xs={4} sm={4} md={4} lg={4} className="text-gray">
              <span className="float-right">{'Status: '}</span>
              <br />
              <span className="float-right">{'Name: '}</span>
              <br />
              <span className="float-right">{'Symbol: '}</span>
              <br />

              <span className="float-right">{'Minters: '}</span>
              {minterList.map(() => (
                <br key={uuidv4()} />
              ))}
              <span className="float-right">{'Mintable: '}</span>
              <br />
              <span className="float-right">{'Network: '}</span>
              <br />
              {publicAddress !== undefined ? (
                <span className="float-right">{'Contract Address: '}</span>
              ) : null}
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <span className="float-left text-gray">{status}</span>
              <br />
              <span className="float-left text-gray">{name}</span>
              <br />
              <span className="float-left text-gray">{symbol}</span>
              <br />
              {minters.map((item) => (
                <span key={uuidv4()} className="float-left text-gray">
                  <a href={getAddressURLFromEtherScan(item, network)} target="_blank">
                    <small>{item}</small>
                  </a>
                </span>
              ))}
              <br />
              <span className="float-left text-gray">{mintable ? 'True' : 'False'}</span>
              <br />
              <span className="float-left text-gray">{network}</span>

              <br />
              <span className="float-left text-gray">
                {publicAddress !== undefined ? (
                  <a href={getAddressURLFromEtherScan(publicAddress, network)} target="_blank">
                    <small>{publicAddress}</small>
                  </a>
                ) : null}
              </span>
            </Col>
          </Row>
        </div>
      </Card>
    );
  }
}

export default EthTokenDetail;
