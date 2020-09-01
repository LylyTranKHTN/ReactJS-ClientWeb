import { Map as MapImmutable } from 'immutable';
import { ACTIONS } from './actions';

const initialState = new MapImmutable({
    user: null,
});
const actionHandlers = {};

actionHandlers[ACTIONS.LOGIN_REQUEST] = (state) =>
  state
    .set('user', null)
    .delete('error');

actionHandlers[ACTIONS.LOGIN_SUCCESS] = (state, action) =>
  state
    .set('user', action.user)
    .delete('error');

actionHandlers[ACTIONS.LOGIN_ERROR] = (state, action) =>
  state
    .set('user', null)
    .set('error', action.error);


/**
 * Action Handlers
 * @param {Object} state Current state
 * @param {Object} action
 * @return {Object} Next state
 */
export default(state = initialState, action) => {
  if (actionHandlers[action.type] !== undefined) {
    const nextState = actionHandlers[action.type](state, action);
    if (nextState === null || nextState === undefined) {
      return state;
    }
    return nextState;
  }
  return state;
};
