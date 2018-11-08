import React from 'react';
import { Col, Row, Card, CardTitle } from 'reactstrap';

interface IProps {
  t: (key: string) => string;
  email: string;
  isTwoFactorEnabled: boolean;
}

export default class UserInfoCard extends React.Component<IProps, {}> {
  public render() {
    const { isTwoFactorEnabled, email } = this.props;
    return (
      <Row>
        <Col sm={10} md={8} lg={8} className="mr-auto ml-auto">
          <Card>
            <div className="text-center">
              <br />
              <CardTitle className="text-gray">{'User Info'}</CardTitle>
              <Row>
                <Col xs={4} sm={4} md={4} lg={4}>
                  <span className="float-right text-gray">{'Email: '}</span>
                  <br />
                  <span className="float-right text-gray">{'2FA: '}</span>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8}>
                  <span className="float-left text-gray">{email}</span>
                  <br />
                  <span className="float-left text-gray">
                    {isTwoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </Col>
              </Row>
              <br />
              <div />
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}
