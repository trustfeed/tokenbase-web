import * as React from 'react';
import { connect } from 'react-redux';
import Layout from 'src/components/layout';
import LoginCard from 'src/components/login-form';
import SignupCard from 'src/components/signup-form';
import './login-container.css';
import { paths } from 'src/routes';
import { NotificationManager } from 'react-notifications';
import { signIn, signUp } from '../../redux/user/actions';
import { translate } from 'react-i18next';
import * as H from 'history';

interface IProps {
  t: (key: string) => string;

  history: H.History;
  location: H.Location;

  signUp: (body) => void;
  isSigningUp: boolean;
  isSignUpSuccessful: boolean;

  signIn: (body) => void;
  isSigningIn: boolean;
  accessToken: string;
}

export class LoginContainer extends React.Component<IProps, {}> {
  public componentWillReceiveProps(nextProps) {
    const { t } = nextProps;
    const accessTokenNext = nextProps.accessToken;
    const accessTokenCurrent = this.props.accessToken;
    const hasAccessToken = !accessTokenCurrent && accessTokenNext;
    const isSigningInNext = nextProps.isSigningIn;
    const isSigningInCurrent = this.props.isSigningIn;
    const isSigningInRequestComplete = !isSigningInNext && isSigningInCurrent;

    if (isSigningInRequestComplete) {
      if (hasAccessToken) {
        NotificationManager.success('Success', t('login.success'));
      } else {
        NotificationManager.error('Error', t('login.failure'));
      }
    }

    const isSignUpSuccessfulNext = nextProps.isSignUpSuccessful;
    const isSignUpSuccessfulCurrent = this.props.isSignUpSuccessful;
    const isSignUpSuccessful = !isSignUpSuccessfulCurrent && isSignUpSuccessfulNext;
    const isSigningUpNext = nextProps.isSigningUp;
    const isSigningUpCurrent = this.props.isSigningUp;
    const isSigningUpRequestComplete = !isSigningUpNext && isSigningUpCurrent;

    if (isSigningUpRequestComplete) {
      if (isSignUpSuccessful) {
        NotificationManager.success('Success', t('signup.success'));
      } else {
        NotificationManager.error('Error', t('signup.failure'));
      }
    }
  }
  public render(): React.ReactNode {
    const { location, history, t } = this.props;
    const { pathname } = location;
    return (
      <Layout location={location} history={history} showSidebar={false}>
        <div className="full-page-background">
          <div className="blanket">
            <div style={{ paddingTop: 240, paddingBottom: 200 }}>
              {pathname === paths.signup ? (
                <SignupCard handleSignUp={this.signUp} t={t} />
              ) : (
                <LoginCard handleSignIn={this.signIn} t={t} />
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  private signIn = (email: string, password: string): void => {
    const body = {
      email,
      password
    };
    this.props.signIn(body);
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
  accessToken: state.user.accessToken
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (body) => dispatch(signIn(body)),
  signUp: (body) => dispatch(signUp(body))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithTranslation);
