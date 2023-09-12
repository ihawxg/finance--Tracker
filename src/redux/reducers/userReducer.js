import { ADD_EXPENSE, ADD_GOAL, ADD_INCOME, ADD_BUDGET, CLEAR_GOALS, LOGIN, LOGOUT } from '../actions/userActions';
import { ADD_EXPENSE, ADD_GOAL, ADD_INCOME, ADD_BUDGET, ADD_CATEGORY_INCOME, ADD_CATEGORY_EXPENSE, CLEAR_GOALS, LOGIN, LOGOUT } from '../actions/userActions';
import { incomeArr } from '../mock-data/mock-income';
import { expenseArr } from '../mock-data/mock-expense';
import { budgetArr } from '../mock-data/mock-budget';
import { account, category } from '../mock-data/mock-accounts-categories';
import {basicIncomeCategories, basicExpenseCategories} from "../../utils/consts";

const INITIAL_STATE = {
    logged: true,
    user : {
        email: "vasko47@abv.bg",
        accounts: [
            {
                name: "main",
                budgets: [],
                categories: [1,2,3],
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
                categories: ["entertainment", "clothes", "studies"],
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
                categories: ["swimming", "books", "furniture"],
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
        id: "tWLn6IPOCs2TlzFObTFA"
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
                    incomeCategories: [...state.user.incomeCategories, action.payload]
                }
            }
        case ADD_CATEGORY_EXPENSE :
            return {
                ...state,
                user : {
                    ...state.user,
                    expenseCategories: [...state.user.expenseCategories, action.payload]
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