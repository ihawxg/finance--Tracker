import { db } from '../../backendConfig/firebase';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore"; 
import { setSnackbar } from "./snackbarActions";
import { getAmount } from "../../utils/util";
import { CronJob } from 'cron';

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const ADD_INCOME = "ADD_INCOME";
export const ADD_EXPENSE = "ADD_EXPENSE";
export const ADD_GOAL = "ADD_GOAL";
export const ADD_TO_GOAL = "ADD_TO_GOAL";
export const CLEAR_GOALS = "CLEAR_GOALS";
export const UPDATE_BUDGET = "UPDATE_BUDGET";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const ADD_BUDGET = "ADD_CATEGORY";
export const ADD_CATEGORY_INCOME = "ADD_CATEGORY_INCOME";
export const ADD_CATEGORY_EXPENSE = "ADD_CATEGORY_EXPENSE";
export const UPDATE_ACCOUNTS = "UPDATE_ACCOUNTS";
export const UPDATE_USER_INFO = "UPDATE_USER_INFO";
export const EDIT_EXPENSE_CATEGORY_COLOR = "EDIT_EXPENSE_CATEGORY_COLOR";
export const EDIT_INCOME_CATEGORY_COLOR = "EDIT_INCOME_CATEGORY_COLOR";
export const REMOVE_GOAL = "REMOVE_GOAL";
export const UPDATE_AVATAR = "UPDATE_AVATAR";

export const updateUserInfoAction = (id, details) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", id);
        const newAccountInfo = {firstName: details.firstName, lastName: details.lastName, birthdate: JSON.stringify(new Date(details.birthdate)).replaceAll('"', '')};
        await updateDoc(userRef, newAccountInfo);
        dispatch({type: UPDATE_USER_INFO, payload: newAccountInfo});
    }
}

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

export const addGoal = (user, goalName, goalAmount) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", user.id);
        
        let newGoals = [...user.goals, {name: goalName, deposits: [], amount: 0, goal: goalAmount, status: "ongoing" }];

        await updateDoc(userRef, {goals: newGoals});
        dispatch({type: ADD_GOAL, payload: newGoals});
    }
}

export const updateAvatarAction = (user, picturePath) => {
    return async function(dispatch) {
        console.log("baba qga");
        const userRef = doc(db, "users", user.id);
        await updateDoc(userRef, {avatar: picturePath});
        dispatch({type: UPDATE_AVATAR, payload: picturePath});
    }
}

export const addToGoal = (user, goalName, amount, accountName) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", user.id);

        let newGoals = user.goals;
        const ind = newGoals.findIndex(goal => goal.name === goalName && goal.status === "ongoing");

        if(Number(newGoals[ind].amount) + Number(amount) >= Number(newGoals[ind].goal)) {
            const neededAmount = Number(newGoals[ind].goal) - Number(newGoals[ind].amount);
            if(Number(user.accounts.find(acc => acc.name === accountName).total) < neededAmount){
                dispatch(setSnackbar(true, "error", `You do not have such amount in ${accountName}`));
                return;
            }

            dispatch(addExpense(user, {
                amount: neededAmount.toString(),
                descr: `Deposit in ${goalName} goal`, 
                category: "Goal",
                date: JSON.stringify(new Date()).replaceAll('"', ''),
                account: accountName}
                )
            );

            dispatch(setSnackbar(true, "success", `You have achieved your ${goalName} goal. Congratulations!`));
            newGoals[ind].amount = newGoals[ind].goal;
            newGoals[ind].status = "completed";
            newGoals[ind] = {...newGoals[ind], date: JSON.stringify(new Date()).replaceAll('"', ''), deposits: [...newGoals[ind].deposits, {
                amount: neededAmount.toString(),
                date: JSON.stringify(new Date()).replaceAll('"', ''),
                account: accountName}
            ]};
        }
        else{
            if(Number(user.accounts.find(acc => acc.name === accountName).total) < Number(amount)){
                dispatch(setSnackbar(true, "error", `You do not have such amount in ${accountName}`));
                return;
            }
            dispatch(addExpense(user, {
                amount,
                descr: `Deposit in ${goalName} goal`, 
                category: "Goal",
                date: JSON.stringify(new Date()).replaceAll('"', ''),
                account: accountName}
                )
            );

            newGoals[ind] = {...newGoals[ind], amount: Number(newGoals[ind].amount) + Number(amount), deposits: [...newGoals[ind].deposits, {
                amount,
                date: JSON.stringify(new Date()).replaceAll('"', ''),
                account: accountName}
            ]};
        }

        await updateDoc(userRef, {goals: newGoals});
        dispatch({type: ADD_TO_GOAL, payload: newGoals});
    }
}

