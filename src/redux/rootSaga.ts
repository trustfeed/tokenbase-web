import { all, fork } from 'redux-saga/effects';

import { watchSignUp, watchVerifyEmail, watchSignIn } from './user/sagas';
import { watchCreateEthToken } from './token/sagas';

function* root() {
  yield all([
    fork(watchCreateEthToken),
    /* USER */
    fork(watchSignUp),
    fork(watchSignIn),
    fork(watchVerifyEmail)
  ]);
}

export default root;
