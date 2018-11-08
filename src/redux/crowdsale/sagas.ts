import { select, call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';
import * as crowdsaleTypes from './actions';
import * as userConsts from '../user/actions';

import {
  getErrorStatus,
  handleFetch,
  getEthCrowdsalesAPI,
  getEthCrowdsaleAPI,
  getFinaliseEthCrowdsaleAPI
} from '../../utils/api';

const getUser = (state) => state.user;

export function* createEthCrowdsaleSaga(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const user = yield select(getUser);
    const accessToken: string = user.accessToken;

    const { payload } = action;
    const { body } = payload;
    yield call(handleFetch, {
      fetch: axios,
      method: 'POST',
      url: getEthCrowdsalesAPI(),
      accessToken,
      data: body
    });

    yield put({ type: crowdsaleTypes.CREATE_ETH_CROWDSALE_SUCCEEDED });
  } catch (error) {
    const errorStatus = getErrorStatus(error);
    if (errorStatus === 401) {
      yield put({ type: userConsts.REMOVE_ACCESS_TOKEN });
    }
    yield put({ type: crowdsaleTypes.CREATE_ETH_CROWDSALE_FAILED });
  }
}
export function* watchCreateEthCrowdsaleSaga() {
  yield takeLatest(crowdsaleTypes.CREATE_ETH_CROWDSALE, createEthCrowdsaleSaga);
}

export function* updateEthCrowdsaleSaga(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const user = yield select(getUser);
    const accessToken: string = user.accessToken;

    const { payload } = action;
    const id: string = payload.id;
    const body = payload.body;
    yield call(handleFetch, {
      fetch: axios,
      method: 'PATCH',
      url: getEthCrowdsaleAPI(id),
      accessToken,
      data: body
    });

    yield put({ type: crowdsaleTypes.UPDATE_ETH_CROWDSALE_SUCCEEDED });
  } catch (error) {
    const errorStatus = getErrorStatus(error);
    if (errorStatus === 401) {
      yield put({ type: userConsts.REMOVE_ACCESS_TOKEN });
    }
    yield put({ type: crowdsaleTypes.UPDATE_ETH_CROWDSALE_FAILED });
  }
}
export function* watchUpdateEthCrowdsaleSaga() {
  yield takeLatest(crowdsaleTypes.UPDATE_ETH_CROWDSALE, updateEthCrowdsaleSaga);
}

export function* getEthCrowdsalesSaga(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const user = yield select(getUser);
    const accessToken: string = user.accessToken;

    const options = {
      fetch: axios,
      method: 'GET',
      url: getEthCrowdsalesAPI(),
      accessToken,
      data: undefined
    };
    const result = yield call(handleFetch, options);
    const ethCrowdsales: any[] = result.crowdsales;
    yield put({ type: crowdsaleTypes.GET_ETH_CROWDSALES_SUCCEEDED, payload: { ethCrowdsales } });
  } catch (error) {
    const errorStatus = getErrorStatus(error);
    if (errorStatus === 401) {
      yield put({ type: userConsts.REMOVE_ACCESS_TOKEN });
    }
    yield put({ type: crowdsaleTypes.GET_ETH_CROWDSALES_FAILED });
  }
}
export function* watchGetEthCrowdsalesSaga() {
  yield takeLatest(crowdsaleTypes.GET_ETH_CROWDSALES, getEthCrowdsalesSaga);
}

export function* getEthCrowdsaleSaga(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const user = yield select(getUser);
    const accessToken: string = user.accessToken;

    const { payload } = action;
    const id: string = payload.id;

    const options = {
      fetch: axios,
      method: 'GET',
      url: getEthCrowdsaleAPI(id),
      accessToken,
      data: undefined
    };
    const result = yield call(handleFetch, options);
    const ethCrowdsale: any[] = result;
    yield put({ type: crowdsaleTypes.GET_ETH_CROWDSALE_SUCCEEDED, payload: { ethCrowdsale } });
  } catch (error) {
    const errorStatus = getErrorStatus(error);
    if (errorStatus === 401) {
      yield put({ type: userConsts.REMOVE_ACCESS_TOKEN });
    }
    yield put({ type: crowdsaleTypes.GET_ETH_CROWDSALE_FAILED });
  }
}
export function* watchGetEthCrowdsaleSaga() {
  yield takeLatest(crowdsaleTypes.GET_ETH_CROWDSALE, getEthCrowdsaleSaga);
}

export function* finaliseEthCrowdsaleSaga(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const user = yield select(getUser);
    const accessToken: string = user.accessToken;

    const { payload } = action;
    const id: string = payload.id;

    const options = {
      fetch: axios,
      method: 'POST',
      url: getFinaliseEthCrowdsaleAPI(),
      accessToken,
      data: { id }
    };
    const result = yield call(handleFetch, options);
    const ethCrowdsale: any[] = result;
    yield [
      put({ type: crowdsaleTypes.FINALISE_ETH_CROWDSALE_SUCCEEDED, payload: { ethCrowdsale } }),
      put({ type: crowdsaleTypes.GET_ETH_CROWDSALE, payload: { id } })
    ];
  } catch (error) {
    const errorStatus = getErrorStatus(error);
    if (errorStatus === 401) {
      yield put({ type: userConsts.REMOVE_ACCESS_TOKEN });
    }
    yield put({ type: crowdsaleTypes.FINALISE_ETH_CROWDSALE_FAILED });
  }
}
export function* watchFinaliseEthCrowdsaleSaga() {
  yield takeLatest(crowdsaleTypes.FINALISE_ETH_CROWDSALE, finaliseEthCrowdsaleSaga);
}
