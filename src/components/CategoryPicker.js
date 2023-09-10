import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox() {
  const categories = ['food', 'rent', 'entertainment', 'clothes', 'restaurants', 'accomodation', 'studies/courses', 'gifts', 'investments', 'cosmetics', 'travel' , 'other' ];  
  return (
    <Autocomplete
      disablePortal
      disableClearable
      autoComplete
      id="combo-box-demo"
      options={categories}
      sx={{ width: 240 }}
      renderInput={(params) => <TextField {...params} label="Category" />}
    />
  );
}