import { call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';
import * as crowdsaleTypes from './actions';
import * as userConsts from '../user/types';

import { handleFetch, getCreateEthCrowdsalesAPI, getErrorStatus } from '../../api';

export function* createCrowdsaleSaga(action) {
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
    yield [put({ type: crowdsaleTypes.CREATE_ETH_CROWDSALE_SUCCEEDED, payload: { accessToken } })];
  } catch (error) {
    const errorStatus = getErrorStatus(error);
    if (errorStatus === 401) {
      yield put({ type: userConsts.REMOVE_ACCESS_TOKEN });
    }
    yield put({ type: crowdsaleTypes.CREATE_ETH_CROWDSALE_FAILED });
  }
}
export function* watchCreateCrowdsaleSaga() {
  yield takeLatest(crowdsaleTypes.CREATE_ETH_CROWDSALE, createCrowdsaleSaga);
}
