import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { Container } from 'reactstrap';
import Layout from '../../components/layout';
import TokenForm from '../../components/token-form';
import { NotificationManager } from 'react-notifications';
import { createEthToken, updateEthToken, getEthToken } from '../../redux/token/actions';
import { changeQueryStringToJSON } from '../../utils/helpers';
import { paths } from 'src/routes';
import { Link } from 'react-router-dom';
import { IEthToken } from '../../ethTypes';
import Spinner from 'src/components/spinner';

interface IProps {
  t: (key: string) => string;
  location: any;
  history: any;
  createEthToken: (body) => void;
  updateEthToken: (body, id) => void;
  getEthToken: (id: string) => void;
  ethToken: IEthToken | undefined;
  isGettingEthToken: boolean;

  hasCampaignCreated: boolean | undefined;
  isCreatingCampaign: boolean | undefined;
  hasOnChainDataUpdated: boolean | undefined;
}

interface IState {
  id: string | undefined;
}

class OnChainDataForm extends React.Component<IProps, IState> {
  public componentDidMount() {
    const { location } = this.props;
    const queryString = location.search.slice(1);
    const params = changeQueryStringToJSON(queryString);
    const id = params.id;
    if (id) {
      this.setState({ id }, () => this.props.getEthToken(id));
    }
  }

  public componentWillReceiveProps(nextProps) {
    const hasCreatedNext = nextProps.hasCampaignCreated;
    const hasCreatedCurrent = this.props.hasCampaignCreated;

    const hasOnChainDataUpdatedNext = nextProps.hasOnChainDataUpdated;
    const hasOnChainDataUpdatedCurrent = this.props.hasOnChainDataUpdated;

    if (hasCreatedNext && !hasCreatedCurrent) {
      NotificationManager.success('Success', 'Campaign has been created successfully');
    }

    if (hasOnChainDataUpdatedNext && !hasOnChainDataUpdatedCurrent) {
      NotificationManager.success('Success', 'Campaign has been updated successfully');
    }
  }

  public render(): React.ReactNode {
    const { t, location, history, ethToken, isGettingEthToken } = this.props;
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

const WithTranslation = translate('translations')(OnChainDataForm);

const mapStateToProps = (state) => ({
  ethToken: state.token.ethToken,
  isGettingEthToken: state.token.isGettingEthToken
});
const mapDispatchToProps = (dispatch) => ({
  createEthToken: (body) => dispatch(createEthToken(body)),
  updateEthToken: (body, id) => dispatch(updateEthToken(body, id)),
  getEthToken: (id) => dispatch(getEthToken(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithTranslation);
