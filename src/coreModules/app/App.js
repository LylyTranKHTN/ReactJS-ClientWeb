import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import './App.scss';
import Router from './router';
import { history } from './store';

function App({ store }) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router />
      </ConnectedRouter>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
