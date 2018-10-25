import { call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';

import * as consts from './types';

import { getHeaders, getCreateEthTokenAPI } from '../../api';

const fetchSignIn = async (payload) => {
  try {
    const email: string = payload.email;
    const password: string = payload.password;
    const { data } = await axios({
      method: 'POST',
      url: getCreateEthTokenAPI(),
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
    yield [put({ type: consts.CREATE_ETH_TOKEN_SUCCEEDED, payload: { accessToken } })];
  } catch (error) {
    console.log(error);
    yield put({ type: consts.CREATE_ETH_TOKEN_FAILED });
  }
}
export function* watchSignIn() {
  yield takeLatest(consts.CREATE_ETH_TOKEN, workSignIn);
}
