import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function BasicDatePicker(props) {

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label={props.label}
                value={props.value}
                onChange={date => props.onChange(date)}
                renderInput={(params) => <TextField {...params} />}
                maxDate={new Date()}
            />
        </LocalizationProvider>
    );
}