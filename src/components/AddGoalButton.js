import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { addGoal } from '../redux/actions/userActions';

export default function AddGoalButton(props) {
  const [open, setOpen] = React.useState(false);
  const user = useSelector(state => state.userData.user);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleAdd(){
    dispatch(addGoal(user, nameVal, amountVal));
    setOpen(false);
  }

  function handleNameChange(ev) {
    setNameVal(ev.target.value);
  }

  function handleAmountChange(ev) {
    setAmountVal(ev.target.value);
  }
  
  const [nameVal, setNameVal] = React.useState("");
  const [amountVal, setAmountVal] = React.useState("");

  return (
    <div>
      <Button className="w-200" variant="contained" color="success" onClick={handleClickOpen}>
        {props.title}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
        
            <TextField 
            margin="dense"
            id="name"
            label="Goal Name"
            type="text"
            fullWidth
            variant="standard"
            value={nameVal}
            onInput={handleNameChange}
          />

            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Goal Amount"
            type="number"
            fullWidth
            variant="standard"
            value={amountVal}
            onInput={handleAmountChange}
          />

        </DialogContent>
        <DialogActions>
          <Button fullWidth={true} onClick={handleClose}>Cancel</Button>
          <Button fullWidth={true} variant="contained" onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}