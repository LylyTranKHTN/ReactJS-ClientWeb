import React from 'react';
import ReactDOM from 'react-dom';
import App from './coreModules/app/App';
import * as serviceWorker from './serviceWorker';
import store from './coreModules/app/store';
import './i18n';
import '../node_modules/@mdi/font/css/materialdesignicons.min.css';

ReactDOM.render(
  <App store={ store } />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();