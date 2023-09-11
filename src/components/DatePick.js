import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import React from "react";

export default function DatePick(props){
    const [value, setValue] = React.useState(new Date());
    const isDisabled = (typeof props.disabled != "undefined") ? props.disabled : false;
    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
                disableFuture
                disabled={isDisabled}
                label="Birthdate"
                openTo="year"
                views={['year', 'month', 'day']}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}