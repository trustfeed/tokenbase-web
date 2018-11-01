import * as React from 'react';
import './token-list.css';
import { Link } from 'react-router-dom';
import { paths } from 'src/routes';
import EthTokenSimple from '../../../token-card/eth/EthTokenSimple';
import { IEthToken, EthFilterKeyType } from '../../../../ethTypes';
import { Col, Row } from 'reactstrap';

interface IProps {
  ethTokens: IEthToken[];
  filterKey: EthFilterKeyType;
}

class TokenList extends React.Component<IProps, {}> {
  public render() {
    return <Row>{this.renderTokenList()}</Row>;
  }

  private renderTokenList = () => {
    const ethTokens = this.props.ethTokens || [];
    const filterKey: EthFilterKeyType = this.props.filterKey;

    let list = ethTokens;
    if (filterKey !== 'ALL') {
      list = ethTokens.filter((item) => item.status === filterKey);
    }

    const tokenCardlist = list.map((item) => {
      if (item === undefined) {
        return;
      }
      return (
        <Col xs={6} sm={6} md={6} lg={4} key={item.id}>
          <Link
            to={`${paths.ethToken}?id=${item.id}`}
            style={{ margin: 10, textDecoration: 'none' }}
            className="text-center token-list"
          >
            <EthTokenSimple ethToken={item} />
          </Link>
        </Col>
      );
    });
    return tokenCardlist;
  };
}

export default TokenList;
