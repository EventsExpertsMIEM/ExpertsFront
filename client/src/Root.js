import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

// eslint-disable-next-line react/prop-types
export default ({ children, initialState = {}, enhancer }) => {
  const store = createStore(reducers, initialState, enhancer);
  return <Provider store={store}>{children}</Provider>;
};
