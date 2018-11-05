import React from 'react';

import { IEthToken, EthStatusType, IEthCrowdsale } from '../../../ethTypes';
import { ButtonGroup, Button } from 'reactstrap';

interface IProps {
  list: IEthToken[] | IEthCrowdsale[];
  selectedFilterKey: EthStatusType;
  renderList: (list, selectedFilterKey) => React.ReactNode;
  handleSelect: (selectedFilterKey) => void;
}

class FilterButtons extends React.Component<IProps, {}> {
  public render() {
    const FilterKeys: EthStatusType[] = ['ALL', 'DRAFT', 'PAYMENT_PENDING', 'DEPLOYED'];
    const selectedFilterKey = this.props.selectedFilterKey;

    const list = this.props.list || [];
    return (
      <div className="text-center">
        <div className="py-3">
          {this.renderFilterButtonList(FilterKeys, selectedFilterKey, list)}
        </div>
        <div className="py-3">{this.props.renderList(list, selectedFilterKey)}</div>
      </div>
    );
  }

  private renderFilterButtonList = (
    FilterKeys: EthStatusType[],
    selectedFilterKey: EthStatusType,
    ethTokens
  ): React.ReactNode => {
    const buttons = FilterKeys.map((filterKey: EthStatusType) => {
      let sum = ethTokens.length;
      if (filterKey !== 'ALL') {
        sum = ethTokens.filter((item) => item.status === filterKey).length;
      }
      return (
        <Button
          size="sm"
          color="primary"
          outline={true}
          onClick={() => this.props.handleSelect(filterKey)}
          active={filterKey === selectedFilterKey}
          key={filterKey}
        >
          {filterKey} ({sum})
        </Button>
      );
    });
    return <ButtonGroup>{buttons}</ButtonGroup>;
  };
}

export default FilterButtons;
