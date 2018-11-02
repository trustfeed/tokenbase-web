import * as React from 'react';

import { IEthToken, EthFilterKeyType } from '../../../../ethTypes';
import { ButtonGroup, Button } from 'reactstrap';
import TokenList from '../token-list';

interface IProps {
  ethTokens: IEthToken[];
}

interface IState {
  filterKey: EthFilterKeyType;
}

class FilterButtons extends React.Component<IProps, IState> {
  public readonly state: IState = {
    filterKey: 'ALL'
  };

  public render() {
    const filterKeys: EthFilterKeyType[] = ['ALL', 'DRAFT', 'PAYMENT_PENDING', 'DEPLOYED'];
    const currentFilterKey: EthFilterKeyType = this.state.filterKey;
    const ethTokens = this.props.ethTokens || [];
    return (
      <div className="text-center">
        <div className="py-3">{this.renderFilterButtonList(filterKeys, ethTokens)}</div>
        <div className="py-3">
        <TokenList ethTokens={ethTokens} filterKey={currentFilterKey} />
        </div>
      </div>
    );
  }

  private renderFilterButtonList = (
    filterKeys: EthFilterKeyType[],
    ethTokens: IEthToken[]
  ): React.ReactNode => {
    const buttons= filterKeys.map((filterKey: EthFilterKeyType) => {
      let sum = ethTokens.length;
      if (filterKey !== 'ALL') {
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
    return (
      <ButtonGroup>{buttons}</ButtonGroup>
    )
  };
}

export default FilterButtons;
