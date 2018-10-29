import * as React from 'react';
import { connect } from 'react-redux';
import { Container, Card, CardBody, Row, Col } from 'reactstrap';
import Layout from '../../components/layout';
import uuidv4 from 'uuid/v4';
import Spinner from '../../components/spinner';
import { translate } from 'react-i18next';
import { getEthTokens } from '../../redux/token/actions';

interface IEthTokensProps {
  t: (key: string) => string;
  accessToken: string;
  ethTokens: any[];
  isGettingEthTokens: boolean;
  isGettingWeb3: boolean;
  getEthTokens: () => void;
}

class EthTokenList extends React.Component<IEthTokensProps, {}> {
  public componentDidMount() {
    if (this.props.accessToken) {
      this.props.getEthTokens();
    }
  }
  public componentWillReceiveProps(nextProps) {
    const accessTokenNext = nextProps.accessToken;
    const accessTokenCurrent = this.props.accessToken;
    if (nextProps.accessToken && accessTokenNext !== accessTokenCurrent) {
      nextProps.getEthTokens();
    }
  }

  public render(): React.ReactNode {
    const isGettingEthTokens: boolean = this.props.isGettingEthTokens;

    return (
      <Layout location={location} history={history} showSidebar={true}>
        <Container>
          <div className="container text-center">
            <h4 style={{ color: 'black', fontSize: 24, paddingTop: 85, paddingBottom: 15 }}>
              {'My Ethereum Tokens'}
            </h4>
          </div>

          {isGettingEthTokens ? <Spinner /> : <Row>{this.renderCampaignViewList()}</Row>}
        </Container>
      </Layout>
    );
  }

  private renderCampaignViewList = (): React.ReactNode => {
    const ethTokens = this.props.ethTokens || [];
    console.log('l', ethTokens);
    return ethTokens.map((item) => {
      return (
        <Col xs="12" sm="12" md="12" lg="4" key={uuidv4()}>
          <Card>
            <CardBody>
              <p>{JSON.stringify(item)}</p>
            </CardBody>
          </Card>
        </Col>
      );
    });
  };
}

const EthTokenListWithI18n = translate('translations')(EthTokenList);

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
)(EthTokenListWithI18n);
