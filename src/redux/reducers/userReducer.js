import { ADD_EXPENSE, ADD_GOAL, ADD_INCOME, ADD_BUDGET, ADD_CATEGORY_INCOME, ADD_CATEGORY_EXPENSE, CLEAR_GOALS, LOGIN, LOGOUT } from '../actions/userActions';
import { basicIncomeCategories, basicExpenseCategories } from "../../utils/consts";

const INITIAL_STATE = {
    logged: true,
    user: {
        email: "vasko47@abv.bg",
        accounts: [
            {
                name: "main",
                budgets: [],
                categories: [
                    {
                        name : "investments",
                        type: "expense"
                    },
                    {
                        name : "Commision",
                        type : "income"
                    },
                    {
                        name : "Transportation",
                        type : "expense"
                    }
                ],
                expenses: [],
                incomes: [
                    {
                        date: "2022-01-01T08:57:43.000Z"                        ,
                        amount: "123",
                        category: { name : "Initial Desposit", type : "income"},
                        descr: "Initial App Deposit"
                    }
                ],
                goals: []
            },
            {
                name: "sub-zero",
                budgets: [],
                categories: [
                    {
                        name : "food",
                        type: "expense"
                    },
                    {
                        name : "crypto",
                        type : "expense"
                    },
                    {
                        name : "salary",
                        type : "income"
                    }
                ],
                expenses: [],
                incomes: [
                    {
                        date: "2022-03-12T08:57:43.000Z",
                        amount: "1200",
                        category: { name : "Initial Desposit", type : "income"},
                        descr: "Initial App Deposit"
                    }
                ],
                goals: []
            },
            {
                name: "schmain",
                budgets: [],
                categories: [
                    {
                        name : "swimming",
                        type: "expense"
                    },
                    {
                        name : "books",
                        type : "expense"
                    },
                    {
                        name : "furniture",
                        type : "expense"
                    }
                ],
                expenses: [],
                incomes: [
                    {
                        date: "2022-02-13T08:57:43.000Z",
                        amount: "10",
                        category: { name : "Initial Desposit", type : "income"},
                        descr: "Initial App Deposit"
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
    switch (action.type) {
        case LOGIN:
            // add localStorage or sessionStorage token
            return {
                ...state,
                logged: true,
                user: {
                    ...action.payload
                }
            }
        case LOGOUT:
            // localStorage.removeItem("logged");
            return {
                ...state,
                logged: false,
                user: {}
            }
        case ADD_INCOME: {
            const currentAccount = state.user.accounts.find(acc =>
                acc.name === action.payload.account)
            currentAccount.incomes.unshift(action.payload)
            return {
                ...state,
                user: {
                    ...state.user,
                    accounts: [
                        ...state.user.accounts
                    ]
                }
            }
        }

        case ADD_EXPENSE: {
            const currentAccount = state.user.accounts.find(acc =>
                acc.name === action.payload.account)
            currentAccount.expenses.unshift(action.payload)
            return {
                ...state,
                user: {
                    ...state.user,
                    accounts: [
                        ...state.user.accounts
                    ]
                }
            }
        }

        case ADD_BUDGET: {
            const currentAccount = state.user.accounts.find(acc =>
                acc.name === action.payload.account)
            currentAccount.budgets.unshift(action.payload)
            return {
                ...state,
                user: {
                    ...state.user,
                    accounts: [
                        ...state.user.accounts
                    ]
                }
            }
        }

        case ADD_GOAL: {
            const currentAccount = state.user.accounts.find(acc =>
                acc.name === action.payload.account)
            currentAccount.goals.unshift(action.payload)
            return {
                ...state,
                user: {
                    ...state.user,
                    accounts: [
                        ...state.user.accounts
                    ]
                }
            }
        }

        case ADD_CATEGORY_INCOME:
            return {
                ...state,
                user: {
                    ...state.user,
                    incomeCategories: [...state.user.incomeCategories, action.payload]
                }
            }
        case ADD_CATEGORY_EXPENSE:
            return {
                ...state,
                user: {
                    ...state.user,
                    expenseCategories: [...state.user.expenseCategories, action.payload]
                }
            }

        default:
            return state;
    }
}