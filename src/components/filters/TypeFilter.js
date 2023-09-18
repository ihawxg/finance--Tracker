import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

export const TypeFilter = (props) => {
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
   
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedType(
            typeof value === 'string' ? value.split(',') : value,
        );     
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label" color="secondary">Type</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={props.value}
                    onChange={(e) => { handleChange(e); props.onChange(e) }}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    color="secondary"
                >
                    
                    <MenuItem key="income" value="income">
                        <Checkbox color="secondary" checked={selectedType.indexOf("income") > -1} />
                        <ListItemText primary="income" />
                    </MenuItem>
                    <MenuItem key="expense" value="expense">
                        <Checkbox  color="secondary" checked={selectedType.indexOf("expense") > -1} />
                        <ListItemText primary="expense" />
                    </MenuItem>
                </Select>
            </FormControl>
        </div>
    );
} 