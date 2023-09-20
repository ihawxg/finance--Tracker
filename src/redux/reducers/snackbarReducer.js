import { SET_SNACKBAR } from '../actions/snackbarActions';

const INITIAL_STATE = {
    snackbarOpen : false,
    snackbarType : "success",
    snackbarMessage : "",
    vertical : 'bottom',
    horizontal : 'right'
}

export const snackbarReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_SNACKBAR : 
            const {snackbarOpen, snackbarType, snackbarMessage} = action.payload;
            return {
                ...state,
                snackbarOpen,
                snackbarType,
                snackbarMessage
            };
        default :
            return state;
    }
} 