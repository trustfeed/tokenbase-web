import * as React from 'react';
import Layout from '../../components/layout';
import EmailVerificationCard from '../../components/email-verification-card';

export class EmailVerificationCardContainer extends React.Component<any, {}> {
  public render(): React.ReactNode {
    const { location, history, match } = this.props;
    const search: string = location.search.slice(1);
    return (
      <Layout location={location} history={history} match={match} showSidebar={false}>
        <div className="full-page-background">
          <div className="blanket">
            <div style={{ paddingTop: 240, paddingBottom: 200 }}>
              <EmailVerificationCard search={search} history={history} />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default EmailVerificationCardContainer;