export const removeGoal = (user, goalName) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", user.id);

        let newGoals = user.goals;
        const ind = newGoals.findIndex(goal => goal.name === goalName && goal.status === "ongoing");
        newGoals[ind] = {...newGoals[ind], status: "aborted", date: JSON.stringify(new Date()).replaceAll('"', '')};
        newGoals[ind].deposits.forEach(dep => {
            dispatch(addIncome(user, {
                    amount: dep.amount,
                    descr: `Reverse deposit from aborting "${goalName}" goal`, 
                    category: "Reverse deposit",
                    date: JSON.stringify(new Date()).replaceAll('"', ''),
                    account: dep.account
                }
            ));
        });

        await updateDoc(userRef, {goals: newGoals});
        dispatch({type: REMOVE_GOAL, payload: newGoals});
    }
}

export const editIncomeColor = (user, color, categoryName) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", user.id);
        
        const ind = user.incomeCategories.findIndex(cat => cat.name === categoryName);
        let newIncomeCategories = user.incomeCategories;
        newIncomeCategories[ind].color = color;

        await updateDoc(userRef, {incomeCategories: newIncomeCategories});
        dispatch({type: EDIT_INCOME_CATEGORY_COLOR, payload: newIncomeCategories});
    }
}

export const editExpenseColor = (user, color, categoryName) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", user.id);
        
        const ind = user.expenseCategories.findIndex(cat => cat.name === categoryName);
        let newExpenseCategories = user.expenseCategories;
        newExpenseCategories[ind].color = color;

        await updateDoc(userRef, {expenseCategories: newExpenseCategories});
        dispatch({type: EDIT_EXPENSE_CATEGORY_COLOR, payload: newExpenseCategories});
    }
}

export const updateUserIncomeCategories = (user, name, color) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", user.id);
        const newIncomeCategories = {incomeCategories: [...user.incomeCategories, {name, color}]};
        await updateDoc(userRef, newIncomeCategories);
        dispatch({type: ADD_CATEGORY_INCOME, payload: {name, color}});
    }
} 

export const updateUserExpenseCategories = (user, name, color) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", user.id);
        const newExpenseCategories = {expenseCategories: [...user.expenseCategories, {name, color}]};
        await updateDoc(userRef, newExpenseCategories);
        dispatch({type: ADD_CATEGORY_EXPENSE, payload: {name, color}});
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

export const addAccountAction = (user, name, amount, accounts) => {
    const date = JSON.stringify(new Date()).replaceAll('"', '');
    const id = new Date().valueOf();

    return async function(dispatch) {
        const userRef = doc(db, "users", user.id);
        const newUser = {accounts: [...accounts,
            {
                name: name,
                incomes: [{category: "Initial Deposit", date: date, description: `Initial ${name} Deposit`, amount: amount, id}],
                expenses: [],
                total: amount
            }],
            transactions: [...user.transactions, {category: "Initial Deposit", date: date, description: `Initial ${name} Deposit`, amount: amount, account: name, type: "income", id}]
        };
        
        await updateDoc(userRef, newUser);
        dispatch(setSnackbar(true, "success", "Account added successfully!"));
        dispatch({type: UPDATE_ACCOUNTS, payload: newUser});

    }
} 

