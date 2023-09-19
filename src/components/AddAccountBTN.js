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
  const [accountInfo, setAccountInfo] = React.useState({ name: "", amount: "" });
  const dispatch = useDispatch();

  const user = useSelector(state => state.userData.user);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setAccountInfo({name : "", amount: ""})
    setOpen(false);
  };
  const handleAdd = () => {
    dispatch(addAccountAction(user, accountInfo.name, accountInfo.amount, user.accounts))

    setAccountInfo({ name: "", amount: "" });
    setOpen(false);
  }

  const handleEdit = () => {

    //use redux to update the account
    dispatch(editAccountAction(user, props.name, accountInfo.name, user.accounts));

    setAccountInfo({ name: "", amount: "" });
    setOpen(false);
  }

  const handleChange = (ev) => {
    setAccountInfo(prevInfo => ({ ...prevInfo, [ev.target.name]: ev.target.value }));
  }

  return (
    <div>
      <Button
        className={props.isInHome ? "w-200" : "w-100"}
        variant="contained"
        color={props.isInHome ? 'secondary' : 'success'} onClick={handleClickOpen}>
        Add Account
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Add Account</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            sx={{ width: '240px' }}
            margin="dense"
            color="secondary"
            id="accName"
            label="Account Name"
            name="name"
            type="text"
            variant="outlined"
            value={accountInfo.name}
            onChange={handleChange}
          />
          <br />
          {props.operation !== "edit" && <TextField
            autoFocus
            margin="dense"
            color="secondary"
            id="accWage"
            label="Start Wage"
            name="amount"
            type="number"
            sx={{ width: '240px', marginTop : "15px" }}
            variant="outlined"
            value={accountInfo.amount}
            onChange={handleChange}
          />}
        </DialogContent>
        <DialogActions>
          <Button color="secondary"  sx={{width : '45%'}} onClick={handleClose}> Cancel </Button>
          <Button color="secondary"  sx={{width : '50%'}} variant='contained' disabled={!(accountInfo.name && accountInfo.amount)} onClick={props.operation === "edit" ? handleEdit : handleAdd}>  {props.operation === "edit" ? "Edit" : "Add"} Account </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}