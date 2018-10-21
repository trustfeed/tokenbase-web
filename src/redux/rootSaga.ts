import { all, fork } from 'redux-saga/effects';

import { watchSignUp, watchVerifyEmail, watchSignIn } from './user/sagas';

function* root() {
  yield all([
    /* USER */
    fork(watchSignUp),
    fork(watchSignIn),
    fork(watchVerifyEmail)
  ]);
}

export default root;
