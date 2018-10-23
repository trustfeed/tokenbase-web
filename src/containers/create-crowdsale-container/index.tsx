import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { Container } from 'reactstrap';
import Layout from '../../components/layout';
import CreateCrowdsale from '../../components/create-crowdsale';
import { NotificationManager } from 'react-notifications';
import { createCrowdsaleContract } from '../../redux/contract/actions';
import { changeQueryStringToJSON } from '../../utils/helpers';

interface IOnChainDataFormProps {
  t: (key: string) => string;
  location: any;
  history: any;
  createCrowdsaleContract: (body) => void;
  hasCampaignCreated: boolean | undefined;
  isCreatingCampaign: boolean | undefined;
  hasOnChainDataUpdated: boolean | undefined;
}

class OnChainDataForm extends React.Component<IOnChainDataFormProps, {}> {
  public componentDidMount() {
    const { location } = this.props;
    const queryString = location.search.slice(1);
    const params = changeQueryStringToJSON(queryString);
    const id = params.id;
    if (id) {
      // this.setState({ id }, () => this.props.getOwnedCampaign(id));
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
    const { t, location, history } = this.props;

    return (
      <Layout location={location} history={history} showSidebar={true}>
        <Container>
          <br />
          <h5 className="text-center">{t('createCrowdsale.title')}</h5>
          <br />
          <CreateCrowdsale onSubmit={createCrowdsaleContract} t={t} />
        </Container>
      </Layout>
    );
  }
}

const WithTranslation = translate('translations')(OnChainDataForm);

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  createCrowdsaleContract: (body) => dispatch(createCrowdsaleContract(body))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithTranslation);