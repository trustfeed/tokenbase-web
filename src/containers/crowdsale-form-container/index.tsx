import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { Container } from 'reactstrap';
import Layout from '../../components/layout';
import CreateCrowdsale from '../../components/crowdsale-form';
import { createEthCrowdsale } from '../../redux/crowdsale/actions';
import { changeQueryStringToJSON } from '../../utils/helpers';
import * as H from 'history';

interface IOnChainDataFormProps {
  t: (key: string) => string;
  history: H.History;
  location: H.Location;
  createEthCrowdsale: (body) => void;
}

class OnChainDataForm extends React.Component<IOnChainDataFormProps, {}> {
  public componentDidMount() {
    const { location } = this.props;
    const queryString = location.search.slice(1);
    const params = changeQueryStringToJSON(queryString);
    const id = params.id;
    if (id !== undefined) {
      // this.setState({ id }, () => this.props.getOwnedCampaign(id));
    }
  }

  public render(): React.ReactNode {
    const { t, location, history } = this.props;

    return (
      <Layout location={location} history={history} showSidebar={true}>
        <Container>
          <br />
          <h5 className="text-center">{t('ethCrowdsale.title')}</h5>
          <br />
          <CreateCrowdsale onSubmit={createEthCrowdsale} t={t} />
        </Container>
      </Layout>
    );
  }
}

const WithTranslation = translate('translations')(OnChainDataForm);

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  createEthCrowdsale: (body) => dispatch(createEthCrowdsale(body))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithTranslation);
