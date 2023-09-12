import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider'
import { useSelector } from 'react-redux';
import delay from '../util';

export const ChartFromFilter = () => {
    //from a date
}

export const ChartToFilter = () => {
    //to a date
}

export const ChartCategoryFilter = () => {
    //multiple categories possible
}

export const ChartRangeFilter = () => {
    //set a range of min-max expense/income

    const [filteredIncomes, setFilteredIncomes] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);

    function valuetext(value) {
        return `BGN ${value}`;
    }
    let incomes = useSelector(state => state.userData.user.incomes)
    let expenses = useSelector(state => state.userData.user.expenses)
    let amountsIncome = incomes.map( e => Number(e.amount));
    let amountsExpense = expenses.map(e => Number(e.amount));
    const maxI = Math.max(...amountsIncome);
    const maxE = Math.max(...amountsExpense);
    let max = Math.max(maxI, maxE);

    const [value, setValue] = useState([0, max]);
    //a step behing in console log? to be fixed
    const handleChange = (event, newValue) => {
        setValue(newValue);
        let tempArr = incomes.filter(obj => obj.amount >= newValue[0] && obj.amount <= newValue[1]);
        console.log(newValue[0], newValue[1])
        setFilteredIncomes([...tempArr])
        console.log(filteredIncomes);
    }
    const delayedChange = delay(handleChange, 500);
    return (
        <Box sx={{ width: 300 }}>
            <Slider
                getAriaLabel={() => 'Amount range'}
                value={value}
                onChange={delayedChange}
                valueLabelDisplay="auto"
                max={max}
                getAriaValueText={valuetext}
            />
        </Box>
    );
}