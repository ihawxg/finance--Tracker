import styles from "./styles/pages.module.css";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styled from 'styled-components';
import CheckIcon from '@mui/icons-material/Check';
import { ChartRangeFilter, ChartCategoryFilter, ChartAccountFilter, ChartDateRangeFilter } from "./chartFilters";

export default function HistoryPage() {

    const accounts = useSelector(state => state.userData.user.accounts);
   

    const allIncomes = accounts.map(account => account.incomes);
    const allExpenses = accounts.map(account => account.expenses);
    // const allBudgets = accounts.map(account => account.budgets);
    // const allGoals = accounts.map(account => account.goals);

    const allTransactions = allIncomes.concat(allExpenses).flat();
    console.log(allTransactions)
    const rangeFilter = useSelector(state => state.filters.range);
    const startDateFilter = useSelector(state => state.filters.from_date);
    const endDateFilter = useSelector(state => state.filters.to_date);
    const categoryFilter = useSelector(state => state.filters.category[0]);
    const accountFilter = useSelector(state => state.filters.account);

    const filtered = allTransactions.filter(e => Number(e.amount) >= rangeFilter[0] && Number(e.amount) <= rangeFilter[1])
        .filter(e => categoryFilter.indexOf(e.category) > -1)
        .filter(e => accountFilter.indexOf(e.account) > -1)
        .filter(item => {
            let date = new Date(item.date);
            return date >= startDateFilter && date <= endDateFilter
        });
    

    const getTime = (timeStamp) => {
        const dateTime = JSON.stringify(timeStamp);
        const dateArr = dateTime.split("T");
        const date = dateArr[0].slice(1);
        const time = dateArr[1].slice(0, 5);
        return `${date} / ${time}`;
    }
    const [description, setDescription] = useState("");
    const [isFiltered, setIsFiltered] = useState(false);
    const confirmChange = (date, descr) => {
        // dispatch(updateItem(description))
        console.log(date, descr)
        setDescription("")
    }
    const handleDelete = (ident) => {
        // dispatch(deleteItem(ident))
        console.log(ident)
    }
    return (

        <div className={styles.page}>
            <ChartRangeFilter/>
            <ChartCategoryFilter />
            <ChartAccountFilter/>
            <ChartDateRangeFilter />
            <button onClick={() => setIsFiltered(true)}>Filter</button>
            <button onClick={() => setIsFiltered(false)}>ClearFilter</button>
            <h1>HistoryPage</h1>
            <table>
            <thead>
                <tr>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Date/Time</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {(isFiltered ? filtered : allTransactions).map((item,i) => {
                        return (
                            <tr key={i}>
                                <td>{item.amount}</td>
                                <td>{item.category.type}</td>
                                <td>{item.category.name}</td>
                                <td><StyledInput 
                                        name="description"
                                        defaultValue={item.descr} 
                                        onKeyDown={(e) => {
                                            if(e.key === 'Enter') {
                                                confirmChange(item.date, description)
                                            }
                                        }}
                                        onChange={(e) => setDescription(e.target.value)} />
                                </td>
                                <td>{getTime(item.date)}</td>
                                <td><DeleteForeverIcon onClick={() => console.log(item.date)}/></td>
                            </tr>
                        )            
                    }) 
                    }
                     </tbody>    
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