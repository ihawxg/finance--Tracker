export const ADD_FROM_DATE_FILTER = "ADD_FROM_DATE_FILTER";
export const ADD_TO_DATE_FILTER = "ADD_TO_DATE_FILTER";
export const ADD_RANGE_FILTER = "ADD_RANGE_FILTER";
export const ADD_CATEGORY_FILTER = "ADD_CATEGORY_FILTER";
export const ADD_ACCOUNT_FILTER = "ADD_ACCOUNT_FILTER";
export const CLEAR_FILTERS = "CLEAR_FILTERS";
export const ADD_TYPE_FILTER = "ADD_TYPE_FILTER";
export const clearFilters = () => {
    return {
        type : CLEAR_FILTERS
    }
}
export const applyTypeFilter = (type) => {
    return {
        type : ADD_TYPE_FILTER,
        payload : type
    }
}
export const applyFromDateFilter = (date) => {
    return {
        type : ADD_FROM_DATE_FILTER,
        payload : date
    }
} 
export const applyToDateFilter = (date) => {
    return {
        type : ADD_TO_DATE_FILTER,
        payload : date
    }
}
export const applyRangeFilter = (x, y) => {
    return {
        type : ADD_RANGE_FILTER,
        payload : [x, y] 
    }
}
export const applyCategoryFilter = (category) => {
    return {
        type : ADD_CATEGORY_FILTER,
        payload :  category
    }
}
export const applyAccountFilter = (account) => {
    return {
        type : ADD_ACCOUNT_FILTER,
        payload : account
    }
}