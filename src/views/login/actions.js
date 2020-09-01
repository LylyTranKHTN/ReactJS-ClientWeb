import { AuthService } from 'services';
import Constants from 'constants';
import { 
    routeTo,
    requestStartAction,
    requestCompletedAction,
    loginSuccessAction
} from '../../coreModules/app/actions';

export const ACTIONS = {
    'RESET_STATE': '@@LOGIN/RESET_STATE',

    'LOGIN_REQUEST': '@@LOGIN/LOGIN_REQUEST',
    'LOGIN_SUCCESS': '@@LOGIN/LOGIN_SUCCESS',
    'LOGIN_ERROR': '@@LOGIN/LOGIN_ERROR',
};

/**
 * Reset view state action
 * @param {Function}
 */
export const resetStateAction = () => {
    return dispatch => dispatch(requestStartAction(ACTIONS.RESET_STATE, {}, false));
};

export const checkUserAuthenticationAction = () => {
    return async dispatch => {
        const user = await AuthService.getUserInfo();

        if (user) {
            dispatch(routeTo(Constants.Paths.About));
        }
    };
};

export const loginAction = (username, password) => (
    async(dispatch) => {
        try {
            dispatch(requestStartAction(ACTIONS.LOGIN_REQUEST));
            const user = await AuthService.loginWithUserAndPass(username, password);
            dispatch(requestCompletedAction(ACTIONS.LOGIN_SUCCESS, user));
            dispatch(loginSuccessAction(user));
        } catch (error) {
            dispatch(requestCompletedAction(ACTIONS.LOGIN_ERROR, error));
        }
    }
);
