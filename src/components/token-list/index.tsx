import * as React from 'react';
import './token-list.css';
import { Card, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { paths } from 'src/routes';

interface IProps {
  ethTokens: any[];
}

class TokenList extends React.Component<IProps, {}> {
  public render() {
    const ethTokens = this.props.ethTokens || [];
    return ethTokens.map((item) => {
      if (!item) {
        return;
      }
      return (
        <Link
          to={`${paths.ethToken}?id=${item.id}`}
          style={{ margin: 10, textDecoration: 'none' }}
          className="text-center"
          key={item.id}
        >
          <Card body={true} className="token-card">
            <div className="text-gray text-right">
              {/* <small>{'network: '}</small> */}
              <small>{item.network}</small>
            </div>
            <div>
              <CardTitle style={{ fontSize: 24, margin: 20 }}>
                <span>{item.name} </span>
                <small>({item.symbol})</small>
              </CardTitle>
              <CardText>
                <span className="text-gray">{item.status}</span>
              </CardText>
            </div>
          </Card>
        </Link>
      );
    });
  }
}

export default TokenList;
