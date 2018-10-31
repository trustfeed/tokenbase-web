import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { Container } from 'reactstrap';
import Layout from '../../components/layout';
import CreateToken from '../../components/token-form';
import { NotificationManager } from 'react-notifications';
import { createEthToken, getEthToken } from '../../redux/token/actions';
import { changeQueryStringToJSON } from '../../utils/helpers';
import { paths } from 'src/routes';
import { Link } from 'react-router-dom';

interface IProps {
  t: (key: string) => string;
  location: any;
  history: any;
  createEthToken: (body) => void;
  getEthToken: (id: string) => void;
  ethToken: any;
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
    const { t, location, history, ethToken } = this.props;

    return (
      <Layout location={location} history={history} showSidebar={true}>
        <Container>
          <div style={{ margin: 20 }}>
            <Link to={paths.ethTokens}>{'Back'}</Link>
          </div>
          <br />
          <h5 className="text-center">{t('ethToken.title')}</h5>
          <br />
          <CreateToken onSubmit={this.props.createEthToken} t={t} ethToken={ethToken} />
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
  getEthToken: (id) => dispatch(getEthToken(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithTranslation);
