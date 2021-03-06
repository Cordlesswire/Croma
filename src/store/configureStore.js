/* @flow */

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const enhancers = [];

if (process.env.NODE_ENV === 'production') {
  enhancers.push(
    applyMiddleware(sagaMiddleware),
  );
} else {
  enhancers.push(
    applyMiddleware(sagaMiddleware, logger),
  );
}

const enhancer = composeEnhancers(
  ...enhancers
);

export default function configureStore(initialState: ?any) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  sagaMiddleware.run(rootSaga);

  return store;
}
