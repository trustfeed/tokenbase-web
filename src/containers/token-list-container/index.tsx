import * as React from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/layout';
import Spinner from '../../components/spinner';
import EthTokenFilterList from '../../components/token-list/eth/token-filter-list';
import { translate } from 'react-i18next';
import { getEthTokens } from '../../redux/token/actions';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { paths } from 'src/routes';
import { IEthToken } from '../../ethTypes';
const mockupEthTokenlist = [
  {
    id: 'fdsafds63afas',
    network: 'rinkeby(mockup)',
    name: 'Theta Coin',
    symbol: 'TC',
    decimals: 18,
    mintable: true,
    minters: ['0x432343'],
    status: 'DRAFT'
  },
  {
    id: 'fdsafds11afas',
    network: 'rinkeby(mockup)',
    name: 'Beta Coin',
    symbol: 'BC',
    decimals: 18,
    mintable: true,
    minters: ['0x432343'],
    status: 'DRAFT'
  }
];

interface IEthTokensProps {
  t: (key: string) => string;
  accessToken?: string;
  ethTokens: IEthToken[];
  isGettingEthTokens: boolean;
  isGettingWeb3: boolean;
  getEthTokens: () => void;
}

class EthTokenListContainer extends React.Component<IEthTokensProps, {}> {
  public componentDidMount() {
    if (this.props.accessToken !== undefined) {
      this.props.getEthTokens();
    }
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
    const { ethTokens = [] } = this.props;
    return (
      <Layout location={location} history={history} showSidebar={true}>
        <Container>
          <div style={{ margin: 20 }}>
            <br />
            <div className="text-center">
              <Link to={paths.createEthToken} className="btn btn-outline-primary">
                {'Create Ethereum Token'}
              </Link>
            </div>
            <br />
            <hr />
            {isGettingEthTokens ? (
              <Spinner />
            ) : (
              <EthTokenFilterList ethTokens={[...ethTokens, ...mockupEthTokenlist]} />
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
  ethTokens: state.token.ethTokens,
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
