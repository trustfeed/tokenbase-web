import { select, call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';

import * as userTypes from '../user/actions';
import {
  handleFetch,
  getSignUpAPI,
  getEmailVerificationAPI,
  getSignInAPI,
  getPasswordResetAPI,
  getRequestPasswordResetAPI,
  getUserAPI,
  getTwoFactorAuthAPI
} from '../../utils/api';

const getPersistState = (state) => state.persist;

export function* getUserSaga(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const persist = yield select(getPersistState);
    const accessToken: string = persist.accessToken;
    const result = yield call(handleFetch, {
      fetch: axios,
      method: 'GET',
      url: getUserAPI(),
      accessToken,
      data: undefined
    });
    const email: string = result.email;
    const isTwoFactorEnabled: boolean = result.isTwoFactorEnabled;
    yield [put({ type: userTypes.GET_USER_SUCCEEDED, payload: { email, isTwoFactorEnabled } })];
  } catch (error) {
    console.log(error);
    yield put({ type: userTypes.GET_USER_FAILED });
  }
}
export function* watchGetUserSaga() {
  yield takeLatest(userTypes.GET_USER, getUserSaga);
}

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
    yield [put({ type: userTypes.SIGN_IN_SUCCEEDED, payload: { accessToken } })];
  } catch (error) {
    console.log(error);
    yield put({ type: userTypes.SIGN_IN_FAILED });
  }
}
export function* watchSignInSaga() {
  yield takeLatest(userTypes.SIGN_IN, signInSaga);
}

export function* requestPasswordResetSaga(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const { payload } = action;
    const persist = yield select(getPersistState);
    const accessToken: string = persist.accessToken;
    const { email } = payload;
    yield call(handleFetch, {
      fetch: axios,
      method: 'POST',
      url: getRequestPasswordResetAPI(),
      accessToken,
      data: { email }
    });
    yield [put({ type: userTypes.REQUEST_PASSWORD_RESET_SUCCEEDED })];
  } catch (error) {
    console.log(error);
    yield put({ type: userTypes.REQUEST_PASSWORD_RESET_FAILED });
  }
}
export function* watchRequestPasswordResetSaga() {
  yield takeLatest(userTypes.REQUEST_PASSWORD_RESET, requestPasswordResetSaga);
}

export function* resetPasswordSaga(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const { payload } = action;
    const persist = yield select(getPersistState);
    const accessToken: string = persist.accessToken;

    const token: string = accessToken || payload.token;
    const password: string = payload.password;

    yield call(handleFetch, {
      fetch: axios,
      method: 'POST',
      url: getPasswordResetAPI(),
      accessToken: undefined,
      data: { token, password }
    });
    yield [put({ type: userTypes.RESET_PASSWORD_SUCCEEDED })];
  } catch (error) {
    console.log(error);
    yield put({ type: userTypes.RESET_PASSWORD_FAILED });
  }
}
export function* watchResetPasswordSaga() {
  yield takeLatest(userTypes.RESET_PASSWORD, resetPasswordSaga);
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

    yield [put({ type: userTypes.SIGN_UP_SUCCEEDED, payload: { isSignUpSuccessful: true } })];
  } catch (error) {
    console.log(error);
    yield put({ type: userTypes.SIGN_UP_FAILED, payload: { isSignUpSuccessful: false } });
  }
}
export function* watchSignUpSaga() {
  yield takeLatest(userTypes.SIGN_UP, signUpSaga);
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

    yield put({ type: userTypes.VERIFY_EMAIL_SUCCEEDED });
  } catch (error) {
    console.log(error);
    yield put({ type: userTypes.VERIFY_EMAIL_FAILED, payload: { errorMessage: error.message } });
  }
}
export function* watchVerifyEmailSaga() {
  yield takeLatest(userTypes.VERIFY_EMAIL, verifyEmailSaga);
}

export function* createQrCodeSaga(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const persist = yield select(getPersistState);
    const accessToken: string = persist.accessToken;
    const result = yield call(handleFetch, {
      fetch: axios,
      method: 'POST',
      url: `${getTwoFactorAuthAPI()}/create`,
      accessToken,
      data: undefined
    });

    const qrCodeUrl = result.url;

    yield put({ type: userTypes.CREATE_QR_CODE_SUCCEEDED, payload: { qrCodeUrl } });
  } catch (error) {
    console.log(error);
    yield put({ type: userTypes.CREATE_QR_CODE_FAILED });
  }
}
export function* watchCreateQrCodeSaga() {
  yield takeLatest(userTypes.CREATE_QR_CODE, createQrCodeSaga);
}
