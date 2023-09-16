import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';

export const DateRangeFilter = (props) => {
  const [value, setValue] = React.useState([null, null]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        color="secondary"
        startText="Start date"
        endText="End date"
        value={props.value}
        maxDate={new Date()}
        onChange={(newValue) => {
          setValue(newValue);
          props.onChange(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps}  color="secondary"  />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} color="secondary"/>
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}