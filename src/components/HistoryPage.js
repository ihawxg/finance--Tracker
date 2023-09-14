import AddButtons from "./AddButtons";
import styles from "./styles/pages.module.css"
import { useSelector } from "react-redux";
import SelectInput from "./SelectInput";
import React from "react";

export default function HistoryPage(){
    const user = useSelector(state => state.userData.user);
    const [currentAccounts, setCurrenctAccount] = React.useState([]); 

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

    return (
        <div className={styles.page}>
         <h1>HistoryPage</h1>
         <AddButtons operation="edit"/>

         <SelectInput handleChange={handleChange} accounts={user.accounts}/>
         <div>
             {accounts.map(acc => {
                return acc.expenses.map(exp => {
                     return (
                        <>
                            <h1>Expense: {exp.description} {exp.amount}</h1>
                        </>
                     ); 
                 })
                 
             })}

            {accounts.map(acc => {
                return acc.incomes.map(inc => {
                    return (
                        <>
                            <h1>Incomes: {inc.description} {inc.amount}</h1>
                            <button> Remove </button>
                        </>
                    );
                })
             })}

         </div>
        </div>
    );
}