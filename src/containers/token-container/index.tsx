import * as React from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/layout';
import { getEthToken } from '../../redux/token/actions';

import { Link } from 'react-router-dom';
import { paths } from '../../routes';
import { changeQueryStringToJSON } from '../../utils/helpers';
import EthToken from '../../components/token-card/eth';
import Spinner from 'src/components/spinner';

interface IProps {
  location: any;
  history: any;
  ethToken: any;
  getEthToken: (id: string) => void;
  isGettingEthToken: boolean;
}

interface IState {
  crowdsale: object | null;
  token: object | null;
  id: string;
}
export class EthTokenContainer extends React.Component<IProps, IState> {
  public readonly state = {
    crowdsale: null,
    token: null,
    id: ''
  };

  public async componentDidMount() {
    const { location } = this.props;
    const queryString = location.search.slice(1);
    const params = changeQueryStringToJSON(queryString);
    const id = params.id;

    this.setState({ id }, () => this.props.getEthToken(id));
  }

  public render(): React.ReactNode {
    const { isGettingEthToken, ethToken, location, history } = this.props;
    console.log('ethToken', ethToken);
    return (
      <Layout location={location} history={history} showSidebar={true}>
        {isGettingEthToken ? (
          <Spinner />
        ) : (
          <div className="py-2">
            <div style={{ margin: 20 }}>
              <Link to={paths.ethTokens}>{'Back'}</Link>
            </div>
            <br />
            <div style={{ width: 400, margin: 'auto' }}>
              <Link
                className="btn btn-outline-secondary btn-block"
                to={`${paths.createEthToken}?id=${this.state.id}`}
              >
                {'Edit'}
              </Link>
              <br />
              <EthToken ethToken={ethToken} />
              <br />
              <button className="btn btn-outline-primary btn-block">{'Deploy'}</button>
            </div>
          </div>
        )}
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  ethToken: state.token.ethToken,
  isGettingEthToken: state.token.isGettingEthToken
});

const mapDispatchToProps = (dispatch) => ({
  getEthToken: (id) => dispatch(getEthToken(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EthTokenContainer);
