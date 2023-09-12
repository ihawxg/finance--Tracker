import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';

export default function SelectVariants(props) {
  const categories = useSelector(state => state.userData.user.categories);
  const accounts = useSelector(state => state.userData.user.accounts);

  return (
      <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">{props.name == "account" ? "Account" : "Category"}</InputLabel>
          <Select
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
                accounts.map(account => (<MenuItem key={account} value={account}>{account}</MenuItem>)) :
                categories.map(category => (<MenuItem key={category} value={category}>{category}</MenuItem>))  }
          </Select>
        </FormControl>
      </div>
  );
}