import { db } from '../../firebase';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore"; 
import { getDate } from "../../util";


export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const ADD_INCOME = "ADD_INCOME";
export const ADD_EXPENSE = "ADD_EXPENSE";
export const ADD_GOAL = "ADD_GOAL";
export const CLEAR_GOALS = "CLEAR_GOALS";
export const ADD_BUDGET = "ADD_BUDGET";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const ADD_CATEGORY_INCOME = "ADD_CATEGORY_INCOME";
export const ADD_CATEGORY_EXPENSE = "ADD_CATEGORY_EXPENSE";
export const EDIT_CATEGORY_EXPENSE = "EDIT_CATEGORY_EXPENSE";
export const EDIT_CATEGORY_INCOME = "EDIT_CATEGORY_INCOME";
export const UPDATE_ACCOUNTS = "UPDATE_ACCOUNTS";
export const EDIT_ACCOUNT = "EDIT_ACCOUNT";
export const REMOVE_ACCOUNT = "REMOVE_ACCOUNT";

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
    const date = getDate();
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