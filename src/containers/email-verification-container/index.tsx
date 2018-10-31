import * as React from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/layout';
import EmailVerificationCard from '../../components/email-verification-card';
import { NotificationManager } from 'react-notifications';
import { changeQueryStringToJSON } from '../../utils/helpers';
import { verifyEmail } from '../../redux/user/actions';
import { translate } from 'react-i18next';
import Spinner from 'src/components/spinner';
import * as H from 'history';

interface IProps {
  t: (key: string) => string;
  history: H.History;
  location: H.Location;
  isVerifyingEmail: boolean;
  isEmailVerified: boolean;
  errorMessage: string | undefined;
  verifyEmail: (body) => void;
}

export class EmailVerificationCardContainer extends React.Component<IProps, {}> {
  public componentDidMount() {
    const location = this.props.location || {};
    const search: string = location.search.slice(1);

    const params = changeQueryStringToJSON(search);
    const token: string = params.token;
    const tokenBody = { token };
    this.props.verifyEmail(tokenBody);
  }
  public componentWillReceiveProps(nextProps) {
    const { t } = nextProps;
    const isEmailVerifiedNext = nextProps.isEmailVerified;
    const isEmailVerifiedCurrent = this.props.isEmailVerified;
    const isEmailVerified: boolean = !isEmailVerifiedCurrent && isEmailVerifiedNext;
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
    const { location, history, t, isVerifyingEmail, isEmailVerified, errorMessage } = this.props;

    let message = errorMessage || t('emailVerificationCard.unknownError');
    if (isEmailVerified) {
      message = t('emailVerificationCard.verifiedMsg');
    }
    const title = t('emailVerificationCard.title');
    return (
      <Layout location={location} history={history} showSidebar={false}>
        <div className="full-page-background">
          <div className="blanket">
            <div style={{ paddingTop: 240, paddingBottom: 200 }}>
              {isVerifyingEmail ? (
                <Spinner />
              ) : (
                <EmailVerificationCard
                  title={title}
                  isVerified={isEmailVerified}
                  message={message}
                />
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
const WithTranslation = translate('translations')(EmailVerificationCardContainer);

const mapStateToProps = (state) => ({
  isVerifyingEmail: state.user.isVerifyingEmail,
  isEmailVerified: state.user.isEmailVerified,
  errorMessage: state.user.errorMessage
});

const mapDispatchToProps = (dispatch) => ({
  verifyEmail: (body) => dispatch(verifyEmail(body))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithTranslation);
