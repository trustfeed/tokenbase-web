import * as React from 'react';
import { connect } from 'react-redux';
import Layout from 'src/components/layout';
import LoginCard from 'src/components/login-form';
import SignUpForm from 'src/components/signup-form';
import ForgotPasswordForm from 'src/components/forgot-password-form';
import VerificationInfoCard from 'src/components/verification-info-card';
import './index.css';
import { paths } from 'src/routes';
import { signIn, signUp, requestPasswordReset } from '../../redux/user/actions';
import { translate } from 'react-i18next';
import * as H from 'history';
import { Link } from 'react-router-dom';
import { Col, Row, Container, Card, CardBody } from 'reactstrap';

interface IProps {
  t: (key: string) => string;

  history: H.History;
  location: H.Location;

  signUp: (body) => void;
  isSigningUp: boolean;
  isSignUpSuccessful: boolean;

  signIn: (body) => void;
  isSigningIn: boolean;
  accessToken?: string;

  requestPasswordReset: (body) => void;
  isRequestingPasswordReset: boolean;
  isRequestPasswordResetSuccessful: boolean;
}

interface IState {
  showEmailCheckMessage: boolean;
}

export class LoginContainer extends React.Component<IProps, IState> {
  public readonly state = {
    showEmailCheckMessage: false
  };
  public componentWillReceiveProps(nextProps) {
    const { history } = nextProps;

    const isSignInComplete = !nextProps.isSigningIn && this.props.isSigningIn;
    if (isSignInComplete) {
      const isSignInSuccessful = nextProps.accessToken;
      if (isSignInSuccessful) {
        history.push(paths.home);
      }
    }

    const isSignUpComplete = !nextProps.isSigningUp && this.props.isSigningUp;
    if (isSignUpComplete) {
      const isSignUpSuccessful = !this.props.isSignUpSuccessful && nextProps.isSignUpSuccessful;
      if (isSignUpSuccessful) {
        this.setState({ showEmailCheckMessage: true });
      }
    }

    const isRequestComplete =
      !nextProps.isRequestingPasswordReset && this.props.isRequestingPasswordReset;
    if (isRequestComplete) {
      const isRequestSuccessful =
        !this.props.isRequestPasswordResetSuccessful && nextProps.isRequestPasswordResetSuccessful;
      if (isRequestSuccessful) {
        alert('jojo');
        this.setState({ showEmailCheckMessage: true });
      }
    }
  }

  public render(): React.ReactNode {
    const { location, history, t } = this.props;
    const { pathname } = location;
    const isSignUpPath = pathname === paths.signup;
    const isLoginPath = pathname === paths.login;
    const isForgotPasswordPath = pathname === paths.forgotPassword;
    const { showEmailCheckMessage } = this.state;

    const message = 'verification.checkYourEmail';

    return (
      <Layout location={location} history={history} showSidebar={false}>
        <div className="full-page-background">
          <div className="blanket">
            <div style={{ paddingTop: 180, paddingBottom: 200 }}>
              {isSignUpPath ? (
                showEmailCheckMessage ? (
                  <VerificationInfoCard message={message} t={t} />
                ) : (
                  <Row>
                    <Col sm={10} md={8} lg={5} className="mr-auto ml-auto">
                      <Container>{this.renderSignUpCard()}</Container>
                    </Col>
                  </Row>
                )
              ) : null}

              {isLoginPath ? (
                <Row>
                  <Col sm={10} md={8} lg={5} className="mr-auto ml-auto">
                    <Container>{this.renderSignInCard()}</Container>
                  </Col>
                </Row>
              ) : null}

              {isForgotPasswordPath ? (
                showEmailCheckMessage ? (
                  <VerificationInfoCard message={message} t={t} />
                ) : (
                  <Row>
                    <Col sm={10} md={8} lg={5} className="mr-auto ml-auto">
                      <Container>{this.renderForgotPasswordCard()}</Container>
                    </Col>
                  </Row>
                )
              ) : null}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  private renderSignUpCard = () => {
    const { t } = this.props;
    return (
      <Card className="login-card">
        <CardBody>
          <h3 className="text-center">{t('login.signUpTitle')}</h3>
          <br />
          <SignUpForm handleSignUp={this.signUp} t={t} />
          <br />
          <small>
            <Link to={paths.login}>{'back to login'}</Link>
          </small>
        </CardBody>
      </Card>
    );
  };

  private renderForgotPasswordCard = () => {
    const { t } = this.props;
    return (
      <Card className="login-card">
        <CardBody>
          <h3 className="text-center">{t('login.forgotPassword')}</h3>
          <br />
          <ForgotPasswordForm handlePasswordResetRequest={this.requestPasswordReset} t={t} />
        </CardBody>
      </Card>
    );
  };

  private renderSignInCard = () => {
    const { t } = this.props;
    return (
      <Card className="login-card">
        <CardBody>
          <h3 className="text-center">{t('login.signUpTitle')}</h3>
          <br />
          <LoginCard handleSignIn={this.signIn} t={t} />
          <br />
          <div className="float-left">
            <small>
              <Link to={paths.forgotPassword}>{t('login.forgotPassword')}</Link>
            </small>
          </div>
          <div className="float-right">
            <small>
              <Link to={paths.signup}>{t('login.linkToSignUp')}</Link>
            </small>
          </div>
        </CardBody>
      </Card>
    );
  };

  private signIn = (email: string, password: string): void => {
    const body = {
      email,
      password
    };
    this.props.signIn(body);
  };

  private requestPasswordReset = (email: string): void => {
    const body = {
      email
    };
    this.props.requestPasswordReset(body);
  };

  private signUp = (email: string, password: string): void => {
    const body = {
      email,
      password
    };
    this.props.signUp(body);
  };
}

const WithTranslation = translate('translations')(LoginContainer);

const mapStateToProps = (state) => ({
  isSigningIn: state.user.isSigningIn,
  isSigningUp: state.user.isSigningUp,
  isSignUpSuccessful: state.user.isSignUpSuccessful,
  isRequestingPasswordReset: state.user.isRequestingPasswordReset,
  isRequestPasswordResetSuccessful: state.user.isRequestPasswordResetSuccessful,
  accessToken: state.user.accessToken
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (body) => dispatch(signIn(body)),
  signUp: (body) => dispatch(signUp(body)),
  requestPasswordReset: (body) => dispatch(requestPasswordReset(body))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithTranslation);
