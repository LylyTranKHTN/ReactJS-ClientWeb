import { Map as MapImmutable } from 'immutable';
import { ACTIONS } from './actions';

const initialState = new MapImmutable({
    user: null,
});
const actionHandlers = {};

actionHandlers[ACTIONS.GET_SCHEMA_REQUEST] = (state) =>
  state
    .delete('title')
    .delete('datatableSchema')
    .delete('editPageSchema');

actionHandlers[ACTIONS.GET_SCHEMA_SUCCESS] = (state, action) =>
  state
    .set('title', action.payload.title)
    .set('datatableSchema', action.payload.datatable)
    .set('editPageSchema', action.payload.editPage);

actionHandlers[ACTIONS.GET_SCHEMA_ERROR] = (state) =>
  state
    .delete('title')
    .delete('datatableSchema')
    .delete('editPageSchema');

actionHandlers[ACTIONS.GET_JAVASCRIPT_REQUEST] = (state) =>
  state
    .delete('script');

actionHandlers[ACTIONS.GET_JAVASCRIPT_SUCCESS] = (state, action) =>
  state
    .set('script', action.payload);

actionHandlers[ACTIONS.GET_JAVASCRIPT_ERROR] = (state) =>
  state
    .delete('script');

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
