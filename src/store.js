import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from './redux/reducers/userReducer';
import { snackbarReducer } from './redux/reducers/snackbarReducer'

const composedEnhancer = compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const rootReducer = combineReducers({

    userData : userReducer,
    snackbar : snackbarReducer


});