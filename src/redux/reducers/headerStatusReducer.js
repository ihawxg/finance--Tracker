import { OPEN_HEADER, CLOSE_HEADER } from "../actions/headerActions"

const INITIAL_STATE = {
    isOpen : false
}

export const headerStatusReducer = (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case OPEN_HEADER : 
            return {
                ...state,
                isOpen: true
            }
        case CLOSE_HEADER : 
            return {
                ...state,
                isOpen : false
            }
        default : 
            return state;    
    }

 }