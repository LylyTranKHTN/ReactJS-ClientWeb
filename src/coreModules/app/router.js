import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  withRouter,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appComponents from 'views';
import { WrapperView, FullView } from '..';
import { Spinner } from 'components';
import CONSTANTS from 'constants';
import * as appActions from './actions';
import { LocalDataService } from 'services'
import {Crypto} from 'utils'

const {
  Login,
  Logout,
  Home,
  AccessDenied,
  About,
  Demo,
  ForgotPassword,
  SignUp,
  ProductsList,
} = CONSTANTS.Paths;

const Router = ({ isProcessing, userDetail, actions, location }) => {
  useEffect(() => {
    actions.getAppDataAction();
    if(!LocalDataService.clientID) LocalDataService.clientID = Crypto.RandomString(32);
  }, []);

  const authenticated = userDetail && userDetail.id;

  if (isProcessing) {
    return <Spinner />
  }
  return (
    <div>
      <Switch>
        <WrapperView path={Home}
          exact
          authenticated={authenticated}
          component={appComponents.Dashboard}
          key={location.key}
        />
        <WrapperView path={Demo}
          exact
          authenticated={authenticated}
          component={appComponents.Demo}
          key={location.key}
        />
        <WrapperView path={About}
          exact
          authenticated={authenticated}
          component={appComponents.About}
          key={location.key}
        />
        <WrapperView path={ProductsList}
          exact
          authenticated={authenticated}
          component={appComponents.ProductsList}
          key={location.key}
        />
        <FullView path={Login}
          authenticated={true}
          component={appComponents.Login}
          key={location.key}
        />
        <FullView path={Logout}
          authenticated={true}
          component={appComponents.Login}
          key={location.key}
        />
        <FullView path={ForgotPassword}
          authenticated={true}
          component={appComponents.ForgotPassword}
          key={location.key}
        />
        <FullView path={SignUp}
          authenticated={true}
          component={appComponents.SignUp}
          key={location.key}
        />
         <FullView path={AccessDenied}
          authenticated={true}
          component={appComponents.AccessDenied}
          key={location.key}
        />
      </Switch>
    </div>);
};

const mapStateToProps = state => ({
  isProcessing: state.App.get('isProcessing'),
  userDetail: state.App.get('user'),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(appActions, dispatch)
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    forwardRef: true
  }
)(Router));

Router.propTypes = {
  actions: PropTypes.shape({
    getAppDataAction: PropTypes.func,
  }),
  userDetail: PropTypes.shape({
    sessionKey: PropTypes.string,
  }),
  isProcessing: PropTypes.bool,
  location: PropTypes.shape({
    key: PropTypes.string,
  })
};

Router.defaultProps = {
  userDetail: null,
  isProcessing: true,
};
