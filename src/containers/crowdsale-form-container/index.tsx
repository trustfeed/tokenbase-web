import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { Container } from 'reactstrap';
import Layout from '../../components/layout';
import CreateCrowdsale from '../../components/crowdsale-form';
import { createEthCrowdsale } from '../../redux/crowdsale/actions';
import { getEthTokens } from '../../redux/token/actions';
import { changeQueryStringToJSON } from '../../utils/helpers';
import * as H from 'history';
import { IEthToken } from '../../ethTypes';
interface IProps {
  t: (key: string) => string;
  history: H.History;
  location: H.Location;
  createEthCrowdsale: (body) => void;
  getEthTokens: () => void;
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
      this.setState({ id });
    }
  }

  public render(): React.ReactNode {
    const { t, location, history, ethTokens } = this.props;
    const { id } = this.state;
    return (
      <Layout location={location} history={history} showSidebar={true}>
        <Container>
          <br />
          <h5 className="text-center">
            {t(id ? 'ethCrowdsale.updateTitle' : 'ethCrowdsale.createTitle')}
          </h5>
          <br />
          <CreateCrowdsale onSubmit={createEthCrowdsale} t={t} ethTokens={ethTokens} />
        </Container>
      </Layout>
    );
  }
}

const WithTranslation = translate('translations')(CrowdsaleFormContainer);

const mapStateToProps = (state) => ({
  ethTokens: state.token.ethTokens
});
const mapDispatchToProps = (dispatch) => ({
  createEthCrowdsale: (body) => dispatch(createEthCrowdsale(body)),
  getEthTokens: () => dispatch(getEthTokens())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithTranslation);
