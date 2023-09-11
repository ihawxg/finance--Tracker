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

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAmount(0);
  };

  const handleAdd = (clickAction, val) => {
    if(typeof clickAction != "undefined"){
      clickAction(Number(val));
    }
    setOpen(false);
    setAmount(0);
  };

  const [amount, setAmount] = React.useState(0);

  const handleInput = (ev) => {
    setAmount(ev.target.value);
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
            value={amount}
            onInput={handleInput}
          />
          {(props.value === "Expense" || props.value === "Savings") && (
            <TextField
            margin="dense"
            id="name"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            
          />
          )}
          
          <Pickers>
            <StyledEngineProvider injectFirst>
              <BasicDatePicker label="Choose date" />
              {props.value === "Expense" && (<CategoryPicker />)}
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