import { 
    requestStartAction,
    requestCompletedAction,
} from '../../coreModules/app/actions';
import { ApiClient } from 'utils';

export const ACTIONS = {
    'RESET_STATE': '@@PRODUCTSLIST/RESET_STATE',

    'GET_SCHEMA_REQUEST': '@@PRODUCTSLIST/GET_SCHEMA_REQUEST',
    'GET_SCHEMA_SUCCESS': '@@PRODUCTSLIST/GET_SCHEMA_SUCCESS',
    'GET_SCHEMA_ERROR': '@@PRODUCTSLIST/GET_SCHEMA_ERROR',

    'GET_JAVASCRIPT_REQUEST': '@@PRODUCTSLIST/GET_JAVASCRIPT_REQUEST',
    'GET_JAVASCRIPT_SUCCESS': '@@PRODUCTSLIST/GET_JAVASCRIPT_SUCCESS',
    'GET_JAVASCRIPT_ERROR': '@@PRODUCTSLIST/GET_JAVASCRIPT_ERROR',
};

/**
 * Reset view state action
 * @param {Function}
 */
export const resetStateAction = () => {
    return dispatch => dispatch(requestStartAction(ACTIONS.RESET_STATE, {}, false));
};

/**
 * get json schema
 * @param {String} id 
 */
export const getSchema = (id) => (
    async(dispatch) => {
        try {
            dispatch(requestStartAction(ACTIONS.GET_SCHEMA_REQUEST));
            const schema = await ApiClient.getData(`/schema/${id}.json`);
            dispatch(requestCompletedAction(ACTIONS.GET_SCHEMA_SUCCESS, schema));
        } catch (error) {
            dispatch(requestCompletedAction(ACTIONS.GET_SCHEMA_ERROR, error));
        }
    }
);
