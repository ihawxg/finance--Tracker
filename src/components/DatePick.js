import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import React from "react";

export default function DatePick(){
    const [value, setValue] = React.useState(new Date());

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
                disableFuture
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