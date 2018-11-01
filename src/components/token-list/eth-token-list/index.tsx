import * as React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import { paths } from 'src/routes';
import EthTokenSimple from '../../token-card/eth/EthTokenSimple';
import { IEthToken } from '../../../ethTypes';
import { Col, Row, ButtonGroup, Button } from 'reactstrap';

interface IProps {
  ethTokens: IEthToken[];
}
interface IState {
  filterKey: string;
}

class TokenList extends React.Component<IProps, IState> {
  public readonly state: IState = {
    filterKey: 'ALL'
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
    const filterKeyList = ['ALL', 'DRAFT', 'PAYMENT_PENDING', 'DEPLOYED'];
    return filterKeyList.map((item) => (
      <Button
        size="sm"
        color="primary"
        outline={true}
        onClick={() => this.setState({ filterKey: item })}
        active={this.state.filterKey === item}
      >
        {item}
      </Button>
    ));
  };
  private renderTokenList = () => {
    const ethTokens = this.props.ethTokens || [];
    const { filterKey } = this.state;

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
            key={item.id}
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
