import * as React from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/layout';
import { getEthToken, clearEthToken, finaliseEthToken } from '../../redux/token/actions';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { paths } from '../../routes';
import { changeQueryStringToJSON } from '../../utils/helpers';
import EthToken from '../../components/token-card/eth/Detail';
import EthPayment from '../../components/payment-card';
import Spinner from 'src/components/spinner';
import { IEthToken } from '../../ethTypes';
import * as H from 'history';

interface IProps {
  t: (key: string) => string;
  history: H.History;
  location: H.Location;
  ethToken?: IEthToken;
  getEthToken: (id: string) => void;
  clearEthToken: () => void;
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
  public componentWillUnmount() {
    this.props.clearEthToken();
  }

  public render(): React.ReactNode {
    const { isGettingEthToken, ethToken, location, history } = this.props;
    let payment;
    if (ethToken) {
      payment = ethToken.payment;
    }
    const isPaymentAvailable = payment !== undefined;
    const isPaymentComplete = payment !== undefined && payment.status === 'COMPLETE';
    const showPayment = isPaymentAvailable && !isPaymentComplete;

    return (
      <Layout location={location} history={history} showSidebar={true}>
        <Container>
          <div style={{ margin: 20 }}>
            <Link to={paths.ethTokens}>{'Back'}</Link>
          </div>
          <br />
          <div style={{ width: 600, margin: 'auto' }}>
            {isGettingEthToken ? (
              <Spinner />
            ) : (
              <div>
                {!isPaymentAvailable ? (
                  <Link
                    className="btn btn-outline-secondary btn-block"
                    to={`${paths.ethCreateToken}?id=${this.state.id}`}
                  >
                    {'Edit'}
                  </Link>
                ) : null}

                <br />
                <EthToken ethToken={ethToken} />
                <br />

                {showPayment ? <EthPayment payment={payment} /> : null}
                {!isPaymentAvailable ? (
                  <button
                    onClick={this.handleDeploy}
                    className="btn btn-outline-primary btn-block"
                    disabled={this.state.id !== undefined && isPaymentAvailable}
                  >
                    {'Deploy'}
                  </button>
                ) : null}
              </div>
            )}
          </div>
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
  finaliseEthToken: (id) => dispatch(finaliseEthToken(id)),
  clearEthToken: () => dispatch(clearEthToken())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EthTokenContainer);
