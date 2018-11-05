import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { Container } from 'reactstrap';
import Layout from '../../components/layout';
import TokenForm from '../../components/token-form';
import {
  createEthToken,
  updateEthToken,
  getEthToken,
  clearEthToken
} from '../../redux/token/actions';
import { changeQueryStringToJSON } from '../../utils/helpers';
import { paths } from '../../routes';
import { Link } from 'react-router-dom';
import { IEthToken } from '../../ethTypes';
import Spinner from '../../components/spinner';
import * as H from 'history';

interface IProps {
  t: (key: string) => string;
  history: H.History;
  location: H.Location;
  createEthToken: (body) => void;
  updateEthToken: (body, id) => void;
  getEthToken: (id: string) => void;
  clearEthToken: () => void;
  ethToken?: IEthToken;
  isGettingEthToken: boolean;
}

interface IState {
  id?: string;
}

class EthTokenForm extends React.Component<IProps, IState> {
  public readonly state: IState = {
    id: undefined
  };
  public componentDidMount() {
    const { location } = this.props;
    const queryString = location.search.slice(1);
    const params = changeQueryStringToJSON(queryString);
    const id = params.id;
    if (id !== undefined) {
      this.setState({ id }, () => this.props.getEthToken(id));
    }
  }

  public componentWillUnmount() {
    this.props.clearEthToken();
  }

  public render(): React.ReactNode {
    const { t, location, history, ethToken, isGettingEthToken } = this.props;
    const { id } = this.state;
    return (
      <Layout location={location} history={history} showSidebar={true}>
        <Container>
          <div style={{ margin: 20 }}>
            <Link to={id ? `${paths.ethToken}?id=${id}` : paths.ethTokens}>{'Back'}</Link>
          </div>
          <br />
          <h5 className="text-center">{t(id ? 'ethToken.updateTitle' : 'ethToken.createTitle')}</h5>
          <br />
          {isGettingEthToken ? (
            <Spinner />
          ) : (
            <TokenForm
              onSubmit={ethToken ? this.props.updateEthToken : this.props.createEthToken}
              t={t}
              ethToken={ethToken}
            />
          )}
        </Container>
      </Layout>
    );
  }
}

const WithTranslation = translate('translations')(EthTokenForm);

const mapStateToProps = (state) => ({
  ethToken: state.token.ethToken,
  isGettingEthToken: state.token.isGettingEthToken
});
const mapDispatchToProps = (dispatch) => ({
  createEthToken: (body) => dispatch(createEthToken(body)),
  updateEthToken: (body, id) => dispatch(updateEthToken(body, id)),
  getEthToken: (id) => dispatch(getEthToken(id)),
  clearEthToken: () => dispatch(clearEthToken())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithTranslation);
