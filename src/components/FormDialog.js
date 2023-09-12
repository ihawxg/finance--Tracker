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
import { useState, useEffect } from 'react';
import { addExpenseAction, addGoalAction, addIncomeAction, addBudgetAction } from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbar } from '../redux/actions/snackbarActions';
import styles from "./styles/progress_card.module.css";

export default function FormDialog(props) {

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [descr, setDescr] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("");
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setAmount(0);
    setDescr("");
    setAccount("");
    setCategory("");
    setFromDate(null);
    setSelectedDate(null);
    setToDate(null);
    setOpen(false);
  };
  const handleAdd = (value) => {
    dispatch(setSnackbar(true, "success", "Transaction added!"))
    let obj = {
      amount,
      descr,
      category,
      date: selectedDate,
      account
    }
    switch(value) {
      case "Expense" :
        dispatch(addExpenseAction(obj))
        break;
      case "Savings":
        dispatch(addGoalAction(obj))
        break;
      case "Income" :
        dispatch(addIncomeAction(obj))
        break;
      case "Budget" : {
        let obj = {
          amount,
          category,
          account,
          from: fromDate,
          to: toDate
        }
        dispatch(addBudgetAction(obj))
      }
    }
  };
  const handleInput = (ev) => {
    switch(ev.target.name) {
      case "amount":
        setAmount(ev.target.value);
        break;
      case "description":
        setDescr(ev.target.value);
        break;
    }
  }

  return (
      <div>
        <Button className={styles.btn} variant="outlined" onClick={handleClickOpen}>
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


            <Pickers>
              <StyledEngineProvider injectFirst>

                {props.value === "Budget" ? (
                    <>
                      <BasicDatePicker label="From... " value={fromDate} selected={fromDate} onChange={date => setFromDate(date)} />
                      <BasicDatePicker label="To..." value={toDate} selected={toDate} onChange={date => setToDate(date)} />
                    </>
                ) : ( <BasicDatePicker label="Choose date" value={selectedDate} selected={selectedDate} onChange={date => setSelectedDate(date)} />)}
                <CategoryPicker name="category" value={category} onChange={e => setCategory(e.target.value)} />
                <CategoryPicker name="account" value={account} onChange={e => setAccount(e.target.value)} />
              </StyledEngineProvider>
            </Pickers>

          </DialogContent>
          <DialogActions>
            <Button fullWidth={true} onClick={handleClose}>Cancel</Button>
            <Button fullWidth={true} variant="contained"
                    disabled={(amount && category && account && descr && (selectedDate || (fromDate && toDate)))
                        ? false : true} onClick={ () => handleAdd(props.value) }>Add {props.value}</Button>
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