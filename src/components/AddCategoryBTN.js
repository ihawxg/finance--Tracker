import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserIncomeCategories, updateUserExpenseCategories } from '../redux/actions/userActions'; 
import { HexColorPicker } from "react-colorful";
import styles from "./styles/pages.module.css";
import { OurButton } from "./FormDialog";

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
    setCategoryInfo({name: "", type: "expense"});
    setValue("")
    setOpen(false);
  };

  const handleAdd = () => {
    if(value === "income") {
        dispatch(updateUserIncomeCategories(user, categoryInfo.name, color));
    } 
    else {
        dispatch(updateUserExpenseCategories(user, categoryInfo.name, color));
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
      <OurButton 
        className={props.isInHome ? "w-200" : "w-100"}
        variant='contained'
        color='secondary'
        onClick={handleClickOpen}>
        Add Category
      </OurButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Add Category </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            color="secondary"
            margin="dense"
            id="categoryName"
            label="Category Name"
            name="name"
            type="text"
            fullWidth
            variant="outlined"
            value={categoryInfo.name}
            onChange={handleChangeText}
          />
    
        <div className={styles.categoryContainer}>
          <RadioGroup
          style={{width: "235px"}}
            aria-labelledby="category-type"
            name="type"
            value={value}
            onChange={handleRadioChange}>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <FormControlLabel value="income" control={<Radio />} label="Income" />
                <FormControlLabel value="expense" control={<Radio />} label="Expense" />
              </div>
          </RadioGroup>
          
          <HexColorPicker color={color} style={{width: "235px"}} onChange={setColor}/>
        </div>

        </DialogContent>
        <DialogActions>
          <Button fullWidth color="secondary" onClick={handleClose}> Cancel </Button>
          <Button fullWidth color="secondary" variant='contained' onClick={handleAdd} disabled={!(categoryInfo.name && categoryInfo.type && color)}> Add Category </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}