import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux';

export const AccountFilter = (props) => {
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
    const accounts = useSelector(state => state.userData.user.accounts);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedAccount(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
 
    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }} label="Outlined secondary" color="secondary" >
                <InputLabel id="demo-multiple-checkbox-label">Account</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={props.value}
                    onChange={(e) => {
                        handleChange(e);
                        props.onChange(e);   
                    }}
                    input={<OutlinedInput label="Account" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {accounts.map((acc) => (
                        <MenuItem key={acc.name} value={acc.name}>
                            <Checkbox  color="secondary" checked={props.value.indexOf(acc.name) > -1} />
                            <ListItemText primary={acc.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );

}