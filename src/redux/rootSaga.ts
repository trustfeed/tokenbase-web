import { all, fork } from 'redux-saga/effects';

import { watchSignUpSaga, watchVerifyEmailSaga, watchSignInSaga } from './user/sagas';
import {
  watchCreateEthTokenSaga,
  watchGetEthTokensSaga,
  watchGetEthTokenSaga,
  watchUpdateEthTokenSaga,
  watchFinaliseEthTokenSaga
} from './token/sagas';
import { watchCreateCrowdsaleSaga } from './crowdsale/sagas';

function* root() {
  yield all([
    // Token
    fork(watchGetEthTokensSaga),
    fork(watchGetEthTokenSaga),
    fork(watchCreateEthTokenSaga),
    fork(watchUpdateEthTokenSaga),
    fork(watchFinaliseEthTokenSaga),

    // Crowdsale
    fork(watchCreateCrowdsaleSaga),

    /* USER */
    fork(watchSignUpSaga),
    fork(watchSignInSaga),
    fork(watchVerifyEmailSaga)
  ]);
}

export default root;
