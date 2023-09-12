import styles from "./styles/pages.module.css";
import { useSelector } from 'react-redux';
import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styled from 'styled-components';

export default function HistoryPage() {

    const accounts = useSelector(state => state.userData.user.accounts);
    const allCategories = accounts.map(account => account.categories);
    const allIncomes = accounts.map(account => account.incomes);
    const allExpenses = accounts.map(account => account.expenses);
    const allBudgets = accounts.map(account => account.budgets);
    const allGoals = accounts.map(account => account.goals);
    const allTransactions = allIncomes.concat(allExpenses, allBudgets, allGoals);

    const getTime = (timeStamp) => {
        const dateTime = JSON.stringify(timeStamp);
        let dateArr = dateTime.split("T");
        let date = dateArr[0].slice(1);
        let time = dateArr[1].slice(0, 5);
        return `${date} / ${time}`;
    }
    const handleChange = () => {

    }
    const handleDelete = () => {

    }
    return (

        <div className={styles.page}>
            <h1>HistoryPage</h1>
            <table>

                <tr>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Date/Time</th>
                </tr>
                {allTransactions.map(transaction => {
                    return transaction.length > 0 ? transaction.map(item => {
                        return (
                            <tr key={item.date}>
                                <td>{item.amount}</td>
                                <td>{item.category.type}</td>
                                <td>{item.category.name}</td>
                                <td><StyledInput value={item.descr} onChange={handleChange} /></td>
                                <td>{getTime(item.date)}</td>
                                <td><DeleteForeverIcon onClick={() => handleDelete()}/></td>
                            </tr>
                        )
                    }) : null
                })}
            </table>
        </div >
    );
}


const StyledInput = styled.input`
    border : none;
    outline : none;
    background-color: transparent;
    width: 400px;
`