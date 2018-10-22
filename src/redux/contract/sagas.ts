import { call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';

import * as consts from '../user/types';

import { getHeaders, getSignUpAPI, getEmailVerificationAPI, getSignInAPI } from '../../api';

const fetchSignIn = async (payload) => {
  try {
    const email: string = payload.email;
    const password: string = payload.password;
    const { data } = await axios({
      method: 'POST',
      url: getSignInAPI(),
      headers: getHeaders(),
      data: JSON.stringify({ email, password })
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

function* workSignIn(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const { payload } = action;
    const password: string = payload.password;
    const email: string = payload.email;
    const result = yield call(fetchSignIn, { email, password });
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

const fetchSignUp = async (payload) => {
  try {
    const email: string = payload.email;
    const password: string = payload.password;
    const { data } = await axios({
      method: 'POST',
      url: getSignUpAPI(),
      headers: getHeaders(),
      data: JSON.stringify({ email, password })
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

function* workSignUp(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const { payload } = action;
    const password: string = payload.password;
    const email: string = payload.email;
    yield call(fetchSignUp, { email, password });
    yield [put({ type: consts.SIGN_UP_SUCCEEDED, payload: { isSignUpSuccessful: true } })];
  } catch (error) {
    console.log(error);
    yield put({ type: consts.SIGN_UP_FAILED, payload: { isSignUpSuccessful: false } });
  }
}
export function* watchSignUp() {
  yield takeLatest(consts.SIGN_UP, workSignUp);
}

const fetchVerifyEmail = async (body) => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: getEmailVerificationAPI(),
      headers: getHeaders(),
      data: body
    });
    return data;
  } catch (error) {
    const { data = {} } = error.response;
    const type: string = data.type;
    const status: number = error.response.status;
    if (status >= 400) {
      if (type) {
        throw new Error(type);
      }
      throw new Error(error);
    }
  }
};
function* workVerifyEmail(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const { payload } = action;
    const token: string = payload.token;
    yield call(fetchVerifyEmail, { token });
    yield put({ type: consts.VERIFY_EMAIL_SUCCEEDED });
  } catch (error) {
    console.log(error);
    yield put({ type: consts.VERIFY_EMAIL_FAILED, payload: { errorMessage: error.message } });
  }
}
export function* watchVerifyEmail() {
  yield takeLatest(consts.VERIFY_EMAIL, workVerifyEmail);
}
