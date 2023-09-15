import styles from "./styles/pages.module.css"
import styled from 'styled-components';
import { StyledPage, StyledFilters, StyledButton, Column, Row } from './HistoryPage';
import { RangeFilter, CategoryFilter, AccountFilter, DateRangeFilter } from "./chartFilters";
import { clearFilters } from "../redux/actions/filtersActions";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { PieChart } from './charts/PieChart';
import { BarChart } from "./charts/BarChart";
import { LineChart } from "./charts/LineChart";


export default function ReportsPage() {

    const dispatch = useDispatch();
    const [isFiltered, setIsFiltered] = useState(false);
    const [selectedAccounts, setSelectedAccounts] = useState([]);
    const userAccounts = useSelector(state => state.userData.user.accounts);
    const allIncomes = userAccounts.map(account => account.incomes).flat();
    const allExpenses = userAccounts.map(account => account.expenses).flat();
    const allTransactions = [...allIncomes, ...allExpenses];
    const rangeFilter = useSelector(state => state.filters.range);
    const startDateFilter = useSelector(state => state.filters.from_date);
    const endDateFilter = useSelector(state => state.filters.to_date);
    const categoryFiltered = useSelector(state => state.filters.category);
    const accountFilter = useSelector(state => state.filters.account);

    useEffect(() => {
        let selected = userAccounts.filter(acc => accountFilter.indexOf(acc.name) > -1)
        setSelectedAccounts([...selected])
    }, [accountFilter])
    
    // const categoryFilter = categoryFiltered.map(e => e.toLowerCase());

    let filteredIncomesArr = selectedAccounts.map(acc => acc.incomes).flat();
    let filteredExpensesArr = selectedAccounts.map(acc => acc.expenses).flat();
    const initialBalanceIncomes = (selectedAccounts.length > 0 ? filteredIncomesArr : allIncomes).filter(e => (new Date(e.date)) < (new Date(startDateFilter ? startDateFilter : new Date())))
    const initialBalanceExpenses = (selectedAccounts.length > 0 ? filteredExpensesArr : allExpenses).filter(e => (new Date(e.date).getTime()) < (new Date(startDateFilter ? startDateFilter : new Date())))
    const initialBalance = initialBalanceIncomes.reduce((acc, curr) => acc + Number(curr.amount), 0) - initialBalanceExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0)
    // const filtered = filterAll(selectedAccounts.length > 0 ? filteredSelected : allTransactions).filter(e => categoryFilter.indexOf(e.category.toLowerCase()) > -1)    

    const filteredIncomes = filterAll(selectedAccounts.length > 0 ? filteredIncomesArr : allIncomes)
    const filteredExpenses = filterAll(selectedAccounts.length > 0 ? filteredExpensesArr : allExpenses)
    //filter by amount and time range 
    function filterAll(array) {
        return array
            .filter(e => (Number(e.amount) >= rangeFilter[0] && Number(e.amount) <= rangeFilter[1]))
            .filter(item => {
                if (startDateFilter) {
                    const start = (new Date(startDateFilter)).getTime()
                    const end = (new Date(endDateFilter)).getTime()
                    const current = (new Date(item.date)).getTime()
                    if (start && end) return current >= start && current <= end;
                    else return current >= start && current <= (new Date()).getTime();
                } else return item;
            });
    }

    return (
        <StyledPage>
            <h1>Reports</h1>
            <StyledFilters>
                <h6>Set amount range: </h6>
                <RangeFilter />

                <Row>
                    <Column>
                        <CategoryFilter disabled={true} />
                        <AccountFilter />
                        <StyledButton onClick={() => {
                            setIsFiltered(true)
                        }}>Filter List
                        </StyledButton>
                    </Column>
                    <Column >
                        <DateRangeFilter />
                        <StyledButton onClick={() => {
                            setIsFiltered(false)
                            dispatch(clearFilters)
                            
                        }}>Clear Filters
                        </StyledButton>
                    </Column>
                </Row>
            </StyledFilters>
            <PieCharts>
                <Column>
                    <h6>Incomes</h6>
                    <PieChart purpose="Incomes" data={filteredIncomes} />
                </Column>
                <Column>
                    <h6>Expenses</h6>
                    <PieChart puprose="Expenses" data={filteredExpenses} />
                </Column>
            </PieCharts>

            <LineChart data={[filteredIncomes, filteredExpenses, (startDateFilter ? initialBalance : 0)]} />
            <BarChart data={[filteredIncomes, filteredExpenses]} />

        </StyledPage>
    );
}

const PieCharts = styled.div`
    width: 100%;
    display: flex;
    flex-flow : row wrap;
    justify-content: space-evenly;

`