import * as React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import { paths } from 'src/routes';
import EthTokenSimple from '../../token-card/eth/EthTokenSimple';
import { IEthToken } from '../../../ethTypes';
interface IProps {
  ethTokens: IEthToken[];
}

class TokenList extends React.Component<IProps, {}> {
  public render() {
    const ethTokens = this.props.ethTokens || [];
    return ethTokens.map((item) => {
      if (item === undefined) {
        return;
      }
      return (
        <Link
          to={`${paths.ethToken}?id=${item.id}`}
          style={{ margin: 10, textDecoration: 'none' }}
          className="text-center token-list"
          key={item.id}
        >
          <EthTokenSimple ethToken={item} />
        </Link>
      );
    });
  }
}

export default TokenList;
