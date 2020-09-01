import { Map as MapImmutable } from 'immutable';

const initialState = new MapImmutable({});
const actionHandlers = {};

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
