import React from 'react';
import Layout from '../../components/layout';

import { connect } from 'react-redux';

import { translate } from 'react-i18next';
import UserInfoCard from '../../components/user-info-card';
import { Container, Card, Button } from 'reactstrap';
import { getUser, createQRCode } from '../../redux/user/actions';
import * as H from 'history';
import QRCode from 'qrcode.react';

interface IProps {
  email: string;
  isTwoFactorEnabled: boolean;
  history: H.History;
  location: H.Location;
  t: (key: string) => string;
  getUser: () => void;
  createQRCode: () => void;
  qrCodeUrl?: string;
}

export class UserContainer extends React.Component<IProps, {}> {
  public componentDidMount() {
    this.props.getUser();
  }
  public render(): React.ReactNode {
    const { location, history, email, isTwoFactorEnabled, t, qrCodeUrl } = this.props;
    return (
      <Layout location={location} history={history} showSidebar={true}>
        <Card className="py-3">
          <Container>
            <UserInfoCard email={email} isTwoFactorEnabled={isTwoFactorEnabled} t={t} />
            <br />
            <div className="text-center">
              {isTwoFactorEnabled || qrCodeUrl !== undefined ? null : (
                <Button color={'primary'} onClick={this.props.createQRCode}>
                  {isTwoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                </Button>
              )}
              <br />
              <br />
              {qrCodeUrl ? (
                <div>
                  <QRCode value="qrCodeUrl" />
                  <br />
                  <br />
                  <Button color={'primary'}>{t('form.submit')}</Button>
                </div>
              ) : null}
            </div>
          </Container>
        </Card>
      </Layout>
    );
  }
}
const withTranslation = translate('translations')(UserContainer);

const mapStateToProps = (state) => ({
  isGettingUser: state.user.isGettingUser,
  isCreatingQRCode: state.user.isCreatingQRCode,
  qrCodeUrl: state.user.qrCodeUrl,
  email: state.user.email,
  isTwoFactorEnabled: state.user.isTwoFactorEnabled
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
  createQRCode: () => dispatch(createQRCode())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation);
