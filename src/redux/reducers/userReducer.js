import { ADD_EXPENSE, ADD_GOAL, ADD_INCOME, ADD_BUDGET, CLEAR_GOALS, LOGIN, LOGOUT } from '../actions/userActions';
import { incomeArr } from '../mock-data/mock-income';
import { expenseArr } from '../mock-data/mock-expense';
import { budgetArr } from '../mock-data/mock-budget';
import { account, category } from '../mock-data/mock-accounts-categories';

const INITIAL_STATE = {
    logged: true,
    user : {
        firstName : 'Viktoria',
        lastName : "Slavkova",
        email : 'vx.slavkova@gmail.com',
        birthdate : '26/09/1994',
        incomes : incomeArr,
        expenses : expenseArr,
        budgets : budgetArr,
        goals : [{descr : "Laptop", amount : 800}],
        accounts : account,
        categories : category,
        startBudget : 1200
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
                    firstName : action.payload.firstName,
                    lastName : action.payload.lastName,
                    email : action.payload.email,
                    birthdate : action.payload.birthdate,
                    incomes : action.payload.incomes,
                    expenses : action.payload.expenses,
                    goals : action.payload.goals,
                    total : action.payload.total,
                    startBudget : action.payload.startBudget
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