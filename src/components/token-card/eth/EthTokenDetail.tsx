import * as React from 'react';
import './eth-token-card.css';
import { Card, CardTitle } from 'reactstrap';
import { IEthToken } from '../../../ethTypes';

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
        <div className="text-center text-gray">
          <hr />
          <span>{'minters:'}</span>
          <br />
          <span>{minterList}</span>
          <hr />
          <span>{mintable ? 'mintable token' : 'non-mintable token'}</span>
          <hr />
          <span>{network}</span>
          <hr />
          <span>{status}</span>
          <br />
        </div>
      </Card>
    );
  }
}

export default EthTokenDetail;
