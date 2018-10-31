import { all, fork } from 'redux-saga/effects';

import { watchSignUpSaga, watchVerifyEmailSaga, watchSignInSaga } from './user/sagas';
import {
  watchCreateEthTokenSaga,
  watchgetEthTokensSaga,
  watchgetEthTokenSaga,
  watchUpdateEthTokenSaga
} from './token/sagas';
import { watchCreateCrowdsaleSaga } from './crowdsale/sagas';

function* root() {
  yield all([
    // Token
    fork(watchgetEthTokensSaga),
    fork(watchgetEthTokenSaga),
    fork(watchCreateEthTokenSaga),
    fork(watchUpdateEthTokenSaga),

    // Crowdsale
    fork(watchCreateCrowdsaleSaga),

    /* USER */
    fork(watchSignUpSaga),
    fork(watchSignInSaga),
    fork(watchVerifyEmailSaga)
  ]);
}

export default root;
