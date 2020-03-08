import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import App from './components/App';
import Root from './Root';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(applyMiddleware(thunk));
// store.subscribe(() => console.log("STORE: ", store.getState()));

ReactDOM.render(
  <Root enhancer={enhancers}>
    <App />
  </Root>,
  document.getElementById('root'),
);
