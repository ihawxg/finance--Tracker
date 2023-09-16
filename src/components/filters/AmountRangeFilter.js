import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider'

export const AmountRangeFilter = (props) => {
    //set a range of min-max expense/income

    function valuetext(value) {
        return `BGN ${value}`;
    }
    const [value, setValue] = useState([0, props.max]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.onChange(event);
    }
    return (
        <Box sx={{ width: 300, marginTop: 3}}>
            <Slider
                getAriaLabel={() => 'Amount range'}
                value={props.value}
                color="secondary"
                onChange={handleChange}
                valueLabelDisplay="auto"
                max={props.max}
                getAriaValueText={valuetext}
                valueLabelDisplay="on"
            />
        </Box>
    );
}