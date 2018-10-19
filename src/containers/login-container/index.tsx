import * as React from 'react';
import Layout from 'src/components/layout';
import LoginCard from 'src/components/login-card';
import SignupCard from 'src/components/signup-card';
import './login-container.css';
import { paths } from 'src/routes';

export class UserContainer extends React.Component<any, {}> {
  public render(): React.ReactNode {
    const { location, history, match } = this.props;
    const { pathname } = location;
    return (
      <Layout location={location} history={history} match={match} showSidebar={false}>
        <div className="full-page-background">
          <div className="blanket">
            <div style={{ paddingTop: 240, paddingBottom: 200 }}>
              {pathname === paths.signup ? <SignupCard /> : <LoginCard />}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default UserContainer;
