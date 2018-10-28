import { call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';

import * as consts from '../user/types';
import { handleFetch, getSignUpAPI, getEmailVerificationAPI, getSignInAPI } from '../../api';

function* workSignIn(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const { payload } = action;
    const password: string = payload.password;
    const email: string = payload.email;
    const result = yield call(handleFetch, {
      fetch: axios,
      method: 'POST',
      url: getSignInAPI(),
      accessToken: undefined,
      data: { email, password }
    });

    const accessToken: string = result.token;
    yield [put({ type: consts.SIGN_IN_SUCCEEDED, payload: { accessToken } })];
  } catch (error) {
    console.log(error);
    yield put({ type: consts.SIGN_IN_FAILED });
  }
}
export function* watchSignIn() {
  yield takeLatest(consts.SIGN_IN, workSignIn);
}

function* workSignUp(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const { payload } = action;
    const password: string = payload.password;
    const email: string = payload.email;

    yield call(handleFetch, {
      fetch: axios,
      method: 'POST',
      url: getSignUpAPI(),
      accessToken: undefined,
      data: { email, password }
    });

    yield [put({ type: consts.SIGN_UP_SUCCEEDED, payload: { isSignUpSuccessful: true } })];
  } catch (error) {
    console.log(error);
    yield put({ type: consts.SIGN_UP_FAILED, payload: { isSignUpSuccessful: false } });
  }
}
export function* watchSignUp() {
  yield takeLatest(consts.SIGN_UP, workSignUp);
}
function* workVerifyEmail(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const { payload } = action;
    const token: string = payload.token;

    yield call(handleFetch, {
      fetch: axios,
      method: 'POST',
      url: getEmailVerificationAPI(),
      accessToken: undefined,
      data: { token }
    });

    yield put({ type: consts.VERIFY_EMAIL_SUCCEEDED });
  } catch (error) {
    console.log(error);
    yield put({ type: consts.VERIFY_EMAIL_FAILED, payload: { errorMessage: error.message } });
  }
}
export function* watchVerifyEmail() {
  yield takeLatest(consts.VERIFY_EMAIL, workVerifyEmail);
}
