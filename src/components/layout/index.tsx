import * as React from 'react';
import { connect } from 'react-redux';
import Footer from '../footer';
import Header from '../header';
import Sidebar from '../sidebar';
import * as userActions from '../../redux/user/actions';
import { routeList, paths } from '../../routes';
import './layout.css';
import * as H from 'history';
import { Redirect } from 'react-router';

interface ILayoutProps {
  history: H.History;
  location: H.Location;
  children?: React.ReactNode;
  showSidebar: boolean;
  accessToken?: string;
  removeAccessToken: () => void;
  platform: string;
  setPlatform: (platform: string) => void;
}

class Layout extends React.Component<ILayoutProps, {}> {
  public render() {
    const {
      history,
      location,
      children,
      platform,
      accessToken,
      showSidebar,
      setPlatform,
      removeAccessToken
    } = this.props;
    const isAuth = accessToken !== undefined;

    // Handle accessToken
    if (accessToken === undefined && location.pathname !== paths.login) {
      return <Redirect to={paths.login} />;
    }

    if (showSidebar) {
      return (
        <div className="wrapper">
          <Sidebar history={history} location={location} routeList={routeList} />
          <div className="page-content-wrapper">
            <div>
              <Header
                history={history}
                location={location}
                isAuth={isAuth}
                platform={platform}
                setPlatform={setPlatform}
                logout={removeAccessToken}
              />
              {children}
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    return (
      <div className="full-page">
        <div className="full-page-content-wrapper">
          <Header
            history={history}
            location={location}
            isAuth={isAuth}
            platform={platform}
            setPlatform={setPlatform}
            logout={removeAccessToken}
            background={'transparent'}
          />
          {children}
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.user.accessToken,
  platform: state.user.platform
});

const mapDispatchToProps = (dispatch) => ({
  setPlatform: (platform) => dispatch(userActions.setPlatform(platform)),
  removeAccessToken: () => dispatch(userActions.removeAccessToken())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
