import { db } from '../../firebase';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore"; 
// import { accordionDetailsClasses } from '@mui/material';
import { setSnackbar } from "./snackbarActions";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const ADD_INCOME = "ADD_INCOME";
export const ADD_EXPENSE = "ADD_EXPENSE";
export const ADD_GOAL = "ADD_GOAL";
export const CLEAR_GOALS = "CLEAR_GOALS";
export const UPDATE_BUDGET = "UPDATE_BUDGET";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const ADD_BUDGET = "ADD_CATEGORY";
export const ADD_CATEGORY_INCOME = "ADD_CATEGORY_INCOME";
export const ADD_CATEGORY_EXPENSE = "ADD_CATEGORY_EXPENSE";
export const EDIT_CATEGORY_EXPENSE = "EDIT_CATEGORY_EXPENSE";
export const EDIT_CATEGORY_INCOME = "EDIT_CATEGORY_INCOME";
export const UPDATE_ACCOUNTS = "UPDATE_ACCOUNTS";
export const EDIT_ACCOUNT = "EDIT_ACCOUNT";
export const REMOVE_ACCOUNT = "REMOVE_ACCOUNT";
export const EDIT_INCOME = "EDIT_INCOME";
export const EDIT_EXPENSE = "EDIT_EXPENSE";

export const logoutAction = {
    type: LOGOUT
}
export const addIncomeAction = (incomeObject) => {
    return {
        type : ADD_INCOME,
        payload : incomeObject
    }
}
export const addBudgetAction = (budgetObject) => {
    return {
        type : ADD_BUDGET,
        payload : budgetObject
    }
}
export const addExpenseAction = (expenseObject) => {
    return {
        type : ADD_EXPENSE,
        payload : expenseObject
    }
}
export const addGoalAction = (goalObject) => {
    return {
        type : ADD_GOAL,
        payload : goalObject
    }
}

export const clearGoalsAction = {
    type : CLEAR_GOALS
}

export const addCategoryIncomeAction = (category) => {
    return {
        type : ADD_CATEGORY_INCOME,
        payload : category
    }
}

export const addCategoryExpenseAction = (category) => {
    return {
        type : ADD_CATEGORY_EXPENSE,
        payload : category
    }
}

//redux method use to update the current user in firebase
export const updateUserIncomeCategories = (id, incomeCategories, categories, category) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", id);
        const newIncomeCategories = {incomeCategories: [...incomeCategories, category.name], categories: [...categories, category]};
        await updateDoc(userRef, newIncomeCategories);
        dispatch({type: ADD_CATEGORY_INCOME, payload: category});
    }
} 

export const updateUserExpenseCategories = (id, expenseCategories, categories, category) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", id);
        const newExpenseCategories = {expenseCategories: [...expenseCategories, category.name], categories: [...categories, category]};
        await updateDoc(userRef, newExpenseCategories);
        dispatch({type: ADD_CATEGORY_EXPENSE, payload: category});
    }
} 

export const editExpenseCategories = (id, position, expenseCategories, incomeCategories, categories, prevCategory, category, remove) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", id);

        let newExpenseCategories;
        let newIncomeCategories = [...incomeCategories];

        if(prevCategory.type === "income"){
            newIncomeCategories = [];
            incomeCategories.forEach(el => {
                if(el !== prevCategory.name){
                    newIncomeCategories.push(el);
                };
            });
            newExpenseCategories = remove ? [...expenseCategories] : [...expenseCategories, category.name];
        }
        else{
            newExpenseCategories = [];
            expenseCategories.forEach(el => {
                if(el !== prevCategory.name && !remove){
                    newExpenseCategories.push(category.name);
                }
                else if(el !== prevCategory.name){
                    newExpenseCategories.push(el);
                }
            });
        }

        const newCategories = [...categories];
        remove ? newCategories.splice(position, 1) : newCategories[position] = category;
        const newFields = {expenseCategories: newExpenseCategories, incomeCategories: newIncomeCategories, categories: newCategories};

        await updateDoc(userRef, newFields);
        dispatch({type: EDIT_CATEGORY_EXPENSE, payload: newFields});
    }
}

export const editIncomeCategories = (id, position, expenseCategories, incomeCategories, categories, prevCategory, category, remove) => {
    return async function(dispatch) {
        
        const userRef = doc(db, "users", id);

        let newExpenseCategories = [...expenseCategories];
        let newIncomeCategories;

        if(prevCategory.type === "expense"){
            newExpenseCategories = [];
            expenseCategories.forEach(el => {
                if(el !== prevCategory.name){
                    newExpenseCategories.push(el);
                };
            });
            newIncomeCategories = remove ? [...incomeCategories] : [...incomeCategories, category.name];
        }
        else{
            newIncomeCategories = [];
  
            incomeCategories.forEach(el => {
                if(el !== prevCategory.name && !remove){
                    newIncomeCategories.push(category.name);
                }
                else if(el !== prevCategory.name){
                    newIncomeCategories.push(el);
                }
            });
        }
        const newCategories = [...categories];
        remove ? newCategories.splice(position, 1) : newCategories[position] = category;
        const newFields = {incomeCategories: newIncomeCategories, expenseCategories: newExpenseCategories, categories: newCategories};
        await updateDoc(userRef, newFields);
        dispatch({type: EDIT_CATEGORY_INCOME, payload: newFields});
    }
} 

