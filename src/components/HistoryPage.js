import AddButtons from "./AddButtons";
import styles from "./styles/pages.module.css"
import { useSelector, useDispatch } from "react-redux";
import SelectInput from "./SelectInput";
import React from "react";
import FormDialog from "./FormDialog";
import { removeIncomeExpense } from "../redux/actions/userActions";


export default function HistoryPage(){
    const user = useSelector(state => state.userData.user);
    const [currentAccounts, setCurrenctAccount] = React.useState([]); 

    const dispatch = useDispatch();

    const handleChange = (accountNames) => {
        setCurrenctAccount(accountNames); 
    }

    let accounts = [];
    currentAccounts.forEach(accName => {
        user.accounts.forEach(acc => {
            if(acc.name === accName){
                accounts.push(acc);
            }
        });
    })

    const handleClick = (id, accountName, isExpense) => {
        dispatch(removeIncomeExpense(user, id, accountName, isExpense));
    }

    return (
        <div className={styles.page}>
         <h1>HistoryPage</h1>
         <AddButtons/>

         <SelectInput handleChange={handleChange} accounts={user.accounts}/>
         <div>
             {accounts.map(acc => {
                return acc.expenses.map(exp => {
                     return (
                        <>
                            <h1>Expense: {exp.description} {exp.amount}</h1>
                            <FormDialog operation="edit" value="Expense" prevAccountName={acc.name} expenseID={exp.id}/>
                            <button onClick={() => handleClick(exp.id, acc.name, true)}> Remove </button>
                        </>
                     ); 
                 })
                 
             })}

            {accounts.map(acc => {
                return acc.incomes.map(inc => {
                    return (
                        <>
                            <h1>Incomes: {inc.description} {inc.amount}</h1>
                            <FormDialog operation="edit" value="Income" prevAccountName={acc.name} incomeID={inc.id}/>
                            <button onClick={() => handleClick(inc.id, acc.name, false)}> Remove </button>
                        </>
                    );
                })
             })}

         </div>
        </div>
    );
}