import { select, call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';
import * as tokenTypes from './actions';
import * as userConsts from '../user/actions';

import {
  getErrorStatus,
  handleFetch,
  getEthTokensAPI,
  getEthTokenAPI,
  getFinaliseEthTokenAPI
} from '../../utils/api';

const getPersistState = (state) => state.persist;

export function* createEthTokenSaga(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const persist = yield select(getPersistState);
    const accessToken: string = persist.accessToken;

    const { payload } = action;
    const { body } = payload;
    yield call(handleFetch, {
      fetch: axios,
      method: 'POST',
      url: getEthTokensAPI(),
      accessToken,
      data: body
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

export function* updateEthTokenSaga(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const persist = yield select(getPersistState);
    const accessToken: string = persist.accessToken;

    const { payload } = action;
    const id: string = payload.id;
    const body = payload.body;
    yield call(handleFetch, {
      fetch: axios,
      method: 'PATCH',
      url: getEthTokenAPI(id),
      accessToken,
      data: body
    });

    yield put({ type: tokenTypes.UPDATE_ETH_TOKEN_SUCCEEDED });
  } catch (error) {
    const errorStatus = getErrorStatus(error);
    if (errorStatus === 401) {
      yield put({ type: userConsts.REMOVE_ACCESS_TOKEN });
    }
    yield put({ type: tokenTypes.UPDATE_ETH_TOKEN_FAILED });
  }
}
export function* watchUpdateEthTokenSaga() {
  yield takeLatest(tokenTypes.UPDATE_ETH_TOKEN, updateEthTokenSaga);
}

export function* getEthTokensSaga(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const persist = yield select(getPersistState);
    const accessToken: string = persist.accessToken;

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
export function* watchGetEthTokensSaga() {
  yield takeLatest(tokenTypes.GET_ETH_TOKENS, getEthTokensSaga);
}

export function* getEthTokenSaga(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const persist = yield select(getPersistState);
    const accessToken: string = persist.accessToken;

    const { payload } = action;
    const id: string = payload.id;

    const options = {
      fetch: axios,
      method: 'GET',
      url: getEthTokenAPI(id),
      accessToken,
      data: undefined
    };
    const result = yield call(handleFetch, options);
    const ethToken: any[] = result;
    yield put({ type: tokenTypes.GET_ETH_TOKEN_SUCCEEDED, payload: { ethToken } });
  } catch (error) {
    const errorStatus = getErrorStatus(error);
    if (errorStatus === 401) {
      yield put({ type: userConsts.REMOVE_ACCESS_TOKEN });
    }
    yield put({ type: tokenTypes.GET_ETH_TOKEN_FAILED });
  }
}
export function* watchGetEthTokenSaga() {
  yield takeLatest(tokenTypes.GET_ETH_TOKEN, getEthTokenSaga);
}

export function* finaliseEthTokenSaga(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const persist = yield select(getPersistState);
    const accessToken: string = persist.accessToken;

    const { payload } = action;
    const id: string = payload.id;

    const options = {
      fetch: axios,
      method: 'POST',
      url: getFinaliseEthTokenAPI(),
      accessToken,
      data: { id }
    };
    const result = yield call(handleFetch, options);
    const ethToken: any[] = result;
    yield [
      put({ type: tokenTypes.FINALISE_ETH_TOKEN_SUCCEEDED, payload: { ethToken } }),
      put({ type: tokenTypes.GET_ETH_TOKEN, payload: { id } })
    ];
  } catch (error) {
    const errorStatus = getErrorStatus(error);
    if (errorStatus === 401) {
      yield put({ type: userConsts.REMOVE_ACCESS_TOKEN });
    }
    yield put({ type: tokenTypes.FINALISE_ETH_TOKEN_FAILED });
  }
}
export function* watchFinaliseEthTokenSaga() {
  yield takeLatest(tokenTypes.FINALISE_ETH_TOKEN, finaliseEthTokenSaga);
}