export const loginAction = (email) => {
    return async function(dispatch) {
        const usersRef = collection(db, "users");
        const data = await getDocs(usersRef);
        const emailUser = data.docs.map(doc => ({...doc.data(), id: doc.id})).filter(doc => doc.email === email)[0];
        dispatch({type: LOGIN, payload: emailUser});
    }
} 

export const addAccountAction = (id, name, amount, accounts) => {
    const date = JSON.stringify(new Date());
    return async function(dispatch) {
        const userRef = doc(db, "users", id);
        const newFields = {accounts: [...accounts,
            {
                name: name,
                incomes: [{category: "Initial Deposit", date: date, description: "Initial Account Deposit", amount: amount}],
                budgets: [],
                expenses: [],
                goals: []
            }]}

        await updateDoc(userRef, newFields);
        dispatch({type: UPDATE_ACCOUNTS, payload: newFields.accounts});
    }
} 

export const editAccountAction = (id, prevName, newName, accounts) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", id);

        const newAccounts = accounts.map(el => {
            if(el.name === prevName){
                return {
                    ...el,
                    name: newName
                }
            }
            return el;
        })

        const newFields = {accounts: newAccounts};
    
        await updateDoc(userRef, newFields);
        dispatch({type: EDIT_ACCOUNT, payload: newFields.accounts});
    }
} 

export const removeAccountAction = (id, prevName, accounts) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", id);

        const newAccounts = [];

        accounts.forEach(el => {
            if(el.name !== prevName){
                newAccounts.push(el);
            }
        });

        const newFields = {accounts: newAccounts};
    
        await updateDoc(userRef, newFields);
        dispatch({type: EDIT_ACCOUNT, payload: newFields.accounts});
    }
} 

export const addExpense = (user, details) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", user.id);
        const newField = user.accounts;
        let newTransactions = [];
        let br = 0;
        
        const id = new Date().valueOf();

        newField.forEach(acc => {
            if(acc.name === details.account){
                if(Number(acc.total) <  Number(details.amount)){
                    dispatch(setSnackbar(true, "error", `You are trying to exceed your total in ${acc.name}!`));
                    return;
                }
                else{
                    newTransactions = [...user.transactions, {
                        type: "expense",
                        date: details.date,
                        amount: details.amount,
                        category: details.category,
                        description: details.descr,
                        id: id,
                        account: acc.name
                    }];

                    const newExpenses = [...acc.expenses, {date: details.date,
                        amount: details.amount,
                        category: details.category,
                        description: details.descr,
                        id: id
                    }];
                    newField[br] = {...newField[br], expenses: newExpenses, total: (Number(newField[br].total) - Number(details.amount)).toString()};
                }
            }
            br++;
        });

        const newBudget = user.budgets;
        if(newBudget.some(budget => budget.category === details.category)){
            const ind = newBudget.findIndex(budget => budget.category === details.category);
            const prevBudget = {...newBudget[ind], amount: newBudget[ind].max};
            dispatch(addBudget(user, prevBudget));
        }

        await updateDoc(userRef, {transactions: newTransactions, accounts: newField});
        dispatch({type: ADD_EXPENSE, payload: {transactions: newTransactions, accounts: newField}});
    }
} 

export const addIncome = (user, details) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", user.id);
        const newField = user.accounts;
        let br = 0;
        let newTransactions = [];

        const id = new Date().valueOf();

        newField.forEach(acc => {
            if(acc.name === details.account){
                const newIncomes = [...acc.incomes, {date: details.date,
                                amount: details.amount,
                                category: details.category,
                                description: details.descr,
                                id: id
                }];
                newField[br] = {...newField[br], incomes: newIncomes, total: (Number(newField[br].total) + Number(details.amount)).toString()};

                newTransactions = [...user.transactions, {
                    type: "income",
                    date: details.date,
                    amount: details.amount,
                    category: details.category,
                    description: details.descr,
                    id: id,
                    account: acc.name
                }];
            }
            br++;
        });

        await updateDoc(userRef, {transactions: newTransactions, accounts: newField});
        dispatch({type: ADD_INCOME, payload: {transactions: newTransactions, accounts: newField}});
    }
} 

