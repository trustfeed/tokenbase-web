import React from 'react';
import './index.css';
import { Card, CardTitle } from 'reactstrap';
import { IEthCrowdsale } from '../../../ethTypes';

interface IProps {
  t: (key: string) => string;
  ethCrowdsale?: IEthCrowdsale;
}

const mockupItem: IEthCrowdsale = {
  goal: '1',
  cap: '100',
  duration: 60,
  id: '5bcd38c4137a0032b9ec0a89',
  minted: true,
  name: 'Some ID, Just for user',
  network: 'parity.trustfeed.io',
  openingTime: 10,
  rate: '1',
  status: 'DRAFT',
  wallet: '0x3Aa9CE734DD21FA5E6962978e2ccc7f4Ac513348',
  token: '0x3Aa7E32BD54'
};

class EthTokenSimple extends React.Component<IProps, {}> {
  public render() {
    const ethCrowdsale = this.props.ethCrowdsale || mockupItem;
    return (
      <Card body={true} className="token-card">
        <div>
          <CardTitle className="token-title text-gray">
            <span>{ethCrowdsale.name} </span>
          </CardTitle>
          <div>
            <span className="text-gray">{ethCrowdsale.status}</span>
            <div className="text-gray text-right">
              <small>{ethCrowdsale.network}</small>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default EthTokenSimple;
