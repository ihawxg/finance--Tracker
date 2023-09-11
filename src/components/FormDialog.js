import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import BasicDatePicker from './DatePicker';
import { StyledEngineProvider } from '@mui/material/styles';
import CategoryPicker from "./CategoryPicker";
import styled from 'styled-components';
import { useState } from 'react';

export default function FormDialog(props) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [descr, setDescr] = useState("");
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("");
// there's a one char delay on input/change if we console.log the result
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setAmount(0);
    setDescr("");
    setOpen(false);
    
  };

  const handleAdd = (clickAction, val) => {
    if(typeof clickAction != "undefined"){
      clickAction(Number(val));
    }
    setOpen(false);
    setAmount(0);
  };

  const handleInput = (ev) => {
    switch(ev.target.name) {
      case "amount": 
          setAmount(ev.target.value);
          break;
      case "description": 
          setDescr(ev.target.value.trim());
          break;
      case "category"  :
        setCategory(ev.target.value);
        console.log(category);
        break;  
    }
   
  }

  return (
    <div>
      <Button className="w-200" variant="outlined" onClick={handleClickOpen}>
        {props.title}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Amount"
            type="number"
            fullWidth
            variant="standard"
            name="amount"
            value={amount}
            onChange={handleInput}
          />
          {(props.value === "Expense" || props.value === "Savings") && (
            <TextField
            margin="dense"
            id="name"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            name ="description"
            value={descr}
            onInput={handleInput}
          />
          )}
          
          <Pickers>
            <StyledEngineProvider injectFirst>
              <BasicDatePicker label="Choose date" />
              {props.value === "Expense" && (<CategoryPicker name="category" onChange={handleInput}/>)}
            </StyledEngineProvider>
          </Pickers>
          
        </DialogContent>
        <DialogActions>
          <Button fullWidth={true} onClick={handleClose}>Cancel</Button>
          <Button fullWidth={true} variant="contained" onClick={ () => handleAdd(props.clickAction, amount) }>Add {props.value}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const Pickers = styled.div`
  margin-top: 10px;
  display : flex;
  flex-flow: row wrap;
  align-items : flex-start;
  justify-content: space-between;
`