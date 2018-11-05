import { all, fork } from 'redux-saga/effects';

import * as userSagas from './user/sagas';
import * as tokenSagas from './token/sagas';
import * as crowdsaleSagas from './crowdsale/sagas';

function* root() {
  yield all([
    // Token
    fork(tokenSagas.watchGetEthTokensSaga),
    fork(tokenSagas.watchGetEthTokenSaga),
    fork(tokenSagas.watchCreateEthTokenSaga),
    fork(tokenSagas.watchUpdateEthTokenSaga),
    fork(tokenSagas.watchFinaliseEthTokenSaga),

    // Crowdsale
    fork(crowdsaleSagas.watchGetEthCrowdsaleSaga),
    fork(crowdsaleSagas.watchGetEthCrowdsaleSaga),
    fork(crowdsaleSagas.watchCreateEthCrowdsaleSaga),
    fork(crowdsaleSagas.watchUpdateEthCrowdsaleSaga),
    fork(crowdsaleSagas.watchFinaliseEthCrowdsaleSaga),

    /* USER */
    fork(userSagas.watchSignUpSaga),
    fork(userSagas.watchSignInSaga),
    fork(userSagas.watchVerifyEmailSaga),
    fork(userSagas.watchResetPasswordSaga),
    fork(userSagas.watchRequestPasswordResetSaga)
  ]);
}

export default root;