export const editIncome = (user, details, prevAccountName, incomeID) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", user.id);
        const newField = user.accounts;

        if(prevAccountName === details.account){
            let counterAcc = 0;
            newField.forEach(acc => {
                if(acc.name === prevAccountName){
                    let counterIncomes = 0;
                    acc.incomes.forEach(income => {
                        if(income.id === incomeID){
                            newField[counterAcc].incomes[counterIncomes] = {date: details.date,
                                amount: details.amount,
                                category: details.category,
                                description: details.descr,
                                id: income.id
                            }
                        }
                        counterIncomes++;
                    })
                }
                counterAcc++;
            })
        }
        else{
            dispatch(removeIncomeExpense(user, incomeID, prevAccountName, false));
            let counterAcc = 0;
            newField.forEach(acc => {
               if(acc.name === details.account){
                newField[counterAcc].incomes.push({date: details.date,
                    amount: details.amount,
                    category: details.category,
                    description: details.descr,
                    id: incomeID
                })
               }
               counterAcc++;
            })
        }
        
        await updateDoc(userRef, {accounts: newField});
        dispatch({type: UPDATE_ACCOUNTS, payload: newField});
    }
} 

export const editExpense = (user, details, prevAccountName, expenseID) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", user.id);
        const newField = user.accounts;

        if(prevAccountName === details.account){
            let counterAcc = 0;
            newField.forEach(acc => {
                if(acc.name === prevAccountName){
                    let counterExpenses = 0;
                    acc.expenses.forEach(expense => {
                        if(expense.id === expenseID){
                            newField[counterAcc].expenses[counterExpenses] = {date: details.date,
                                amount: details.amount,
                                category: details.category,
                                description: details.descr,
                                id: expense.id
                            }
                        }
                        counterExpenses++;
                    })
                }
                counterAcc++;
            })
        }
        else{
            dispatch(removeIncomeExpense(user, expenseID, prevAccountName, true));
            let counterAcc = 0;
            newField.forEach(acc => {
               if(acc.name === details.account){
                newField[counterAcc].expenses.push({date: details.date,
                    amount: details.amount,
                    category: details.category,
                    description: details.descr,
                    id: expenseID
                })
               }
               counterAcc++;
            })
        }
        
        await updateDoc(userRef, {accounts: newField});
        dispatch({type: UPDATE_ACCOUNTS, payload: newField});
    }
} 

export const removeIncomeExpense = (user, id, accountName, isExpense) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", user.id);
        const newField = user.accounts;
        
        let counterAcc = 0;
        newField.forEach(acc => {
            if(acc.name === accountName){
                let counter = 0;
                if(isExpense){
                    acc.expenses.forEach(expense => {
                        if(expense.id === id){
                            newField[counterAcc].expenses.splice(counter, 1);
                        }
                        
                    })
                }
                else{
                    acc.incomes.forEach(income => {
                        if(income.id === id){
                            newField[counterAcc].incomes.splice(counter, 1);
                        }
            
                    })
                }
                counter++;
            }
            counterAcc++;
        })
        
        await updateDoc(userRef, {accounts: newField});
        dispatch({type: UPDATE_ACCOUNTS, payload: newField});
    }
} 

const isWithinDate = (date, from, to) => {
    const timeFrom = new Date(from.slice(1,11)).getTime();
    const timeDate = new Date(date.slice(1,11)).getTime();
    const timeTo = new Date(to.slice(1,11)).getTime();
    return (timeFrom < timeDate && timeDate < timeTo);
}

const getAmount = (user, from, to, category) => {
    let amount = 0;
    user.accounts.forEach(acc => {
        acc.expenses.forEach(exp => {
    
            if(exp.category === category && isWithinDate(exp.date, from, to)){
                amount += Number(exp.amount);
            }
        })
    })
    return amount;
}

export const addBudget = (user, details) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", user.id);
        const newField = user.budgets;

        const amount = getAmount(user, details.from, details.to, details.category);
        //in case we already have the same budget category we re-write it
        if(newField.some(budget => budget.category === details.category)){
            newField[newField.findIndex(budget => budget.category === details.category)] = {
                category: details.category,
                amount: amount,
                max: details.amount,
                from: details.from,
                to: details.to,
            }
        }
        else{
            newField.push({
                category: details.category,
                amount: amount,
                max: details.amount,
                from: details.from,
                to: details.to,
            });
        }

        if(amount > details.amount){
            dispatch(setSnackbar(true, "warning", `You have exceeded you ${details.category} budget!`));
        }
        
        await updateDoc(userRef, {budgets: newField});
        dispatch({type: UPDATE_BUDGET, payload: newField});
    }
} 

export const editBudget = (user, details, prevCategory) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", user.id);
        const newField = user.budgets;

        //in case we already have the same budget category we re-write it
        if(prevCategory !== details.category){
            dispatch(removeBudget(user, prevCategory));
        }

        dispatch(addBudget(user, details));
        
        await updateDoc(userRef, {budgets: newField});
        dispatch({type: UPDATE_BUDGET, payload: newField});
    }
} 

export const removeBudget = (user, category) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", user.id);
        const newField = user.budgets;

        const ind = newField.findIndex(budget => budget.category === category);
        newField.splice(ind, 1);
        
        await updateDoc(userRef, {budgets: newField});
        dispatch({type: UPDATE_BUDGET, payload: newField});
    }
} 