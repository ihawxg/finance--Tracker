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
import { useState} from 'react';
import { addGoalAction, addBudgetAction, addIncome, addExpense } from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbar } from '../redux/actions/snackbarActions';
import styles from "./styles/progress_card.module.css";
import { getFormatedDate } from '../util';

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
  const user = useSelector(state => state.userData.user);
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
    let details = {
      amount,
      descr,
      category,
      date: getFormatedDate(selectedDate),
      account
    }

    switch(value) {
        case "Expense" :
          try{
            dispatch(addExpense(user, details))
          }catch(err){
            console.log(err);
          }
          break;
        case "Savings": 
          dispatch(addGoalAction(user, details))
          break;
        case "Income" : 
          dispatch(addIncome(user, details))
          break;
        case "Budget" : {
          let details = {
            amount, 
            category,
            account,
            from: fromDate, 
            to: toDate
          }
          try{
            dispatch(addBudgetAction(details))
          }
          catch(err){
            console.log(err);
          }
        }
        break;
        default: {
          return;
        }
    }
    handleClose();
  };

  const handleInput = (ev) => {
    switch(ev.target.name) {
      case "amount": 
          setAmount(ev.target.value);
          break;
      case "description": 
          setDescr(ev.target.value);
          break;
      default: {
        return;
      }
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
              <CategoryPicker name="account" value={account} onChange={e => setAccount(e.target.value)} required/>
              <CategoryPicker name="category" value={category} list={account} disabled={account ? false : true} type={props.value} onChange={e => setCategory(e.target.value)} />
              
            </StyledEngineProvider>
          </Pickers>
          
        </DialogContent>
        <DialogActions>
          <Button fullWidth={true} onClick={handleClose}>Cancel</Button>
          <Button fullWidth={true} variant="contained" 
            disabled={!((amount && category && account && descr && (selectedDate || (fromDate && toDate)))) } 
            onClick={ () => handleAdd(props.value) }>Add {props.value}
          </Button>
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