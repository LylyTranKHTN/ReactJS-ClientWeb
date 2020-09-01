import { AuthService } from 'services';
import { 
    requestStartAction,
    requestCompletedAction,
    loginSuccessAction
} from '../../coreModules/app/actions';

export const ACTIONS = {
    'RESET_STATE': '@@LOGIN/RESET_STATE',

    'COMPANY_REQUEST': '@@ABOUT/COMPANY_REQUEST',
    'COMPANY_SUCCESS': '@@ABOUT/COMPANY_SUCCESS',
    'COMPANY_ERROR': '@@ABOUT/COMPANY_ERROR',
};

/**
 * Reset view state action
 * @param {Function}
 */
export const resetStateAction = () => {
    return dispatch => dispatch(requestStartAction(ACTIONS.RESET_STATE, {}, false));
};


export const getCompany = () => (
    async(dispatch) => {
        try {
            dispatch(requestStartAction(ACTIONS.LOGIN_REQUEST));
            // const user = await AuthService.loginWithUserAndPass();
            // dispatch(requestCompletedAction(ACTIONS.COMPANY_SUCCESS, user));
            // dispatch(loginSuccessAction(user));
        } catch (error) {
            dispatch(requestCompletedAction(ACTIONS.LOGIN_ERROR, error));
        }
    }
);
