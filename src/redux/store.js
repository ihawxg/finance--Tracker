import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from './reducers/userReducer';
import { snackbarReducer } from './reducers/snackbarReducer';
import { headerStatusReducer } from './reducers/headerStatusReducer';

// Check if Redux DevTools Extension is available in the current environment
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducer = combineReducers({
  userData: userReducer,
  snackbar: snackbarReducer,
  headerStatus: headerStatusReducer,
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export default store;