export const addExpense = (user, details) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", user.id);
        const newAccounts = user.accounts;
        let newTransactions = [];
        
        const id = new Date().valueOf();

        const accountIndex = newAccounts.findIndex(acc => acc.name === details.account);
        if(accountIndex === -1) {
            return;
        }

        if(Number(newAccounts[accountIndex].total) <  Number(details.amount)){
            dispatch(setSnackbar(true, "error", `You are trying to exceed your total in ${newAccounts[accountIndex].name}!`));
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
                account: newAccounts[accountIndex].name
            }];

            const newExpenses = [...newAccounts[accountIndex].expenses, {date: details.date,
                amount: details.amount,
                category: details.category,
                description: details.descr,
                id: id
            }];
            newAccounts[accountIndex] = {...newAccounts[accountIndex], expenses: newExpenses, total: (Number(newAccounts[accountIndex].total) - Number(details.amount)).toString()};
        }

        let amountExceeded = false;
        const newBudget = user.budgets;
        if(newBudget.some(budget => budget.category === details.category)){
            const ind = newBudget.findIndex(budget => budget.category === details.category);
            const prevBudget = {...newBudget[ind], amount: newBudget[ind].max};
            if(Number(prevBudget.amount) < getAmount(user, prevBudget.from, prevBudget.to, prevBudget.category)) {
                amountExceeded = true;
            }
            dispatch(addBudget(user, prevBudget));
        }

        await updateDoc(userRef, {transactions: newTransactions, accounts: newAccounts});
        if(!amountExceeded){
            dispatch(setSnackbar(true, "success", "Expense added successfully!"));
        }
        dispatch({type: ADD_EXPENSE, payload: {transactions: newTransactions, accounts: newAccounts}});
    }
} 

export const addIncome = (user, details) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", user.id);
        const newAccounts = user.accounts;
        let newTransactions = [];

        const id = new Date().valueOf();

        const accountIndex = newAccounts.findIndex(acc => acc.name === details.account);
        newAccounts[accountIndex].incomes.push({date: details.date,
                        amount: details.amount,
                        category: details.category,
                        description: details.descr,
                        id: id
        });

        newAccounts[accountIndex].total = (Number(newAccounts[accountIndex].total) + Number(details.amount)).toString();

        newTransactions = [...user.transactions, {
            type: "income",
            date: details.date,
            amount: details.amount,
            category: details.category,
            description: details.descr,
            id: id,
            account: newAccounts[accountIndex].name
        }];

        await updateDoc(userRef, {transactions: newTransactions, accounts: newAccounts});
        dispatch(setSnackbar(true, "success", "Income added successfully!"))
        dispatch({type: ADD_INCOME, payload: {transactions: newTransactions, accounts: newAccounts}});
    }
} 

export const addBudget = (user, details) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", user.id);
        const newBudgets = user.budgets;
        const amount = getAmount(user, details.from, details.to, details.category);
        // console.log(amount);
        //in case we already have the same budget category we re-write it
        if(newBudgets.some(budget => budget.category === details.category)){
            newBudgets[newBudgets.findIndex(budget => budget.category === details.category)] = {
                category: details.category,
                amount: amount,
                max: details.amount,
                from: details.from,
                to: details.to,
            }
        }
        else{
            newBudgets.push({
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

        await updateDoc(userRef, {budgets: newBudgets});
        dispatch({type: UPDATE_BUDGET, payload: newBudgets});

        //for demonstration purspose
        // let date = new Date();
        // date.setMinutes(date.getMinutes() + 1);
        // new CronJob(date,() => {
        //     dispatch(removeBudget(user, details.category));
        // }).start();

        //code for real removing budgets on time
        // new CronJob(new Date(details.to),() => {
        //     console.log("removed " + details.category + " budget");
        //     dispatch(removeBudget(user, details.category));
        // }).start();
    }
} 

export const editBudget = (user, details, prevCategory) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", user.id);
        const newBudgets = user.budgets;

        //in case we already have the same budget category we re-write it
        if(prevCategory !== details.category){
            dispatch(removeBudget(user, prevCategory));
        }

        dispatch(addBudget(user, details));
        
        await updateDoc(userRef, {budgets: newBudgets});
        dispatch({type: UPDATE_BUDGET, payload: newBudgets});
    }
} 

export const removeBudget = (user, category) => {
    return async function(dispatch) {
        const userRef = doc(db, "users", user.id);
        const newBudgets = user.budgets;

        const ind = newBudgets.findIndex(budget => budget.category === category);
        newBudgets.splice(ind, 1);
        
        await updateDoc(userRef, {budgets: newBudgets});
        dispatch({type: UPDATE_BUDGET, payload: newBudgets});
    }
} 