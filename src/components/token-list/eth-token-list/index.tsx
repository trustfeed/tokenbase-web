import * as React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import { paths } from 'src/routes';
import EthTokenSimple from '../../token-card/eth/EthTokenSimple';
import { IEthToken } from '../../../ethTypes';
import { Col, Row, ButtonGroup, Button } from 'reactstrap';

const ALL = 'ALL';
const DRAFT = 'DRAFT';
const PENDING = 'PAYMENT_PENDING';
const DEPLOYED = 'DEPLOYED';

type FilterKey = 'ALL' | 'DRAFT' | 'PAYMENT_PENDING' | 'DEPLOYED';

interface IProps {
  ethTokens: IEthToken[];
}

interface IState {
  filterKey: FilterKey;
}

class TokenList extends React.Component<IProps, IState> {
  public readonly state: IState = {
    filterKey: ALL
  };
  public render() {
    return (
      <div className="text-center">
        <ButtonGroup>{this.renderFilterButtons()}</ButtonGroup>
        <Row>{this.renderTokenList()}</Row>
      </div>
    );
  }
  private renderFilterButtons = () => {
    const ethTokens = this.props.ethTokens || [];
    const filterKeyList = [ALL, DRAFT, PENDING, DEPLOYED];

    return filterKeyList.map((filterKey: FilterKey) => {
      let sum = ethTokens.length;
      if (filterKey !== ALL) {
        sum = ethTokens.filter((item) => item.status === filterKey).length;
      }
      return (
        <Button
          size="sm"
          color="primary"
          outline={true}
          onClick={() => this.setState({ filterKey })}
          active={this.state.filterKey === filterKey}
          key={filterKey}
        >
          {filterKey} ({sum})
        </Button>
      );
    });
  };
  private renderTokenList = () => {
    const ethTokens = this.props.ethTokens || [];
    const filterKey: FilterKey = this.state.filterKey;

    let list = ethTokens;
    if (filterKey !== ALL) {
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
