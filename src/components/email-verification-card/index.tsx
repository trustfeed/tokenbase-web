import * as React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody, Container } from 'reactstrap';
import { translate } from 'react-i18next';
import { NotificationManager } from 'react-notifications';
import { verifyEmail } from '../../redux/user/actions';
import Spinner from '../spinner';
import { changeQueryStringToJSON } from '../../utils/helpers';

interface IProps {
  t: (key: string) => string;
  web3: any;
  search: string;
  history: any;
  isVerifyingEmail: boolean;
  isEmailVerified: boolean;
  errorMessage: string | undefined;
  verifyEmail: (body) => void;
}

interface IState {
  token: string;
}

class EmailVerificationCard extends React.Component<IProps, IState> {
  public readonly state: IState = {
    token: ''
  };
  public componentDidMount() {
    const { search } = this.props;
    const params = changeQueryStringToJSON(search);
    const token: string = params.token;
    const tokenBody = { token };
    this.props.verifyEmail(tokenBody);
  }
  public componentWillReceiveProps(nextProps) {
    const { t } = nextProps;
    const isEmailVerifiedNext = nextProps.isEmailVerified;
    const isEmailVerifiedCurrent = this.props.isEmailVerified;
    const isEmailVerified = !isEmailVerifiedCurrent && isEmailVerifiedNext;
    const isVerifyingEmailNext = nextProps.isVerifyingEmail;
    const isVerifyingEmailCurrent = this.props.isVerifyingEmail;
    const isVerifyingEmailRequestComplete = !isVerifyingEmailNext && isVerifyingEmailCurrent;

    if (isVerifyingEmailRequestComplete) {
      if (isEmailVerified) {
        NotificationManager.success('Success', t('emailVerificationCard.verificationSuccessful'));
      } else {
        NotificationManager.error('Error', t('emailVerificationCard.verificationFailed'));
      }
    }
  }
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

const EmailVerificationCardWithTranslation = translate('translations')(EmailVerificationCard);

const mapStateToProps = state => ({
  isVerifyingEmail: state.user.isVerifyingEmail,
  isEmailVerified: state.user.isEmailVerified,
  errorMessage: state.user.errorMessage
});

const mapDispatchToProps = dispatch => ({
  verifyEmail: body => dispatch(verifyEmail(body))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailVerificationCardWithTranslation);
