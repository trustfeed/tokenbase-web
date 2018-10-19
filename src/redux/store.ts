import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];

  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
  }

  return {
    ...createStore(rootReducer, applyMiddleware(...middlewares)),
    runSaga: sagaMiddleware.run
  };
}

const store = configureStore();
store.runSaga(rootSaga);

export default store;
