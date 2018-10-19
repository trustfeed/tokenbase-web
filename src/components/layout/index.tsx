import * as React from 'react';
import { connect } from 'react-redux';
import Footer from '../footer';
import Header from '../header';
import Sidebar from '../sidebar';

import { routeList } from '../../routes';
import './layout.css';

interface ILayoutProps {
  location: {
    pathname: string;
    search: string;
  };
  match: object;
  history: object;
  children?: React.ReactNode;
  accessToken: string | undefined;
  showSidebar: boolean;
  getUser: () => void;
}

class Layout extends React.Component<ILayoutProps, {}> {
  public render() {
    const { history, location, match, children, accessToken, showSidebar } = this.props;
    const isAuth = !!accessToken;

    if (showSidebar) {
      return (
        <div className="wrapper">
          <Sidebar history={history} location={location} match={match} routeList={routeList} />
          <div className="page-content-wrapper">
            <div>
              <Header history={history} location={location} match={match} isAuth={isAuth} />
              {children}
              <Footer />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="full-page">
        <div className="full-page-content-wrapper">
          <Header
            history={history}
            location={location}
            match={match}
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

const mapStateToProps = state => ({
  accessToken: state.user.accessToken
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
