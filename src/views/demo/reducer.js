import { Map as MapImmutable } from 'immutable';
import { ACTIONS } from './actions';
const initialState = new MapImmutable({
});
const actionHandlers = {};
//add array
ACTIONS.actionReponse.forEach(item => {
  var resRequest = item + '_REQUEST';
  var resSuccess = item + '_SUCCESS';
  var resError = item + '_ERROR';
  
  actionHandlers[ACTIONS[resRequest]] = (state) =>
    state
      .set(item, null)
      .delete('error');
  actionHandlers[ACTIONS[resSuccess]] = (state, action) =>
    state
      .set(item, action.payload)
      .delete('error');

  actionHandlers[ACTIONS[resError]] = (state, action) =>
    state
      .set(item, null)
      .set('error', action.error);
});

console.log(actionHandlers)
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
