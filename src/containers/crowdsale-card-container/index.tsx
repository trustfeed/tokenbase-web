import * as React from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/layout';
import { translate } from 'react-i18next';
import {
  getEthCrowdsale,
  clearEthCrowdsale,
  finaliseEthCrowdsale
} from '../../redux/crowdsale/actions';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { paths } from '../../routes';
import { changeQueryStringToJSON } from '../../utils/helpers';
import EthCrowdsale from '../../components/crowdsale-card/eth/Detail';
import EthPayment from '../../components/payment-card';
import Spinner from 'src/components/spinner';
import { IEthCrowdsale } from '../../ethTypes';
import * as H from 'history';

interface IProps {
  t: (key: string) => string;
  history: H.History;
  location: H.Location;
  ethCrowdsale?: IEthCrowdsale;
  getEthCrowdsale: (id: string) => void;
  clearEthCrowdsale: () => void;
  finaliseEthCrowdsale: (id: string) => void;
  isGettingEthCrowdsale: boolean;
}

interface IState {
  id: string;
}
export class EthCrowdsaleContainer extends React.Component<IProps, IState> {
  public readonly state = {
    id: ''
  };

  public async componentDidMount() {
    const { location } = this.props;
    const queryString = location.search.slice(1);
    const params = changeQueryStringToJSON(queryString);
    const id = params.id;

    this.setState({ id }, () => this.props.getEthCrowdsale(id));
  }
  public componentWillUnmount() {
    this.props.clearEthCrowdsale();
  }

  public render(): React.ReactNode {
    const { isGettingEthCrowdsale, ethCrowdsale, location, history, t } = this.props;
    let payment;
    if (ethCrowdsale) {
      payment = ethCrowdsale.payment;
    }
    const isPaymentAvailable = payment !== undefined;
    const isPaymentComplete = payment !== undefined && payment.status === 'COMPLETE';
    const showPayment = isPaymentAvailable && !isPaymentComplete;

    return (
      <Layout location={location} history={history} showSidebar={true}>
        <Container>
          <div style={{ margin: 20 }}>
            <Link to={paths.ethCrowdsales}>{'Back'}</Link>
          </div>
          <br />
          <div style={{ width: 600, margin: 'auto' }}>
            {isGettingEthCrowdsale ? (
              <Spinner />
            ) : (
              <div>
                {!isPaymentAvailable ? (
                  <Link
                    className="btn btn-outline-secondary btn-block"
                    to={`${paths.ethCreateCrowdsale}?id=${this.state.id}`}
                  >
                    {'Edit'}
                  </Link>
                ) : null}

                <br />
                <EthCrowdsale ethCrowdsale={ethCrowdsale} t={t} />
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
    this.props.finaliseEthCrowdsale(id);
  };
}

const WithTranslation = translate('translations')(EthCrowdsaleContainer);

const mapStateToProps = (state) => ({
  ethCrowdsale: state.crowdsale.ethCrowdsale,
  isGettingEthCrowdsale: state.crowdsale.isGettingEthCrowdsale
});

const mapDispatchToProps = (dispatch) => ({
  getEthCrowdsale: (id) => dispatch(getEthCrowdsale(id)),
  finaliseEthCrowdsale: (id) => dispatch(finaliseEthCrowdsale(id)),
  clearEthCrowdsale: () => dispatch(clearEthCrowdsale())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithTranslation);
