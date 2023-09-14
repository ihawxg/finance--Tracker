import { ADD_ACCOUNT_FILTER, ADD_CATEGORY_FILTER, ADD_FROM_DATE_FILTER, ADD_RANGE_FILTER, ADD_TO_DATE_FILTER, CLEAR_FILTERS } from "../actions/filtersActions";
const INITIAL_STATE = {
    from_date : null,
    to_date : null,
    category : [],
    account : [],
    range : []
}

export const filtersReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_FROM_DATE_FILTER:
            return {
                ...state,
                from_date :  action.payload
            }
        case ADD_TO_DATE_FILTER:
            return {
                ...state,
                to_date : action.payload
            }
        case ADD_CATEGORY_FILTER:
            return {
                ...state,
                category : [...state.category, action.payload]
            }
        case ADD_ACCOUNT_FILTER:
            return {
                ...state,
                account : [...state.account, action.payload]
            }
        case ADD_RANGE_FILTER:
            return {
                ...state,
                range : action.payload
            }
        case CLEAR_FILTERS : 
            return {
                from_date : null,
                to_date : null,
                category : [],
                account : [],
                range : []
            }
        default : 
            return state;
    }
}