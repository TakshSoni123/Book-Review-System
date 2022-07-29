import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import configureStore from './store/store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

let preloadedState = {};
const store = configureStore(preloadedState);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <h1>hello</h1>
    <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
// FOR TESTING, remove before production
window.getState = store.getState;