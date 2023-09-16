import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { StyledPage, StyledFilters, StyledButton, Column, Row, Heading } from './HistoryPage';
import { PieChart } from './charts/PieChart';
import { BarChart } from "./charts/BarChart";
import { LineChart } from "./charts/LineChart";
import GetMaxAmount from './filters/GetMaxAmount';
import { AccountFilter } from "./filters/AccountFilter";
import { AmountRangeFilter } from './filters/AmountRangeFilter';
import { DateRangeFilter } from './filters/DateRangeFilter';

export default function ReportsPage() {
    const max = GetMaxAmount();
    const [transactions, setTransactions] = useState([]);
    const [selectedAccounts, setSelectedAccounts] = useState([]);
    const [amountRange, setAmountRange] = useState([0, max]);
    const [dateRange, setDateRange] = useState([null, null]);
    const user = useSelector(state => state.userData.user);
   
   const filterTransactions = (accounts, amount, date) => {
        let filtered = user.transactions.filter(transaction => {
                return accounts.length ? accounts.indexOf(transaction.account) > -1 : transaction;
         }).filter(transaction => {
                let current = new Date(transaction.date).getTime();
                if(date[0]) {
                    let start = date[0].getTime(); 
                    let end = (date[1] || new Date()).getTime();
                    return (current >= start && current <= end);  
                } else return transaction;    
         }).filter(transaction => {
                return (Number(transaction.amount) >= amount[0]) && (Number(transaction.amount) <= amount[1]);
         })
        setTransactions(filtered)
   }

   const clearFilters = () => {
    setSelectedAccounts([]);
    setAmountRange([0, max])
    setDateRange([null, null])
    filterTransactions(selectedAccounts, amountRange, dateRange)
   }
  
    return (
        <StyledPage>
            <Heading>Reports & Analytics</Heading>
            <StyledFilters>
                    <FiltersRow>
                        
                    <AccountFilter value={selectedAccounts} onChange={(e) => { setSelectedAccounts(e.target.value); filterTransactions(e.target.value, amountRange, dateRange)} } />
                    <AmountRangeFilter value={amountRange} max={max} onChange={ (e) => { setAmountRange(e.target.value); filterTransactions(selectedAccounts, e.target.value, dateRange) }} />
                    <DateRangeFilter value={dateRange} onChange={ (e) => { setDateRange(e); filterTransactions(selectedAccounts, amountRange, e)} } />
                    <StyledButton onClick={clearFilters}>Clear Filters</StyledButton>
                        
                    </FiltersRow>

            </StyledFilters>

                <PieCharts>
                <Column>
                
                    <h6>Incomes</h6>
                    <PieChart purpose="Incomes" data={transactions.filter(item => item.type == 'income')} />
                </Column>
                <Column>
                    <h6>Expenses</h6>
                    <PieChart puprose="Expenses" data={transactions.filter(item => item.type == 'expense')} />
                </Column>
            </PieCharts>

            <LineChart data={transactions} />
            <BarChart data={transactions} />

        </StyledPage>
    );
}

const PieCharts = styled.div`
    width: 100%;
    display: flex;
    flex-flow : row wrap;
    justify-content: center;

`
const FiltersRow = styled(Row)`
   flex-direction: column;
   align-items : center;
`