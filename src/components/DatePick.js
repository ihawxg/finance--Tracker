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
                disableFuture={props.disabled}
            
                label={props.label}
                openTo="year"
                views={['year', 'month', 'day']}
                value={props.value ? props.value : value}
                onChange={(newValue) => {
                    const data = JSON.stringify(newValue["_d"]).slice(1,11);
                    setValue(newValue);
                    props.isFromTo ? props.handleDateChange(data) : props.handleDateChange(prev => ({...prev, birthdate: data}));
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}