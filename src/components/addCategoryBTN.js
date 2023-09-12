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
import { updateUserIncomeCategories, updateUserExpenseCategories } from '../redux/actions/userActions';

export default function AddCategoryBTN() {
    const [open, setOpen] = React.useState(false);
    const [categoryInfo, setCategoryInfo] = React.useState({name: "", type: "expenseCategory"});
    const [value, setValue] = React.useState('expenseCategory');

    const dispatch = useDispatch();

    const user = useSelector(state => state.userData.user);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = () => {
        if(value === "incomeCategory") {
            dispatch(updateUserIncomeCategories(user.id, user.incomeCategories, categoryInfo.name));
        }
        else {
            dispatch(updateUserExpenseCategories(user.id, user.expenseCategories, categoryInfo.name));
        }

        setCategoryInfo({name: "", type: "expenseCategory"});
        setOpen(false);
    }

    const handleChangeText = (ev) => {
        setCategoryInfo(prevInfo => ({...prevInfo, [ev.target.name]: ev.target.value}));
    }

    const handleRadioChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Category
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Category</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter category name and type!
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

                    <RadioGroup
                        aria-labelledby="category-type"
                        name="type"
                        value={value}
                        onChange={handleRadioChange}>
                        <FormControlLabel value="incomeCategory" control={<Radio />} label="Income" />
                        <FormControlLabel value="expenseCategory" control={<Radio />} label="Expense" />
                    </RadioGroup>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}> Cancel </Button>
                    <Button onClick={handleAdd} disabled={!categoryInfo.name}> Add Category </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}