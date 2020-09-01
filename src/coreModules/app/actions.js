import { push, goBack } from 'connected-react-router';
import { AuthService } from 'services';
import Constants from 'constants';

export const ACTIONS = {
    LOADING: '@@APP/LOADING',
    LOADED: '@@APP/LOADED',

    GET_AUTHENTICATION_START: '@@APP/GET_AUTHENTICATION_START',
    GET_AUTHENTICATION_SUCCESS: '@@APP/GET_AUTHENTICATION_SUCCESS',
    GET_AUTHENTICATION_ERROR: '@@APP/GET_AUTHENTICATION_ERROR',
};

export const getAppDataAction = async() => (
    async (dispatch) => {
        try {
            dispatch(requestStartAction(ACTIONS.GET_AUTHENTICATION_START, {}));
            const user = await AuthService.getUserInfo();
            dispatch(requestCompletedAction(ACTIONS.GET_AUTHENTICATION_SUCCESS, { user }));
        } catch (error) {
            dispatch(requestCompletedAction(ACTIONS.GET_AUTHENTICATION_ERROR, { error }));
            dispatch(routeTo(Constants.Paths.Login));
        }
    }
);

export const loginSuccessAction = async(user) => (
    async (dispatch) => {
        dispatch(requestCompletedAction(ACTIONS.GET_AUTHENTICATION_SUCCESS, { user }));
        if (user){
            dispatch(routeTo(Constants.Paths.Home));
        } else {
            dispatch(routeTo(Constants.Paths.AccessDenied));
        }
    }
);

export const requestStartAction = (type, payload, async = true) => dispatch => {
    if (async) { dispatch({ type: ACTIONS.LOADING, payload: {} }); }
    dispatch({ type, payload });
};
export const requestCompletedAction = (type, payload, async = true) => dispatch => {
    dispatch({ type, payload });
    if (async) { dispatch({ type: ACTIONS.LOADED, payload: {} });}
};

export const routeTo = (path) => {
    return dispatch => dispatch(push(path));
};
export const routeToBack = () => {
    return dispatch => dispatch(goBack());
};
