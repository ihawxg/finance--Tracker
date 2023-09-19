import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import styled from 'styled-components';

export const DateRangeFilter = (props) => {
  const [value, setValue] = React.useState([null, null]);
 
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        color="secondary"
        value={props.value}
        maxDate={ props.disabled ? new Date() : new Date('2048-12-01T14:07:28.000Z') }
        onChange={(newValue) => {
          setValue(newValue);
          props.onChange(newValue);
        }}

        renderInput={(startProps, endProps) => (
          <DateRange flow={props.flow}>
            <TextField sx={{ minWidth : props.flow == 'column' ? '240px' : '300px', m: 1 }} {...startProps} color="secondary"  />
            {!props.flow && (<Box sx={{ marginLeft: 5 }}></Box>)}
            <TextField sx={{ minWidth : props.flow == 'column' ? '240px' : '300px', m: 1 }} {...endProps} color="secondary"/>
          </DateRange>
        )}
      />
    </LocalizationProvider>
  );
}

const DateRange = styled.div`
  display: flex;
  flex-flow: ${props => props.flow == "column" ? "column wrap" : "row wrap"};
  width: 100%;
  gap: 15px;
  jusitfy-content : ${props => props.flow == "column" ? "stretch" : "space-between"};
  align-items: center;
  margin: ${props => props.flow == "column" ? '5px 0 5px 0' : ' auto'};
  @media(max-width: 1200px) {
    flex-flow : column wrap;
    margin: 0 auto;
    gap: 5px;
    
} 
`