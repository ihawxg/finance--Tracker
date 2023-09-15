import styles from "./styles/pages.module.css";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styled from 'styled-components';
import CheckIcon from '@mui/icons-material/Check';
import GetMaxAmount from "./filters/GetMaxAmount";
import { AccountFilter } from "./filters/AccountFilter";
import { AmountRangeFilter } from './filters/AmountRangeFilter';
import { CategoryFilter } from './filters/CategoryFilter';
import { DateRangeFilter } from './filters/DateRangeFilter';
import { TypeFilter } from './filters/TypeFilter';

export default function HistoryPage() {
    const max = GetMaxAmount();
    const userAccounts = useSelector(state => state.userData.user.accounts);

    const [transactions, setTransactions] = useState([]);
    const [selectedAccounts, setSelectedAccounts] = useState([]);
     const [selectedType, setSelectedType] = useState([]);
    const [amountRange, setAmountRange] = useState([0, max]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [dateRange, setDateRange] = useState([null, null]);
   
    const [description, setDescription] = useState("");
    const user = useSelector(state => state.userData.user)

   const filterTransactions = (accounts, incomeExpense, amount, categories, date) => {
        let filtered = user.transactions.filter(transaction => {
                return accounts.length ? accounts.indexOf(transaction.account) > -1 : transaction;
         }).filter(transaction => {
                if((incomeExpense.length === 0) || (incomeExpense.indexOf(transaction.type) > -1)) return transaction;
         }).filter(transaction => {
                let current = new Date(JSON.parse(transaction.date)).getTime();
                if(date[0]) {
                    let start = date[0].getTime(); 
                    let end = (date[1] || new Date()).getTime();
                    return (current >= start && current <= end);  
                } else return transaction;    
         }).filter(transaction => {
                return (Number(transaction.amount) >= amount[0]) && (Number(transaction.amount) <= amount[1]);
         }).filter(transaction => {
                return categories.length ? categories.indexOf(transaction.category) > -1 : transaction;
         })
        setTransactions(filtered)
   }
   const clearFilters = () => {
    setSelectedAccounts([]);
    setSelectedType([])
    setAmountRange([0, max])
    setSelectedCategories([])
    setDateRange([null, null])
    filterTransactions(selectedAccounts, selectedType, amountRange, selectedCategories, dateRange)
   }
    const confirmChange = (id, descr) => {
        // dispatch(updateItem(description))
        setDescription("")
    }
    
    return (
        <StyledPage>
            <h2>Transaction history</h2>
            <div>
                <StyledFilters>
                    <Row>
                        
                    <AccountFilter value={selectedAccounts} onChange={(e) => { setSelectedAccounts(e.target.value); filterTransactions(e.target.value, selectedType, amountRange, selectedCategories, dateRange)} } />
                    <TypeFilter value={selectedType} onChange={(e) => { setSelectedType(e.target.value); filterTransactions(selectedAccounts, e.target.value, amountRange, selectedCategories, dateRange)} }/>    
                    <AmountRangeFilter value={amountRange} max={max} onChange={ (e) => { setAmountRange(e.target.value); filterTransactions(selectedAccounts, selectedType, e.target.value, selectedCategories, dateRange) }} />
                    <CategoryFilter value={selectedCategories} disabled={false} onChange={(e) => { setSelectedCategories(e.target.value); filterTransactions(selectedAccounts, selectedType, amountRange, e.target.value, dateRange)} } />
                    <DateRangeFilter value={dateRange} onChange={ (e) => { setDateRange(e); filterTransactions(selectedAccounts, selectedType, amountRange, selectedCategories, e)} } />
                    <StyledButton onClick={clearFilters}>Clear Filters
                    </StyledButton>
                        
                    </Row>

                </StyledFilters>

                <table>
                    <thead>
                        <tr key="thead">
                            <th key='amount'>Amount</th>
                            <th key='type'>Type</th>
                            <th key='category'>Category</th>
                            <th key='descr'>Description</th>
                            <th key='date'>Date/Time</th>
                        </tr>
                    </thead>
                    <tbody>
        
                    {
                        transactions.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td key={item.amount+item.id}>{item.amount}</td>
                                    <td key={item.id+item.type}>{item.type}</td>
                                    <td key={item.category+item.id}>{item.category}</td>
                                    <td key={item.description+item.id}><StyledInput
                                        name="description"
                                        defaultValue={item.description}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                confirmChange(item.date, description)
                                            }
                                        }}
                                        onChange={(e) => setDescription(e.target.value)} />
                                    </td>
                                    <td key={item.date+item.id}>{item.date}</td>
                                </tr>
                            )
                        })
                        }

                    </tbody>
                </table>
            </div >
        </StyledPage>
    );
}
export const StyledPage = styled.div`
    width: 70%;
    margin: -60px auto 30px ;
    text-align: center;
`
export const Column = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
`
export const Row = styled.div`
    display: flex;
    flex-flow : row wrap;
    justify-content : space-between;
    gap: 20px;
`
export const StyledFilters = styled.div`
    margin-top: 40px;
    display: flex;
    flex-flow : column wrap;
    justify-content: space-evenely;
    align-items: center;    
`

export const StyledButton = styled.button`
    width: 100%;
    margin: 10px;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 10px 0;
    color: #0267CD;
    background-color : white;
    border: 1px solid #0267CD;
    &:hover {
        background-color : #0268cd10;
    }
`

const StyledInput = styled.input`
    border : none;
    outline : none;
    background-color: transparent;
    width: 400px;

`
