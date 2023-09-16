import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components';

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
   
    const incomeCategories = useSelector(state => state.userData.user.incomeCategories)
    const expenseCategories = useSelector(state => state.userData.user.expenseCategories);
    const allCategories = [...incomeCategories, ...expenseCategories];
   
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedCategory(
            typeof value === 'string' ? value.split(',') : value,
        );
        props.onChange(event);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }} label="Categories" color="secondary">
                <InputLabel id="demo-multiple-checkbox-label">Categories</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={props.value}
                    onChange={handleChange}
                    input={<OutlinedInput label="Category" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    disabled={props.disabled}
                >
                    {allCategories.map((category) => (
                        <MenuItem key={category.name} value={category.name}>
                            <Checkbox  color="secondary" checked={selectedCategory.indexOf(category.name) > -1} />
                            <ListItemText primary={category.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}