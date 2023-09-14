import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { addAccountAction, editAccountAction } from '../redux/actions/userActions';

export default function AddAccountBTN(props) {
  const [open, setOpen] = React.useState(false);
  const [accountInfo, setAccountInfo] = React.useState({name: "", amount: ""});

  const dispatch = useDispatch();

  const user = useSelector(state => state.userData.user);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    dispatch(addAccountAction(user.id, accountInfo.name, accountInfo.amount, user.accounts))
    
    setAccountInfo({name: "", amount: ""});
    setOpen(false);
  }

  const handleEdit = () => {

    //use redux to update the account
    dispatch(editAccountAction(user.id, props.name, accountInfo.name, user.accounts));

    setAccountInfo({name: "", amount: ""});
    setOpen(false);
  }

  const handleChange = (ev) => {
    setAccountInfo(prevInfo => ({...prevInfo, [ev.target.name]: ev.target.value}));
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {props.operation === "edit" ? "Edit" : "Add"} Account
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> {props.operation === "edit" ? "Edit" : "Add"} Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter name and start wage for the account you want to {props.operation === "edit" ? "edit" : "add"}!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="accName"
            label="Account Name"
            name="name"
            type="text"
            fullWidth
            variant="standard"
            value={accountInfo.name}
            onChange={handleChange}
          />
          <br/>
          {props.operation !== "edit" && <TextField
            autoFocus
            margin="dense"
            id="accWage"
            label="Start Wage"
            name="amount"
            type="number"
            fullWidth
            variant="standard"
            value={accountInfo.amount}
            onChange={handleChange}
          />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> Cancel </Button>
          <Button onClick={props.operation === "edit" ? handleEdit : handleAdd}>  {props.operation === "edit" ? "Edit" : "Add"} Account </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}