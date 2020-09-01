import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  Route,
} from 'react-router-dom';
import { Header, Navbar, BreadCumbs } from 'components';
import './styles.scss';

const WrapperView = (props) => {
    if (!props.authenticated) {
      props.history.push('/accessDenied');
    }
    return (
      <Route exact={props.exact} path={props.path}>
        <div className="wrapper">
          <Route component={Header} />
          <main className="subwrapper">
            {/* {props.navBar ? <Route component={Navbar} /> : null} */}
            <div className="main-container">
              <BreadCumbs link={props.path} />
              <div className="main-page">
                <Route component={props.component} />
              </div>
            </div>
          </main>
        </div>
      </Route>
    );
}

export default withRouter(WrapperView);

WrapperView.propTypes = {
  navBar: PropTypes.bool,
  exact: PropTypes.bool,
  authenticated: PropTypes.bool,
  component: PropTypes.func.isRequired,
  path: PropTypes.string,
  userDetail: PropTypes.shape({
    permissions: PropTypes.shape({}),
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

WrapperView.defaultProps = {
  navBar: true,
  exact: false,
  authenticated: false,
  path: undefined,
  userDetail: undefined,
};
