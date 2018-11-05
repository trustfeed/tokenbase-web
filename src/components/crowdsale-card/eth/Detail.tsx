import React from 'react';
import './index.css';
import { Card, CardTitle, Row, Col } from 'reactstrap';
import { IEthCrowdsale } from '../../../ethTypes';
import { getAddressURLFromEtherScan } from '../../../utils/helpers';
// import { getAddressURLFromEtherScan } from '../../utils/helpers';

interface IProps {
  ethCrowdsale?: IEthCrowdsale;
  t: (key: string) => string;
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
class EthCrowdsaleDetail extends React.Component<IProps, {}> {
  public render() {
    const { t } = this.props;
    const ethCrowdsale = this.props.ethCrowdsale || mockupItem;

    if (ethCrowdsale === undefined) {
      return null;
    }

    const { status, name, network, goal, cap, openingTime, wallet, token } = ethCrowdsale;
    return (
      <Card body={true} className="token-card">
        <CardTitle className="text-center token-title" style={{ margin: 10 }}>
          <span>{t('ethCrowdsale.detailTitle')}</span>
        </CardTitle>
        <br />
        <div className="text-center">
          <Row>
            <Col xs={4} sm={4} md={4} lg={4} className="text-gray">
              <span className="float-right">{'Status: '}</span>
              <br />
              <span className="float-right">{'Name: '}</span>
              <br />
              <span className="float-right">{'Goal: '}</span>
              <br />
              <span className="float-right">{'Cap: '}</span>
              <br />
              <span className="float-right">{'Starting Time: '}</span>
              <br />
              <span className="float-right">{'Network: '}</span>
              <br />
              <span className="float-right">{'Wallet Address: '}</span>
              <br />
              <span className="float-right">{'Token Address: '}</span>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <span className="float-left text-gray">{status}</span>
              <br />
              <span className="float-left text-gray">{name}</span>
              <br />
              <span className="float-left text-gray">{goal}</span>
              <br />
              <span className="float-left text-gray">{cap}</span>
              <br />
              <span className="float-left text-gray">{openingTime}</span>
              <br />
              <span className="float-left text-gray">{network}</span>
              <br />
              <span className="float-left text-gray">
                <a href={getAddressURLFromEtherScan(wallet, network)} target="_blank">
                  <small>{wallet}</small>
                </a>
              </span>
              <br />
              <span className="float-left text-gray">
                <a href={getAddressURLFromEtherScan(token, network)} target="_blank">
                  <small>{token}</small>
                </a>
              </span>
            </Col>
          </Row>
        </div>
      </Card>
    );
  }
}

export default EthCrowdsaleDetail;
