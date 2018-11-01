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

class EthTokenSimple extends React.Component<IProps, {}> {
  public render() {
    const ethToken = this.props.ethToken || mockupEthToken || {};
    return (
      <Card body={true} className="token-card">
        <div>
          <CardTitle className="token-title">
            <span>{ethToken.name} </span>
            <small>({ethToken.symbol})</small>
          </CardTitle>
          <div>
            <span className="text-gray">{ethToken.status}</span>
            <div className="text-gray text-right">
              <small>{ethToken.network}</small>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default EthTokenSimple;
