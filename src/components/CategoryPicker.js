import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';

export default function SelectVariants(props) {
    const accounts = useSelector(state => state.userData.user.accounts);
    const selectedAccount = useSelector(state => state.userData.user.accounts.find(e => e.name === props.list))
    return (
        <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">{props.name == "account" ? "Account" : "Category"}</InputLabel>
                <Select
                    disabled={props.disabled}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={props.value}
                    onChange={props.onChange}
                    label={props.name == "account" ? "Account" : "Category"}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {props.name == "account" ?
                        accounts.map(account => (<MenuItem key={account.name} value={account.name}>{account.name}</MenuItem>)) :
                        selectedAccount ? selectedAccount.categories.map(category => (<MenuItem key={category} value={category}>{category}</MenuItem>)) :
                            null
                    }
                </Select>
            </FormControl>
        </div>
    );
}