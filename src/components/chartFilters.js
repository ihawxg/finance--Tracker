import React, { useState, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider'
import { useDispatch, useSelector } from 'react-redux';
import delay from './../util';
import { applyAccountFilter, applyCategoryFilter, applyFromDateFilter, applyRangeFilter, applyToDateFilter, applyTypeFilter } from '../redux/actions/filtersActions';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import BasicDatePicker from './DatePicker';
import styled from 'styled-components';
export const DateRangeFilter = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const dispatch = useDispatch();
    return (
        <Pickers>
            <BasicDatePicker label="From... " value={startDate} selected={startDate} 
                onChange={date => {
                    setStartDate(date)
                    dispatch(applyFromDateFilter(date))
                }} />
            <BasicDatePicker label="To..." value={endDate} selected={endDate} 
                onChange={date => {
                    setEndDate(date)
                    dispatch(applyToDateFilter(date))
                }} />
        </Pickers>
    )
}
export const AccountFilter = () => {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const [selectedAccount, setSelectedAccount] = useState([]);
    const dispatch = useDispatch();
    const accounts = useSelector(state => state.userData.user.accounts);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedAccount(
            typeof value === 'string' ? value.split(',') : value,
        );
        let result = typeof value === 'string' ? value.split(',') : value;
        dispatch(applyAccountFilter(result));
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Account</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={selectedAccount}
                    onChange={handleChange}
                    input={<OutlinedInput label="Account" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {accounts.map((acc) => (
                        <MenuItem key={acc.name} value={acc.name}>
                            <Checkbox checked={selectedAccount.indexOf(acc.name) > -1} />
                            <ListItemText primary={acc.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );

}
export const TypeFilter = () => {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const [selectedType, setSelectedType] = useState([]);
    const dispatch = useDispatch();
   
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedType(
            typeof value === 'string' ? value.split(',') : value,
        );
        let result = typeof value === 'string' ? value.split(',') : value;
        dispatch(applyTypeFilter(result))
        
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Type</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={selectedType}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    
                    <MenuItem key="Income" value="Income">
                        <Checkbox checked={selectedType.indexOf("Income") > -1} />
                        <ListItemText primary="Income" />
                    </MenuItem>
                    <MenuItem key="Expense" value="Expense">
                        <Checkbox checked={selectedType.indexOf("Expense") > -1} />
                        <ListItemText primary="Expense" />
                    </MenuItem>
                </Select>
            </FormControl>
        </div>
    );
} 
export const CategoryFilter = (props) => {
    //multiple categories possible
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const [selectedCategory, setSelectedCategory] = useState([]);
    const dispatch = useDispatch();
    const incomeCategories = useSelector(state => state.userData.user.incomeCategories)
    const expenseCategories = useSelector(state => state.userData.user.expenseCategories);
    const categoriesFilter = useSelector(state => state.filters.category);
    const allCategories = [...incomeCategories, ...expenseCategories];
    const categories = useSelector(state => state.userData.user.accounts).map(acc => acc.category)
   
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedCategory(
            typeof value === 'string' ? value.split(',') : value,
        );
        let result = typeof value === 'string' ? value.split(',') : value;
        dispatch(applyCategoryFilter(result))
        
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Categories</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={selectedCategory}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    disabled={props.disabled}
                >
                    {allCategories.map((category) => (
                        <MenuItem key={category} value={category}>
                            <Checkbox checked={selectedCategory.indexOf(category) > -1} />
                            <ListItemText primary={category} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export const RangeFilter = () => {
    //set a range of min-max expense/income
    const dispatch = useDispatch();
   
    function valuetext(value) {
        return `BGN ${value}`;
    }
    let incomes = useSelector(state => state.userData.user.accounts.map(account => account.incomes));
    let expenses = useSelector(state => state.userData.user.accounts.map(account => account.expenses));
    let amountsIncome = incomes.flat().map(e => Number(e.amount));
    let amountsExpense = expenses.flat().map(e => Number(e.amount));
    const maxI = Math.max(...amountsIncome);
    const maxE = Math.max(...amountsExpense);
    let max = Math.max(maxI, maxE);
    useEffect(() => {
         dispatch(applyRangeFilter(0, max))
    }, [max]);
   
    const [value, setValue] = useState([0, max]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        dispatch(applyRangeFilter(newValue[0], newValue[1]));
    }
    return (
        <Box sx={{ width: 300 }}>
            <Slider
                getAriaLabel={() => 'Amount range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                max={max}
                getAriaValueText={valuetext}
                valueLabelDisplay="on"
            />
        </Box>
    );
}

const Pickers = styled.div`
    display: flex;
    flex-flow : column wrap;
    gap: 8px;
`