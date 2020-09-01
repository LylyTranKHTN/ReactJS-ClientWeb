import { 
    requestStartAction,
    requestCompletedAction,
} from '../../coreModules/app/actions';
import { ExecuteCommand } from 'services';

export const ACTIONS = {
    'menu_REQUEST': '@@DEMO/DEMO_REQUEST',
    'menu_SUCCESS': '@@DEMO/DEMO_SUCCESS',
    'menu_ERROR': '@@DEMO/DEMO_ERROR',

    'actionReponse': ['menu'],
};

export const getMenu = () => (
    async(dispatch) => {
        try {
            dispatch(requestStartAction(ACTIONS.menu_REQUEST));
            const response = await ExecuteCommand.Invoke('System', 'MainMenu', 0, null);
            let result;
            if (response.success) {
                result = response.message.Object;
            }
            dispatch(requestCompletedAction(ACTIONS.menu_SUCCESS, result));
        } catch (error) {
            dispatch(requestCompletedAction(ACTIONS.menu_ERROR, error));
        }
    }
);
