import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import React from 'react';

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

export default function SelectInput(props) {
  const [accountNames, setAccountNames] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAccountNames(
      typeof value === 'string' ? value.split(',') : value
    );
    props.handleChange(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multiple-checkbox">Accounts</InputLabel>
        <Select
          labelId="multiple-checkbox"
          id="multiple-checkbox"
          multiple
          value={accountNames}
          onChange={handleChange}
          input={<OutlinedInput label="Accounts" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {props.accounts.map((acc) => (
            <MenuItem key={acc.name} value={acc.name}>
              <Checkbox checked={accountNames.indexOf(acc.name) > -1} />
              <ListItemText primary={acc.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}