import * as React from 'react';
import { Row, Col, Card, CardBody, Container } from 'reactstrap';
import Spinner from '../spinner';

interface IProps {
  t: (key: string) => string;
  isVerifyingEmail: boolean;
  isEmailVerified: boolean;
  errorMessage: string | undefined;
}

class EmailVerificationCard extends React.Component<IProps, {}> {
  public render(): React.ReactNode {
    const { t, isVerifyingEmail, errorMessage, isEmailVerified } = this.props;

    let message = errorMessage || t('emailVerificationCard.unknownError');
    if (isEmailVerified) {
      message = t('emailVerificationCard.verifiedMsg');
    }
    return (
      <Row>
        <Col sm={10} md={8} lg={5} className="mr-auto ml-auto">
          <Card className="card-user py-5">
            <Container>
              <h5 className="title text-center">{t('emailVerificationCard.title')}</h5>
              <CardBody>
                {isVerifyingEmail ? (
                  <Spinner />
                ) : (
                  <p className={`text-center ${isEmailVerified ? 'text-success' : 'text-danger'}`}>
                    {message}
                  </p>
                )}
              </CardBody>
            </Container>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default EmailVerificationCard;
