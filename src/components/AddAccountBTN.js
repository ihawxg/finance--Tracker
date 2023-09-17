import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserIncomeCategories, updateUserExpenseCategories, editExpenseCategories, editIncomeCategories } from '../redux/actions/userActions'; 
import { HexColorPicker } from "react-colorful";
import styles from "./styles/pages.module.css";

export default function AddCategoryBTN(props) {
  const [open, setOpen] = React.useState(false);
  const [categoryInfo, setCategoryInfo] = React.useState({name: "", type: "expense"});
  const [value, setValue] = React.useState('expense');
  const [color, setColor] = React.useState("#fff");

  const dispatch = useDispatch();

  const user = useSelector(state => state.userData.user);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    if(props.operation !== "edit"){
      if(value === "income") {
          dispatch(updateUserIncomeCategories(user.id, user.incomeCategories, user.categories, categoryInfo, color));
      } 
      else {
          dispatch(updateUserExpenseCategories(user.id, user.expenseCategories, user.categories, categoryInfo, color));
      }
    }
    else{
      if(value === "expense") {
        dispatch(editExpenseCategories(user.id, props.position, user.expenseCategories, user.incomeCategories, user.categories, user.categories[props.position], categoryInfo, false, color));
      }
      else {
        dispatch(editIncomeCategories(user.id, props.position, user.expenseCategories, user.incomeCategories, user.categories, user.categories[props.position], categoryInfo, false, color));
      }
    }

    setCategoryInfo({name: "", type: "expense"});
    setColor("#fff");
    setOpen(false);
  }

  const handleChangeText = (ev) => {
    setCategoryInfo(prevInfo => ({...prevInfo, [ev.target.name]: ev.target.value}));
  }

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setCategoryInfo(prevInfo => ({...prevInfo, type: event.target.value}));
  };

  return (
    <div>
      <Button 
        variant={props.operation == 'edit' ? 'outlined' : 'contained'} 
        color={props.operation == 'edit' ? 'primary' : 'success'}
        onClick={handleClickOpen}>
        {props.operation === "edit" ? "Edit" : "Add"} Category
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.operation === "edit" ? "Edit" : "Add"} Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {props.operation === "edit" ? "Edit category name or type" : "Enter category name and type!" }
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="categoryName"
            label="Category Name"
            name="name"
            type="text"
            fullWidth
            variant="standard"
            value={categoryInfo.name}
            onChange={handleChangeText}
          />
    
        <div className={styles.categoryContainer}>
          <RadioGroup
            aria-labelledby="category-type"
            name="type"
            value={value}
            onChange={handleRadioChange}>
              <FormControlLabel value="income" control={<Radio />} label="Income" />
              <FormControlLabel value="expense" control={<Radio />} label="Expense" />
          </RadioGroup>
          
          <HexColorPicker color={color} onChange={setColor}/>
        </div>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> Cancel </Button>
          <Button onClick={handleAdd} disabled={!categoryInfo.name}> {props.operation === "edit" ? "Edit Category" : "Add Category" } </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}