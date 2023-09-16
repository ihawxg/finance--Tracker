import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DatePick from './DatePick';
import BasicDatePicker from './DatePicker';
import { StyledEngineProvider } from '@mui/material/styles';
import CategoryPicker from "./CategoryPicker";
import styled from 'styled-components';
import { useState} from 'react';
import { addGoalAction, addBudget, addIncome, addExpense, editExpense, editIncome, editBudget } from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbar } from '../redux/actions/snackbarActions';
import styles from "./styles/progress_card.module.css";
import { getFormatedDate } from '../utils/util'
import { DateRangeFilter } from './filters/DateRangeFilter'
export default function FormDialog(props) {

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [descr, setDescr] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [fromDate, setFromDate] = useState(getFormatedDate(new Date()));
  const [toDate, setToDate] = useState(getFormatedDate(new Date()));
  const [dateRange, setDateRange] = useState([null, null])
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
    setFromDate(getFormatedDate(new Date()));
    setSelectedDate(null);
    setToDate(getFormatedDate(new Date()));
    setOpen(false);
    setDateRange([null, null])
  };

  const handleAdd = (value) => {
    dispatch(setSnackbar(true, "success", "Transaction added!"));

    const detail = {
      amount,
      descr,
      category,
      date: selectedDate,
      account
    }

    switch(value) {
        case "Expense" :
          dispatch(addExpense(user, {...detail, date: JSON.stringify(selectedDate).replaceAll('"', '')}))
          break;

        case "Savings": 
          dispatch(addGoalAction(user, {...detail, date: JSON.stringify(selectedDate).replaceAll('"', '')}))
          break;

        case "Income" : 
          dispatch(addIncome(user, {...detail, date: JSON.stringify(selectedDate).replaceAll('"', '')}))
          break;

        case "Budget" : 
          const details = {
            amount, 
            category,
            from: JSON.stringify(new Date(dateRange[0])).replaceAll('"', ''), 
            to: JSON.stringify(new Date(dateRange[1])).replaceAll('"', '')
          }

          dispatch(addBudget(user, details));
        break;

        default: {
          return;
        }
    }
    handleClose();
  };

  const handleEdit = (value) => {
    dispatch(setSnackbar(true, "success", "Transaction updated!"))
    
    const detail = {
      amount,
      descr,
      category,
      date: selectedDate,
      account
    }

    switch(props.value) {
        case "Expense" :
          dispatch(editExpense(user, detail, props.prevAccountName, props.expenseID))
          break;

        case "Savings": 
          // dispatch(editGoalAction(user, details))
          break;

        case "Income" : 
          dispatch(editIncome(user, detail, props.prevAccountName, props.incomeID))
          break;

        case "Budget" : {
          let details = {
            amount, 
            category,
            account,
            from: JSON.stringify(new Date(dateRange[0])).replaceAll('"', ''), 
            to: JSON.stringify(new Date(dateRange[1])).replaceAll('"', '')
          }
        
          dispatch(editBudget(user, details));
        }
        break;
        default: {
          return;
        }
    }
    handleClose();
  }

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
      <Button 
          className={styles.btn} 
          variant={props.value === "Budget" && props.operation !== "edit"  ? "contained" : "outlined"}
          color={props.value == "Budget" ? "success" : "primary"}
          onClick={handleClickOpen}>
        {props.operation === "edit" ? "Edit" : "Add"} {props.value}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.operation === "edit" ? "Edit" : "Add"} {props.value} </DialogTitle>
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
          
            {(props.value === "Income" || props.value === "Expense") && <TextField
            margin="dense"
            id="name"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            name ="description"
            value={descr}
            onInput={handleInput}
          />}
          
          <Pickers>
            <StyledEngineProvider injectFirst>
             
              {props.value === "Budget" ? (
                <DateRangeFilter value={dateRange} onChange={e => setDateRange(e)} />
              ) : ( <BasicDatePicker label="Choose date" value={selectedDate} selected={selectedDate} onChange={date => setSelectedDate(date)} />)}
              {props.value !== "Budget" && <CategoryPicker name="account" value={account} onChange={e => setAccount(e.target.value)} required/>}
              <CategoryPicker type={props.value} name="category" value={category} list={account} disabled={!((account && props.value !== "Budget") || props.value === "Budget")} onChange={e => setCategory(e.target.value)} />
            </StyledEngineProvider>
          </Pickers>
          
        </DialogContent>
        <DialogActions>
          <Button fullWidth={true} onClick={handleClose}>Cancel</Button>
          <Button fullWidth={true} variant="contained" 
            disabled={!(((amount && category && account && descr && (selectedDate || (fromDate && toDate))) || ((amount && category && props.value === "Budget")))) } 
            onClick={ props.operation === "edit" ? () => handleEdit(props.value) : () => handleAdd(props.value) }> {props.operation === "edit" ? "Edit" : "Add"} {props.value}
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