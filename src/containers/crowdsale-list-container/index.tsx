import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/layout';
import Spinner from '../../components/spinner';
import EthFilterList from '../../components/list-filter/eth';
import EThCrowdsaleList from '../../components/crowdsale-list/eth';
import { translate } from 'react-i18next';
import { getEthTokens } from '../../redux/token/actions';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { paths } from '../../routes';
import { IEthCrowdsale, EthStatusType } from '../../ethTypes';
import * as H from 'history';

const mockupList = [
  {
    goal: '1',
    cap: '100',
    duration: 60,
    id: '5bcd38c4137a0032b9ec0a89',
    minted: true,
    name: 'Some ID, Just for user',
    network: 'parity.trustfeed.io',
    openingTime: 10,
    rate: '1',
    status: 'DRAFT',
    wallet: '0x3Aa9CE734DD21FA5E6962978e2ccc7f4Ac513348',
    token: '0x3Aa7E32BD54'
  }
];

interface IEthTokensProps {
  t: (key: string) => string;
  history: H.History;
  location: H.Location;
  accessToken?: string;
  ethCrowdsales: IEthCrowdsale[];
  isGettingEthTokens: boolean;
  isGettingWeb3: boolean;
  getEthTokens: () => void;
}
interface IState {
  selectedFilterKey: EthStatusType;
}

class EthTokenListContainer extends React.Component<IEthTokensProps, IState> {
  public readonly state: IState = {
    selectedFilterKey: 'ALL'
  };
  public componentDidMount() {
    this.props.getEthTokens();
  }
  public componentWillReceiveProps(nextProps) {
    const accessTokenNext = nextProps.accessToken;
    const accessTokenCurrent = this.props.accessToken;
    if (nextProps.accessToken !== undefined && accessTokenNext !== accessTokenCurrent) {
      nextProps.getEthTokens();
    }
  }

  public render(): React.ReactNode {
    const isGettingEthTokens: boolean = this.props.isGettingEthTokens;
    const { ethCrowdsales = [], history, location, t } = this.props;
    return (
      <Layout location={location} history={history} showSidebar={true}>
        <Container>
          <div style={{ margin: 20 }}>
            <br />
            <div className="text-center">
              <Link to={paths.ethCreateCrowdsale} className="btn btn-primary">
                {'Create Ethereum Crowdsale'}
              </Link>
            </div>
            <br />
            <hr />
            {isGettingEthTokens ? (
              <Spinner />
            ) : (
              <EthFilterList
                list={[...ethCrowdsales, ...mockupList]}
                selectedFilterKey={this.state.selectedFilterKey}
                handleSelect={(selectedFilterKey) => this.setState({ selectedFilterKey })}
                renderList={(list, selectedFilterKey) => (
                  <EThCrowdsaleList
                    ethCrowdsales={list}
                    selectedFilterKey={selectedFilterKey}
                    t={t}
                  />
                )}
              />
            )}
          </div>
          <hr />
        </Container>
      </Layout>
    );
  }
}

const EthTokenListContainerWithI18n = translate('translations')(EthTokenListContainer);

const mapStateToProps = (state) => ({
  ethCrowdsales: state.token.ethCrowdsales,
  isGettingEthTokens: state.token.isGettingEthTokens,
  accessToken: state.user.accessToken
});

const mapDispatchToProps = (dispatch) => ({
  getEthTokens: () => dispatch(getEthTokens())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EthTokenListContainerWithI18n);
