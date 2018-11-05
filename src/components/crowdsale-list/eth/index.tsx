import * as React from 'react';
import './crowdsale-list.css';
import { Link } from 'react-router-dom';
import { paths } from '../../../routes';
import EthCrowdsaleSimple from '../../crowdsale-card/eth/Simple';
import { IEthCrowdsale, EthStatusType } from '../../../ethTypes';
import { Col, Row } from 'reactstrap';

interface IProps {
  t: (key: string) => string;
  ethCrowdsales: IEthCrowdsale[];
  selectedFilterKey: EthStatusType;
}

class TokenList extends React.Component<IProps, {}> {
  public render() {
    return <Row>{this.renderTokenList()}</Row>;
  }

  private renderTokenList = () => {
    const { t } = this.props;
    const ethCrowdsales = this.props.ethCrowdsales || [];
    const selectedFilterKey: EthStatusType = this.props.selectedFilterKey;

    let list = ethCrowdsales;
    if (selectedFilterKey !== 'ALL') {
      list = ethCrowdsales.filter((item) => item.status === selectedFilterKey);
    }

    const tokenCardlist = list.map((item) => {
      if (item === undefined) {
        return;
      }
      return (
        <Col xs={6} sm={6} md={6} lg={4} key={item.id}>
          <Link
            to={`${paths.ethCrowdsale}?id=${item.id}`}
            style={{ margin: 10, textDecoration: 'none' }}
            className="text-center token-list"
          >
            <EthCrowdsaleSimple ethCrowdsale={item} t={t} />
          </Link>
        </Col>
      );
    });
    return tokenCardlist;
  };
}

export default TokenList;
