import { 
    requestStartAction,
    requestCompletedAction,
} from '../../coreModules/app/actions';

export const ACTIONS = {
    'action1_REQUEST': '@@DEMO/DEMO_REQUEST',
    'action1_SUCCESS': '@@DEMO/DEMO_SUCCESS',
    'action1_ERROR': '@@DEMO/DEMO_ERROR',

    'action2_REQUEST': '@@DEMO/Code_REQUEST',
    'action2_SUCCESS': '@@DEMO/Code_SUCCESS',
    'action2_ERROR': '@@DEMO/Code_ERROR',

    'actionReponse': ['action1', 'action2'],
};

export const getName = () => (
    async(dispatch) => {
        try {
            dispatch(requestStartAction(ACTIONS.action1_REQUEST));
            // const action1 = await AuthService.loginWithUserAndPass();
            const result = { data: "ket qua action1" };
            dispatch(requestCompletedAction(ACTIONS.action1_SUCCESS, result));
        } catch (error) {
            dispatch(requestCompletedAction(ACTIONS.action1_ERROR, error));
        }
    }
);

export const getName2 = () => (
    async(dispatch) => {
        try {
            dispatch(requestStartAction(ACTIONS.action2_REQUEST));
            // const action2 = await AuthService.loginWithUserAndPass();
            const result = { data: "ket qua action2" };
            dispatch(requestCompletedAction(ACTIONS.action2_SUCCESS, result));
        } catch (error) {
            dispatch(requestCompletedAction(ACTIONS.action2_ERROR, error));
        }
    }
);
