import { all, fork } from 'redux-saga/effects';

import { watchSignUpSaga, watchVerifyEmailSaga, watchSignInSaga } from './user/sagas';
import {
  watchCreateEthTokenSaga,
  watchgetEthTokensSaga,
  watchgetEthTokenSaga
} from './token/sagas';
import { watchCreateCrowdsaleSaga } from './crowdsale/sagas';

function* root() {
  yield all([
    fork(watchgetEthTokensSaga),
    fork(watchgetEthTokenSaga),
    fork(watchCreateEthTokenSaga),
    fork(watchCreateCrowdsaleSaga),
    /* USER */
    fork(watchSignUpSaga),
    fork(watchSignInSaga),
    fork(watchVerifyEmailSaga)
  ]);
}

export default root;
