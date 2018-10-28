import { call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';
import * as consts from './types';

import { handleFetch, getCreateEthCrowdsalesAPI } from '../../api';

function* workCreateToken(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const { payload } = action;
    const password: string = payload.password;
    const email: string = payload.email;
    const result = yield call(handleFetch, {
      fetch: axios,
      method: 'POST',
      url: getCreateEthCrowdsalesAPI(),
      accessToken: undefined,
      data: { email, password }
    });
    const accessToken: string = result.token;
    yield [put({ type: consts.CREATE_ETH_CROWDSALE_SUCCEEDED, payload: { accessToken } })];
  } catch (error) {
    console.log(error);
    yield put({ type: consts.CREATE_ETH_CROWDSALE_FAILED });
  }
}
export function* watchCreateToken() {
  yield takeLatest(consts.CREATE_ETH_CROWDSALE, workCreateToken);
}
