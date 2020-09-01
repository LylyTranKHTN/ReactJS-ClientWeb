import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { Map as MapImmutable } from 'immutable';
import { reducer as reduxFormReducer } from 'redux-form';
import Login from '../../views/login/reducer';
import Dashboard from '../../views/dashboard/reducer';
import About from '../../views/about/reducer';
import Demo from '../../views/demo/reducer';
import ProductsList from '../../views/productsList/reducer';
import NavBar from '../../components/navbar/reducer';
import { ACTIONS } from './actions';

const initialState = MapImmutable({
    isProcessing: true,
    user: null,
});

const App = (state = initialState, { type, payload }) => {
    switch (type) {
    case ACTIONS.LOADING: return state.merge({ isProcessing: true, ...payload });
    case ACTIONS.LOADED: return state.merge({ isProcessing: false, ...payload });
    case ACTIONS.GET_AUTHENTICATION_START:
        return state.merge({ ...payload });
    case ACTIONS.GET_AUTHENTICATION_SUCCESS:
        return state.merge({ ...payload });
    case ACTIONS.GET_AUTHENTICATION_ERROR:
        return state.merge({ ...payload });
    default: return state;
    }
};

export default history => combineReducers({
    App,
    Login,
    Dashboard,
    About,
    Demo,
    NavBar,
    ProductsList,
    form: reduxFormReducer,
    router: connectRouter(history)
});
