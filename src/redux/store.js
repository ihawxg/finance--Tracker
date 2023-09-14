import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from './reducers/userReducer';
import { snackbarReducer } from './reducers/snackbarReducer'
import {filtersReducer} from './reducers/filtersReducer';

const composedEnhancer = compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const rootReducer = combineReducers({

    userData : userReducer,
    snackbar : snackbarReducer,
    filters:filtersReducer,
    

});

const store = createStore(rootReducer, composedEnhancer);
export default store;