import * as React from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/layout';
import { getEthToken, finaliseEthToken } from '../../redux/token/actions';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { paths } from '../../routes';
import { changeQueryStringToJSON } from '../../utils/helpers';
import EthToken from '../../components/token-card/eth/EthTokenDetail';
import Spinner from 'src/components/spinner';
import { IEthToken } from '../../ethTypes';
import * as H from 'history';

interface IProps {
  history: H.History;
  location: H.Location;
  ethToken: IEthToken | undefined;
  getEthToken: (id: string) => void;
  finaliseEthToken: (id: string) => void;
  isGettingEthToken: boolean;
}

interface IState {
  id: string;
}
export class EthTokenContainer extends React.Component<IProps, IState> {
  public readonly state = {
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
    return (
      <Layout location={location} history={history} showSidebar={true}>
        <Container>
          <div style={{ margin: 20 }}>
            <Link to={paths.ethTokens}>{'Back'}</Link>
          </div>
          <br />
          {isGettingEthToken ? (
            <Spinner />
          ) : (
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
              <button
                onClick={this.handleDeploy}
                className="btn btn-outline-primary btn-block"
                disabled={!this.state.id}
              >
                {'Deploy'}
              </button>
            </div>
          )}
        </Container>
      </Layout>
    );
  }
  private handleDeploy = (e) => {
    e.preventDefault();
    const { id } = this.state;
    this.props.finaliseEthToken(id);
  };
}

const mapStateToProps = (state) => ({
  ethToken: state.token.ethToken,
  isGettingEthToken: state.token.isGettingEthToken
});

const mapDispatchToProps = (dispatch) => ({
  getEthToken: (id) => dispatch(getEthToken(id)),
  finaliseEthToken: (id) => dispatch(finaliseEthToken(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EthTokenContainer);
