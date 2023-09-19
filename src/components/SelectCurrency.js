import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { currencies } from "../utils/consts";
import React from "react";
import { uuidv4 } from '../utils/util';

export default function MultipleSelect(props) {
    const [currency, setCurrency] = React.useState("BGN");

    const handleChange = (event) => {
        setCurrency(event.target.value);
        props.handleChange(event.target.value);
    };

    return (
        <>
            <FormControl sx={{ m: 0, maxWidth: 100 }}>
                <InputLabel id="currency-label">Currency</InputLabel>
                    <Select
                    labelId="currencyID"
                    id="currency"
                    value={currency}
                    label="Currency"
                    onChange={handleChange}
                    >
                        {
                            currencies.map(currency => <MenuItem key={uuidv4()} value={currency}>{currency}</MenuItem>)
                        }
                    </Select>
            </FormControl>
        </>
    );
}