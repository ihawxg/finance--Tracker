import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';

export default function SelectVariants(props) {
  const accounts = useSelector(state => state.userData.user.accounts);
  const user = useSelector(state => state.userData.user);
  const categories = props.type === "Income" ? user.incomeCategories : user.expenseCategories;

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">{props.name === "account" ? "Account" : "Category"}</InputLabel>
        <Select
          disabled={props.disabled}
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={props.value}
          onChange={props.onChange}
          label={props.name === "account" ? "Account" : "Category"}
        >
          {
            props.name === "account" ? 
            accounts.map(account => (<MenuItem key={account.name} value={account.name}>{account.name}</MenuItem>)) :
            categories.map(category => (<MenuItem key={category} value={category}>{category}</MenuItem>))
          }
        </Select>
      </FormControl>
    </div>
  );
}