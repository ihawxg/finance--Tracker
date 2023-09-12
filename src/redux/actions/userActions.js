import { db } from '../../../firebase';
import { collection, getDocs } from "firebase/firestore";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const ADD_INCOME = "ADD_INCOME";
export const ADD_EXPENSE = "ADD_EXPENSE";
export const ADD_GOAL = "ADD_GOAL";
export const CLEAR_GOALS = "CLEAR_GOALS";
export const ADD_BUDGET = "ADD_BUDGET";

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

export const loginAction = (email) => {
    return async function(dispatch) {
        const usersRef = collection(db, "users");
        const data = await getDocs(usersRef);
        const emailUser = data.docs.map(doc => ({...doc.data()})).filter(doc => doc.email === email)[0];
        console.log(emailUser);
        dispatch({type: LOGIN, payload: emailUser});
    }
}

//  export const loginAction = (email, pass) => {
//     return function(dispatch) {

//         const auth = getAuth();
//         const user = auth.currentUser;
//         if (user !== null) {

//           const firstName = user.firstName;
//           const lastName = user.lastName;
//           const email = user.email;
//           const avatar = user.avatar;
//           const emailVerified = user.emailVerified;
//           const id = user.id
//         }

//         const usersRef = collection(db, 'users');
//         const q = query(usersRef, where('email' == email && 'password' == pass));
//     }
// }