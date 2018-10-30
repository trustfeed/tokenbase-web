import { select, call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';
import * as tokenTypes from './actions';
import * as userConsts from '../user/types';
import { getErrorStatus, handleFetch, getEthTokensAPI } from '../../api';

const getUser = (state) => state.user;

export function* createEthTokenSaga(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const user = yield select(getUser);
    const accessToken: string = user.accessToken;

    const { payload } = action;
    yield call(handleFetch, {
      fetch: axios,
      method: 'POST',
      url: getEthTokensAPI(),
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

export function* getEthTokensSaga(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const user = yield select(getUser);
    const accessToken: string = user.accessToken;

    const options = {
      fetch: axios,
      method: 'GET',
      url: getEthTokensAPI(),
      accessToken,
      data: undefined
    };
    const result = yield call(handleFetch, options);
    const ethTokens: any[] = result.tokens;
    yield put({ type: tokenTypes.GET_ETH_TOKENS_SUCCEEDED, payload: { ethTokens } });
  } catch (error) {
    const errorStatus = getErrorStatus(error);
    if (errorStatus === 401) {
      yield put({ type: userConsts.REMOVE_ACCESS_TOKEN });
    }
    yield put({ type: tokenTypes.GET_ETH_TOKENS_FAILED });
  }
}
export function* watchgetEthTokensSaga() {
  yield takeLatest(tokenTypes.GET_ETH_TOKENS, getEthTokensSaga);
}
