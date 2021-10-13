import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { render } from '@testing-library/react';

import reducers from '../redux/reducers';

import { loadState, saveState } from '../utils/localStorageRedux';

export const getStore = (initialState) => {
  const store = initialState
    ? createStore(reducers, initialState, applyMiddleware(thunk))
    : createStore(reducers, loadState(), applyMiddleware(thunk));

  store.subscribe(() => {
    saveState(store.getState());
  });

  return store;
};

const renderWithRouterAndStore = (
  component,
  routeConfigs = {},
  initialState,
) => {
  const route = routeConfigs.route || '/';
  const store = getStore(initialState);
  const history = routeConfigs.history
    || createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(
      <Provider store={ store }>
        <Router history={ history }>{component}</Router>
      </Provider>,
    ),
    history,
    store,
  };
};

export default renderWithRouterAndStore;
