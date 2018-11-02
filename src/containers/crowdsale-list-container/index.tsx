// import * as React from 'react';
// import { connect } from 'react-redux';
// import Layout from '../../components/layout';
// import Spinner from '../../components/spinner';
// import EthFilterList from '../../components/list-filter/eth';
// import EThTokenList from '../../components/token-list/eth';
// import { translate } from 'react-i18next';
// import { getEthCrowdsales } from '../../redux/crowdsale/actions';
// import { Container } from 'reactstrap';
// import { Link } from 'react-router-dom';
// import { paths } from 'src/routes';
// import { IEthToken } from '../../ethTypes';
// import * as H from 'history';

// interface IEthCrowdsalesProps {
//   t: (key: string) => string;
//   history: H.History;
//   location: H.Location;
//   accessToken?: string;
//   ethCrowdsales: IEthToken[];
//   isGettingEthCrowdsales: boolean;
//   isGettingWeb3: boolean;
//   getEthCrowdsales: () => void;
// }

// class EthTokenListContainer extends React.Component<IEthCrowdsalesProps, {}> {
//   public componentDidMount() {
//     this.props.getEthCrowdsales();
//   }
//   public componentWillReceiveProps(nextProps) {
//     const accessTokenNext = nextProps.accessToken;
//     const accessTokenCurrent = this.props.accessToken;
//     if (nextProps.accessToken !== undefined && accessTokenNext !== accessTokenCurrent) {
//       nextProps.getEthCrowdsales();
//     }
//   }

//   public render(): React.ReactNode {
//     const isGettingEthCrowdsales: boolean = this.props.isGettingEthCrowdsales;
//     const { ethCrowdsales = [], history, location } = this.props;
//     return (
//       <Layout location={location} history={history} showSidebar={true}>
//         <Container>
//           <div style={{ margin: 20 }}>
//             <br />
//             <div className="text-center">
//               <Link to={paths.createEthToken} className="btn btn-outline-primary">
//                 {'Create Ethereum Token'}
//               </Link>
//             </div>
//             <br />
//             <hr />
//             {isGettingEthCrowdsales ? (
//               <Spinner />
//             ) : (
//               <EthFilterList list={ethCrowdsales}
//               selectedFilterKey={this.state.selectedFilterKey}
//               renderList={this.renderTokenList} />
//             )}
//           </div>
//           <hr />
//         </Container>
//       </Layout>
//     );
//   }

//   private renderTokenList = (list, selectedFilterKey)=> {
//     return (
//       <EThTokenList eth/>
//     )
//   }
// }

// const EthTokenListContainerWithI18n = translate('translations')(EthTokenListContainer);

// const mapStateToProps = (state) => ({
//   ethCrowdsales: state.token.ethCrowdsales,
//   isGettingEthCrowdsales: state.token.isGettingEthCrowdsales,
//   accessToken: state.user.accessToken
// });

// const mapDispatchToProps = (dispatch) => ({
//   getEthCrowdsales: () => dispatch(getEthCrowdsales())
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(EthTokenListContainerWithI18n);
