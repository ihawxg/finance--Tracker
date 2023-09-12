import { db } from '../../firebase';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useSelector } from 'react-redux';

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
export const updateUserIncomeCategories = (id, incomeCategories, category) => {
    return async function(dispatch) {

        const userRef = doc(db, "users", id);
        const newIncomeCategories = {incomeCategories: [...incomeCategories, category]};
        await updateDoc(userRef, newIncomeCategories);
        dispatch({type: ADD_CATEGORY_INCOME, payload: category});
    }
}

export const updateUserExpenseCategories = (id, expenseCategories, category) => {
    return async function(dispatch) {

        const userRef = doc(db, "users", id);
        const newExpenseCategories = {expenseCategories: [...expenseCategories, category]};
        await updateDoc(userRef, newExpenseCategories);
        dispatch({type: ADD_CATEGORY_EXPENSE, payload: category});
    }
}

export const loginAction = (email) => {
    return async function(dispatch) {
        const usersRef = collection(db, "users");
        const data = await getDocs(usersRef);
        const emailUser = data.docs.map(doc => ({...doc.data(), id: doc.id})).filter(doc => doc.email === email)[0];
        console.log(emailUser);
        dispatch({type: LOGIN, payload: emailUser});
    }
}