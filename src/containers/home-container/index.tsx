import * as React from 'react';
import Layout from '../../components/layout';
import { Container } from 'reactstrap';

export class UserContainer extends React.Component<any, {}> {
  public render(): React.ReactNode {
    const { location, history, match } = this.props;
    return (
      <Layout location={location} history={history} match={match} showSidebar={true}>
        <Container>
          <p>Home</p>
        </Container>
      </Layout>
    );
  }
}

export default UserContainer;
