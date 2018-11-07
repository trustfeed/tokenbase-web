import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { Container } from 'reactstrap';
import Layout from '../../components/layout';
import CreateCrowdsale from '../../components/crowdsale-form';
import {
  createEthCrowdsale,
  getEthCrowdsale,
  updateEthCrowdsale,
  clearEthCrowdsale
} from '../../redux/crowdsale/actions';
import { getEthTokens } from '../../redux/token/actions';
import { changeQueryStringToJSON } from '../../utils/helpers';
import * as H from 'history';
import { IEthToken, IEthCrowdsale } from '../../ethTypes';
import Spinner from '../../components/spinner';
import { Link } from 'react-router-dom';
import { paths } from '../../routes';

import { FaArrowLeft } from 'react-icons/fa';

interface IProps {
  t: (key: string) => string;
  history: H.History;
  location: H.Location;
  ethCrowdsale: IEthCrowdsale;
  createEthCrowdsale: (body) => void;
  getEthTokens: () => void;
  getEthCrowdsale: (id: string) => void;
  updateEthCrowdsale: (body, id: string) => void;
  clearEthCrowdsale: () => void;
  isGettingEthCrowdsale: boolean;
  ethTokens?: IEthToken[];
}

interface IState {
  id?: string;
}

class CrowdsaleFormContainer extends React.Component<IProps, IState> {
  public readonly state: IState = {
    id: undefined
  };

  public componentDidMount() {
    this.props.getEthTokens();

    const { location } = this.props;
    const queryString = location.search.slice(1);
    const params = changeQueryStringToJSON(queryString);
    const id = params.id;
    if (id !== undefined) {
      this.setState({ id }, () => this.props.getEthCrowdsale(id));
    }
  }

  public componentWillUnmount() {
    this.props.clearEthCrowdsale();
  }

  public render(): React.ReactNode {
    const { t, location, history, ethTokens, ethCrowdsale, isGettingEthCrowdsale } = this.props;
    const { id } = this.state;
    return (
      <Layout location={location} history={history} showSidebar={true}>
        <Container>
          <div style={{ margin: 20 }}>
            <Link to={id ? `${paths.ethCrowdsale}?id=${id}` : paths.ethCrowdsales}>
              <FaArrowLeft />
            </Link>
          </div>
          <br />
          <h5 className="text-center">
            {t(id ? 'ethCrowdsale.updateTitle' : 'ethCrowdsale.createTitle')}
          </h5>
          <br />
          {isGettingEthCrowdsale ? (
            <Spinner />
          ) : (
            <CreateCrowdsale
              onSubmit={id ? this.props.updateEthCrowdsale : this.props.createEthCrowdsale}
              t={t}
              ethTokens={ethTokens}
              ethCrowdsale={ethCrowdsale}
            />
          )}
        </Container>
      </Layout>
    );
  }
}

const WithTranslation = translate('translations')(CrowdsaleFormContainer);

const mapStateToProps = (state) => ({
  ethTokens: state.token.ethTokens,
  ethCrowdsale: state.crowdsale.ethCrowdsale,
  isGettingEthCrowdsale: state.crowdsale.isGettingEthCrowdsale
});
const mapDispatchToProps = (dispatch) => ({
  createEthCrowdsale: (body) => dispatch(createEthCrowdsale(body)),
  getEthTokens: () => dispatch(getEthTokens()),
  getEthCrowdsale: (id) => dispatch(getEthCrowdsale(id)),
  updateEthCrowdsale: (body, id) => dispatch(updateEthCrowdsale(body, id)),
  clearEthCrowdsale: () => dispatch(clearEthCrowdsale())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithTranslation);
