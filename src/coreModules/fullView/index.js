import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  Route,
} from 'react-router-dom';
import './styles.scss';

/**
 * FullView
 * @param {Object} props
 */
const FullView = (props) => {
  if (!props.authenticated) {
    props.history.push('/accessDenied');
  }

  return (
    <div className="full-view-container">
      <Route key={props.key} exact={props.exact} path={props.path} component={props.component} />
    </div>
  );
};

FullView.propTypes = {
  exact: PropTypes.bool,
  authenticated: PropTypes.bool,
  component: PropTypes.func.isRequired,
  path: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  key: PropTypes.string,
};

FullView.defaultProps = {
  exact: false,
  authenticated: false,
  path: undefined,
  key: 'key',
};

export default withRouter(FullView);
