import { ADD_EXPENSE,
    ADD_GOAL,
    ADD_INCOME,
    ADD_BUDGET,
    ADD_CATEGORY_INCOME,
    ADD_CATEGORY_EXPENSE,
    CLEAR_GOALS,
    LOGIN,
    LOGOUT,
    EDIT_CATEGORY_EXPENSE,
    EDIT_CATEGORY_INCOME,
    UPDATE_ACCOUNTS,
    EDIT_ACCOUNT
} from '../actions/userActions';
import {basicIncomeCategories, basicExpenseCategories} from "../../utils/consts";

const INITIAL_STATE = {
    logged: true,
    user : {
        email: "vasko47@abv.bg",
        categories: [],
        accounts: [
            {
                name: "main",
                budgets: [],
                expenses: [],
                incomes: [
                    {
                        date: "2/18/2022",
                        amount: "123",
                        category: "Initial Deposit",
                        description: "Initial App Deposit"
                    }
                ],
                goals: []
            },
            {
                name: "sub-zero",
                budgets: [],
                expenses: [],
                incomes: [
                    {
                        date: "2/18/2022",
                        amount: "1200",
                        category: "Initial Deposit",
                        description: "Initial App Deposit"
                    }
                ],
                goals: []
            },
            {
                name: "schmain",
                budgets: [],
                expenses: [],
                incomes: [
                    {
                        date: "2/18/2022",
                        amount: "10",
                        category: "Initial Deposit",
                        description: "Initial App Deposit"
                    }
                ],
                goals: []
            }
        ],
        incomeCategories: basicIncomeCategories,
        expenseCategories: basicExpenseCategories,
        birthdate: "2001-11-09",
        firstName: "Васил",
        lastName: "Любенов",
        id: "38cQLPYsrIzBBkRnpugS"
    }
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOGIN : 
        // add localStorage or sessionStorage token 
            return {
                ...state,
                logged : true,
                user : {
                    ...action.payload
                }
            }
        case LOGOUT : 
            // localStorage.removeItem("logged");
            return {
                ...state,
                logged : false,
                user : {}
            }
        case ADD_INCOME : 
            return {
                ...state,
                user : {
                    ...state.user,
                    incomes : [...state.user.incomes, action.payload]
                }
            }    
        case ADD_EXPENSE : 
            return {
                ...state,
                user : {
                    ...state.user,
                    expenses : [...state.user.expenses, action.payload]
                }
            }   
        case ADD_BUDGET : 
            return {
                ...state,
                user : {
                    ...state.user,
                    budgets : [...state.user.budgets, action.payload]
                }
            }    
        case ADD_GOAL : 
            return {
                ...state,
                user : {
                    ...state.user,
                    goals : [...state.user.goals, action.payload]
                }
            }

        case ADD_CATEGORY_INCOME : 
            return {
                ...state,
                user : {
                    ...state.user,
                    incomeCategories: [...state.user.incomeCategories, action.payload.name],
                    categories: [...state.user.categories, action.payload]
                }
            }
        case ADD_CATEGORY_EXPENSE : 
            return {
                ...state,
                user : {
                    ...state.user,
                    expenseCategories: [...state.user.expenseCategories, action.payload.name],
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
        default : 
            return state;
    }
}