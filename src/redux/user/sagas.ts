import { select, call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';

import * as consts from '../user/actions';
import {
  handleFetch,
  getSignUpAPI,
  getEmailVerificationAPI,
  getSignInAPI,
  getPasswordResetAPI,
  getRequestPasswordResetAPI
} from '../../api';

const getUser = (state) => state.user;

export function* signInSaga(action) {
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
export function* watchSignInSaga() {
  yield takeLatest(consts.SIGN_IN, signInSaga);
}

export function* requestPasswordResetSaga(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const { payload } = action;
    const user = yield select(getUser);
    const accessToken: string = user.accessToken;
    const { email } = payload;
    yield call(handleFetch, {
      fetch: axios,
      method: 'POST',
      url: getRequestPasswordResetAPI(),
      accessToken,
      data: { email }
    });
    yield [put({ type: consts.REQUEST_PASSWORD_RESET_SUCCEEDED })];
  } catch (error) {
    console.log(error);
    yield put({ type: consts.REQUEST_PASSWORD_RESET_FAILED });
  }
}
export function* watchRequestPasswordResetSaga() {
  yield takeLatest(consts.REQUEST_PASSWORD_RESET, requestPasswordResetSaga);
}

export function* resetPasswordSaga(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const { payload } = action;
    const user = yield select(getUser);
    const accessToken: string = user.accessToken;

    const token: string = accessToken || payload.token;
    const password: string = payload.password;

    yield call(handleFetch, {
      fetch: axios,
      method: 'POST',
      url: getPasswordResetAPI(),
      accessToken: undefined,
      data: { token, password }
    });
    yield [put({ type: consts.RESET_PASSWORD_SUCCEEDED })];
  } catch (error) {
    console.log(error);
    yield put({ type: consts.RESET_PASSWORD_FAILED });
  }
}
export function* watchResetPasswordSaga() {
  yield takeLatest(consts.RESET_PASSWORD, resetPasswordSaga);
}

export function* signUpSaga(action) {
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
export function* watchSignUpSaga() {
  yield takeLatest(consts.SIGN_UP, signUpSaga);
}

export function* verifyEmailSaga(action) {
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
export function* watchVerifyEmailSaga() {
  yield takeLatest(consts.VERIFY_EMAIL, verifyEmailSaga);
}
