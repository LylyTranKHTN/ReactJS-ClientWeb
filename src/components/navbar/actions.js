import {
    routeTo,
    requestStartAction,
    requestCompletedAction,
} from '../../coreModules/app/actions';
import { ExecuteCommand, LocalDataService } from 'services';
import { Utility } from 'utils';
import Constants from 'constants';

export const ACTIONS = {
    'menu_REQUEST': '@@NAVBAR/NAVBAR_REQUEST',
    'menu_SUCCESS': '@@NAVBAR/NAVBAR_SUCCESS',
    'menu_ERROR': '@@NAVBAR/NAVBAR_ERROR',

    'actionReponse': ['menu'],
};

export const getMenu = () => (
    async (dispatch) => {
        try {
            dispatch(requestStartAction(ACTIONS.menu_REQUEST));
            const response = await ExecuteCommand.Invoke('System', 'MainMenu', 0, null);
            if (response.success == 1) {
                dispatch(requestCompletedAction(ACTIONS.menu_SUCCESS, response.message.Object));
            }
            else {
                Utility.InvokeError(response, () => {
                    LocalDataService.clearUser();
                    dispatch(routeTo(Constants.Paths.Login));
                });
            }
        } catch (error) {
            dispatch(requestCompletedAction(ACTIONS.menu_ERROR, error));
        }
    }
);
