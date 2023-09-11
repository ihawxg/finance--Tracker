import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <div>
      <Button variant="contained" fullWidth color="primary" onClick={handleOpen}>
         CONTACT US NOW
      </Button>
  
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Leave us a message</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your email address here. You will hear back from us within the next 24 hours. We
            will send you notifications on our updates occasionally. 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Your Message"
            type="text"
            fullWidth
            multiline
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleClose} endIcon={<SendIcon />}>
              Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}