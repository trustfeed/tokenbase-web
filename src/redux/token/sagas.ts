import { select, call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';
import * as tokenTypes from './actions';
import * as userConsts from '../user/types';
import { getErrorStatus, handleFetch, getCreateEthTokenAPI } from '../../api';

const getUser = (state) => state.user;

export function* createEthTokenSaga(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const { payload } = action;
    const user = yield select(getUser);
    const accessToken: string = user.accessToken;

    yield call(handleFetch, {
      fetch: axios,
      method: 'POST',
      url: getCreateEthTokenAPI(),
      accessToken,
      data: payload
    });

    yield put({ type: tokenTypes.CREATE_ETH_TOKEN_SUCCEEDED });
  } catch (error) {
    const errorStatus = getErrorStatus(error);
    if (errorStatus === 401) {
      yield put({ type: userConsts.REMOVE_ACCESS_TOKEN });
    }
    yield put({ type: tokenTypes.CREATE_ETH_TOKEN_FAILED });
  }
}
export function* watchCreateEthTokenSaga() {
  yield takeLatest(tokenTypes.CREATE_ETH_TOKEN, createEthTokenSaga);
}
