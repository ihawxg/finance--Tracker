import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { addGoal } from '../redux/actions/userActions';
import { OurButton } from "./FormDialog";

export default function AddGoalButton(props) {
  const [open, setOpen] = React.useState(false);
  const user = useSelector(state => state.userData.user);
  const [nameVal, setNameVal] = React.useState("");
  const [amountVal, setAmountVal] = React.useState("");

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setNameVal("");
    setAmountVal("");
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
 
  return (
    <div>
      <OurButton className="w-200" variant="contained" color='secondary' onClick={handleClickOpen}>
        {props.title}
      </OurButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent sx={{ display : 'flex', flexFlow : 'column wrap', gap: '10px' }}>
            <TextField 
              margin="dense"
              id="name"
              color="secondary"
              label="Goal Name"
              type="text"
              sx={{width : '240px'}}
              variant="outlined"
              value={nameVal}
              onInput={handleNameChange}
          />

          <TextField
            autoFocus
            color="secondary"
            margin="dense"
            id="name"
            label="Goal Amount"
            type="number"
            sx={{width : '240px'}}
            variant="outlined"
            value={amountVal}
            onInput={handleAmountChange}
        />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" fullWidth onClick={handleClose}>Cancel</Button>
          <Button color="secondary" fullWidth variant="contained" disabled={!(nameVal && amountVal)} onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}