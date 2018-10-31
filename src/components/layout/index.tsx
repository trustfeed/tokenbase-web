import * as React from 'react';
import { connect } from 'react-redux';
import Footer from '../footer';
import Header from '../header';
import Sidebar from '../sidebar';
import { setPlatform } from '../../redux/user/actions';
import { routeList } from '../../routes';
import './layout.css';
import * as H from 'history';

interface ILayoutProps {
  history: H.History;
  location: H.Location;
  children?: React.ReactNode;
  accessToken?: string;
  showSidebar: boolean;
  getUser: () => void;
  platform: string;
  setPlatform: (platform: string) => void;
}

class Layout extends React.Component<ILayoutProps, {}> {
  public render() {
    const { history, location, children, platform, accessToken, showSidebar } = this.props;
    const isAuth = !!accessToken;

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
                setPlatform={this.props.setPlatform}
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
  setPlatform: (platform) => dispatch(setPlatform(platform))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
