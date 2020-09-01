import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import promiseMiddleware from 'redux-promise';
import dynamicMiddlewares from 'redux-dynamic-middlewares';
import { createBrowserHistory } from 'history';
import { createLogger } from 'redux-logger';
import { Map } from 'immutable';
import Reducers from './reducers';
export const history = createBrowserHistory();
const initialState = {};
const middlewares = [thunk, promiseMiddleware,
    dynamicMiddlewares, routerMiddleware(history)];

const logger = createLogger({
    stateTransformer: state => {
        const newState = {};
        Object.keys(state).forEach(key => {
            const stateItem = state[key];
            newState[key] = Map.isMap(stateItem) ? stateItem.toJS() : stateItem;
        });
        return newState;
    }
});
middlewares.push(logger);

const composedEnhancers = compose(
    applyMiddleware(...middlewares)
);

const store = createStore(
    Reducers(history),
    initialState,
    composedEnhancers
);
export default store;
