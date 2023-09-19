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
import { addBudget, addIncome, addExpense, editExpense, editIncome, editBudget, addToGoal } from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbar } from '../redux/actions/snackbarActions';
import styles from "./styles/progress_card.module.css";
import { getFormatedDate } from '../utils/util';
import { DateRangeFilter } from './filters/DateRangeFilter';

export const OurButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  lineHeight: 1.5,
  background: "#753068",
  fontFamily: "Poppins",
  '&:hover': {
    background: '#ad5389',
  }
});

export default function FormDialog(props) {

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [descr, setDescr] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(getFormatedDate(new Date()));
  const [toDate, setToDate] = useState(getFormatedDate(new Date()));
  const [dateRange, setDateRange] = useState(["", ""]);
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(state => state.userData.user);

  const handleClickOpen = () => {
    setOpen(true);
    if(props.value === "Budget" && props.operation === "edit") {
      setAmount(props.editdetails.max);
      setCategory(props.editdetails.name);
      setFromDate(props.editdetails.dateFrom);
      setToDate(props.editdetails.dateTo);
      setDateRange([props.editdetails.dateFrom, props.editdetails.dateTo]);
    }
  };

  const handleClose = () => {
    setAmount("");
    setDescr("");
    setAccount("");
    setCategory("");
    setFromDate(getFormatedDate(new Date()));
    setSelectedDate(new Date());
    setToDate(getFormatedDate(new Date()));
    setOpen(false);
    setDateRange(["", ""]);
  };

  const handleAdd = (value) => {
    // dispatch(setSnackbar(true, "success", "Transaction added!"));
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
          dispatch(addToGoal(user, props.goal.name, amount, account));
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
    const detail = {
      amount,
      descr,
      category,
      date: selectedDate,
      account
    }

    if(props.value === "Budget") {
          let details = {
            amount, 
            category,
            account,
            from: JSON.stringify(new Date(dateRange[0])).replaceAll('"', ''), 
            to: JSON.stringify(new Date(dateRange[1])).replaceAll('"', '')
          }
          dispatch(editBudget(user, details));
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
      <OurButton 
          className={styles.btn} 
          variant="contained"
          color="secondary"
          onClick={handleClickOpen}>
        {props.operation === "edit" ? "Edit" : "Add"} {props.value}
      </OurButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.operation === "edit" ? "Edit" : "Add"} {props.value} </DialogTitle>
        <DialogContent>
          <InputFields>
          
            <TextField
              
              margin="dense"
              sx={{width : '240px', marginBottom : props.value == 'Budget' || props.value == 'Savings' ? "15px" : "0"}}
              id="name"
              label="Amount"
              type="number"
              color="secondary"
              variant="outlined"
              name="amount"
              value={amount}
              onChange={handleInput}
            />
            
              {(props.value === "Income" || props.value === "Expense") && <TextField
              margin="dense"
              id="name"
              label="Description"
              color="secondary"
              type="text"
              sx={{width : '240px'}}
              variant="outlined"
              name ="description"
              value={descr}
              inputProps={{ maxLength: 36 }}
              onInput={handleInput}
            />}
           </InputFields>  
          <Pickers>
            <StyledEngineProvider injectFirst>
             
              {props.value === "Budget" ? (
                <DateRangeFilter flow="column" disabled={false} value={dateRange} onChange={e => setDateRange(e)} />
              ) : (props.value !== "Savings" && <BasicDatePicker value={selectedDate} selected={selectedDate} onChange={date => setSelectedDate(date)} />)}
              {props.value !== "Budget" && <CategoryPicker fullWidth name="account" value={account} onChange={e => setAccount(e.target.value)} required/>}
              {props.value !== "Savings" && <CategoryPicker fullWidth type={props.value} name="category" value={category} list={account} disabled={!((account && props.value !== "Budget") || props.value === "Budget")} onChange={e => setCategory(e.target.value)} />}
            </StyledEngineProvider>
          </Pickers>
          
        </DialogContent>
        <DialogActions>
          <Button color="secondary" fullWidth={true} onClick={handleClose}>Cancel</Button>
          <Button color="secondary" fullWidth={true} variant="contained"
            disabled={!(((amount && category && account && descr && (selectedDate || (fromDate && toDate))) || ((amount && category && props.value === "Budget")) || ((amount && account && props.value === "Savings")) ))} 
            onClick={ props.operation === "edit" ? () => handleEdit(props.value) : () => handleAdd(props.value) }> {props.operation === "edit" ? "Edit" : "Add"} {props.value}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}

const Pickers = styled.div`
  gap: 15px;
  width: 100%;
  display : flex;
  flex-flow: column wrap;
  align-items : center;
  justify-content: flex-start;
  margin-top:2px;
`
const InputFields = styled(Pickers)`
  justify-content: flex-start;
  gap: 5px;
`;
