import * as React from 'react';
import { Row, Col, Card, CardBody, Container } from 'reactstrap';

interface IProps {
  title: string;
  isVerified: boolean;
  message?: string;
}

class EmailVerificationCard extends React.Component<IProps, {}> {
  public render(): React.ReactNode {
    const { title, message, isVerified } = this.props;

    return (
      <Row>
        <Col sm={10} md={8} lg={5} className="mr-auto ml-auto">
          <Card className="card-user py-5">
            <Container>
              <h5 className="title text-center">{title}</h5>
              <CardBody>
                <p className={`text-center ${isVerified ? 'text-success' : 'text-danger'}`}>
                  {message}
                </p>
              </CardBody>
            </Container>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default EmailVerificationCard;
