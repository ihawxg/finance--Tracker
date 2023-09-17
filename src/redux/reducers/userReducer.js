import { basicExpenseCategories, basicIncomeCategories } from '../../utils/consts';

import { ADD_EXPENSE,
    ADD_GOAL,
    ADD_INCOME,
    UPDATE_BUDGET,
    ADD_CATEGORY_INCOME,
    ADD_CATEGORY_EXPENSE,
    CLEAR_GOALS,
    LOGIN,
    LOGOUT,
    EDIT_CATEGORY_EXPENSE,
    EDIT_CATEGORY_INCOME,
    UPDATE_ACCOUNTS,
    EDIT_ACCOUNT,
    UPDATE_USER_INFO,
    EDIT_INCOME_CATEGORY_COLOR,
    EDIT_EXPENSE_CATEGORY_COLOR,
    ADD_TO_GOAL,
    REMOVE_GOAL
} from '../actions/userActions';

const INITIAL_STATE = {
    logged: false,
    user: {
        email: "guest@guest.com",
        categories : [],
        transactions: [],
        accounts: [
            {
                name: "main",
                expenses: [],
                incomes: [],
            },

        ],
        budgets: [],
        goals: [],
        incomeCategories: basicIncomeCategories,
        expenseCategories: basicExpenseCategories,
        birthdate: "2021-12-16T14:00:51.813Z",
        firstName: "Guest",
        lastName: "Guest",
    }   
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOGIN : 
            return {
                ...state,
                logged: true,
                user: {
                    ...action.payload
                }
            }
        case LOGOUT : 
            localStorage.removeItem("currentUser");
            sessionStorage.removeItem("currentUser");
            return {
                ...state,
                logged: false,
                user: {
                    email: "guest@guest.com",
                    categories : [],
                    accounts: [
                        {
                            name: "main",
                            expenses: [],
                            incomes: [],
                        },
            
                    ],
                    budgets: [],
                    transactions: [],
                    incomeCategories: basicIncomeCategories,
                    expenseCategories: basicExpenseCategories,
                    birthdate: "2021-12-16T14:00:51.813Z",
                    firstName: "Guest",
                    lastName: "Guest",
                    goals: []
                }
            }
        case ADD_INCOME :
            return {
                ...state,
                user: {
                    ...state.user,
                    accounts : [...action.payload.accounts],
                    transactions: [...action.payload.transactions]
                }
    
            }    
        case ADD_EXPENSE : 
            return {
                ...state,
                user : {
                    ...state.user,
                    accounts : [...action.payload.accounts],
                    transactions: [...action.payload.transactions]
                }
            }   
        case UPDATE_BUDGET : 
            return {
                
                ...state,
                user : {
                    ...state.user,
                    budgets : [...action.payload]
                }
            }    
        case ADD_GOAL : 
            return {
                ...state,
                user : {
                    ...state.user,
                    goals : action.payload
                }
            }
        case ADD_TO_GOAL : 
            return {
                ...state,
                user : {
                    ...state.user,
                    goals : action.payload
                }
            }

        case REMOVE_GOAL : 
            return {
                ...state,
                user : {
                    ...state.user,
                    goals : action.payload
                }
            }   

        case ADD_CATEGORY_INCOME:
            return {
                ...state,
                user: {
                    ...state.user,
                    incomeCategories: [...state.user.incomeCategories, action.payload],
                    categories: [...state.user.categories, action.payload]
                }
            }
        case ADD_CATEGORY_EXPENSE:
            return {
                ...state,
                user: {
                    ...state.user,
                    expenseCategories: [...state.user.expenseCategories, action.payload],
                    categories: [...state.user.categories, action.payload]
                }
            }   
        case EDIT_CATEGORY_EXPENSE : 
            return {
                ...state,
                user : {
                    ...state.user,
                    expenseCategories: action.payload.expenseCategories,
                    incomeCategories: action.payload.incomeCategories,
                    categories: action.payload.categories
                }
            } 
        case EDIT_CATEGORY_INCOME : 
            return {
                ...state,
                user : {
                    ...state.user,
                    incomeCategories: action.payload.incomeCategories,
                    expenseCategories: action.payload.expenseCategories,
                    categories: action.payload.categories
                }
            } 
        case UPDATE_ACCOUNTS : 
            return {
                ...state,
                user : {
                    ...state.user,
                    accounts: [...action.payload]
                }
            } 

        case EDIT_ACCOUNT:
            return {
                ...state,
                user : {
                    ...state.user,
                    accounts: [...action.payload]
                }
            }

        case CLEAR_GOALS : 
            return {
                ...state,
                user : {
                    ...state.user,
                    goals : []
                }
            }

        case EDIT_INCOME_CATEGORY_COLOR:
            return {
                ...state,
                user: {
                    ...state.user,
                    incomeCategories : action.payload
                }
            }

        case EDIT_EXPENSE_CATEGORY_COLOR:
            return {
                ...state,
                user: {
                    ...state.user,
                    expenseCategories : action.payload
                }
            }

        case UPDATE_USER_INFO: 
            return {
                ...state,
                user : {
                    ...state.user,
                    firstName : action.payload.firstName,
                    lastName : action.payload.lastName,
                    birtdate : action.payload.birtdate
                }
            }
       
        default : 
            return state;
    }
}