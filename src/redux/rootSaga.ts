import { all, fork } from 'redux-saga/effects';

import { watchSignUp, watchVerifyEmail } from './user/sagas';

function* root() {
  yield all([
    /* USER */
    // Read

    // sign-up
    fork(watchSignUp),
    // email-verification
    fork(watchVerifyEmail)
  ]);
}

export default root;
