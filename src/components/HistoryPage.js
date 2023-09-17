import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import styled from 'styled-components';
import GetMaxAmount from "./filters/GetMaxAmount";
import { AccountFilter } from "./filters/AccountFilter";
import { AmountRangeFilter } from './filters/AmountRangeFilter';
import { CategoryFilter } from './filters/CategoryFilter';
import { DateRangeFilter } from './filters/DateRangeFilter';
import { TypeFilter } from './filters/TypeFilter';
import DataTable from "./Table";


export default function HistoryPage() {
    const max = GetMaxAmount();

    const [transactions, setTransactions] = useState([]);
    const [selectedAccounts, setSelectedAccounts] = useState([]);
    const [selectedType, setSelectedType] = useState([]);
    const [amountRange, setAmountRange] = useState([0, max]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [dateRange, setDateRange] = useState([null, null]);
    const user = useSelector(state => state.userData.user)

    const filterTransactions = (accounts, incomeExpense, amount, categories, date) => {
        let filtered = user.transactions.filter(transaction => {
            return accounts.length ? accounts.indexOf(transaction.account) > -1 : transaction;
        }).filter(transaction => {
            if ((incomeExpense.length === 0) || (incomeExpense.indexOf(transaction.type) > -1)) return transaction;
        }).filter(transaction => {
            let current = new Date(transaction.date).getTime();
            if (date[0]) {
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
    return (

        <StyledPage>

            <StyledFilters>

                <AccountFilter value={selectedAccounts} onChange={(e) => { setSelectedAccounts(e.target.value); filterTransactions(e.target.value, selectedType, amountRange, selectedCategories, dateRange) }} />
                <TypeFilter value={selectedType} onChange={(e) => { setSelectedType(e.target.value); filterTransactions(selectedAccounts, e.target.value, amountRange, selectedCategories, dateRange) }} />
                <CategoryFilter value={selectedCategories} disabled={false} onChange={(e) => { setSelectedCategories(e.target.value); filterTransactions(selectedAccounts, selectedType, amountRange, e.target.value, dateRange) }} />
                <DateRangeFilter disabled={true} value={dateRange} onChange={(e) => { setDateRange(e); filterTransactions(selectedAccounts, selectedType, amountRange, selectedCategories, e) }} />
                <AmountRangeFilter value={amountRange} max={max} onChange={(e) => { setAmountRange(e.target.value); filterTransactions(selectedAccounts, selectedType, e.target.value, selectedCategories, dateRange) }} />
                <StyledButton onClick={clearFilters}>Clear Filters</StyledButton>

            </StyledFilters>
            <Heading>Transaction history</Heading>
            <DataTable data={transactions} />

        </StyledPage>

    );
}

export const StyledPage = styled.div`
    width: 65%;
    margin: 10px auto 30px ;
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
    gap: 10px;
`
export const StyledFilters = styled.div`
    display: flex;
    flex-flow : row wrap;
    justify-content: center;
    gap:10px;
    align-items: center;    
`
export const StyledButton = styled.button`
    width: 100%;
    margin: 10px;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 10px 0;
    color:purple;
    background-color : white;
    border: 1px solid purple;
    &:hover {
        background-color : rgba(68, 18, 96, .1);
    }
`
export const Heading = styled.h4`
    color: rgb(68, 18, 96);
    padding: 10px;
    border-bottom: 1px solid rgba(68, 18, 96, .6);
    text-transform : uppercase;
    letter-spacing : 1px;
    margin-bottom: 20px;
`