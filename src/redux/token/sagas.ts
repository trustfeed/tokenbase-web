import { select, call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';

import * as consts from './types';

import { getHeaders, getCreateEthTokenAPI } from '../../api';
const getUser = (state) => state.user;

const fetchCreateEthToken = async (accessToken, payload) => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: getCreateEthTokenAPI(),
      headers: getHeaders(accessToken),
      data: JSON.stringify(payload)
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

function* workCreateEthToken(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const { payload } = action;
    const user = yield select(getUser);
    const accessToken: string = user.accessToken;
    yield call(fetchCreateEthToken, accessToken, payload);
    yield put({ type: consts.CREATE_ETH_TOKEN_SUCCEEDED });
  } catch (error) {
    console.log(error);
    yield put({ type: consts.CREATE_ETH_TOKEN_FAILED });
  }
}
export function* watchCreateEthToken() {
  yield takeLatest(consts.CREATE_ETH_TOKEN, workCreateEthToken);
}
