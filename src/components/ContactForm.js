import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../redux/actions/snackbarActions';
import { useNavigate } from 'react-router-dom';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e) => {
    if(e.target.name === "email") {
      setEmail(e.target.value.trim());
    } else if(e.target.name === "message") {
      setMessage(e.target.value.trim());
    }
  }
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSend = () => {
    dispatch(setSnackbar(true, "success", "Message sent!"))
    setEmail("");
    setMessage("");
  };

  const handleRedirect = (location) => {
    navigate(`/${location}`);
  }

  return (
    <PushDownDiv>
      <ButtonHeader>
        <Button variant="contained" color="info" sx={{borderRadius : '0', width : '50%', float : 'left'}} onClick={() => handleRedirect("login")}> LOGIN </Button>
        <Button variant='contained' color='secondary' sx={{borderRadius : '0', width : '50%'}} onClick={() => handleRedirect("register")}> REGISTER </Button>
      </ButtonHeader>
      <Button sx={{borderRadius : '0'}} variant="contained" fullWidth color="primary" onClick={handleOpen}>
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
            required
            autoComplete='off'
            name="email"
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={handleInput}
          />

          <TextField
            autoFocus
            required
            autoComplete='off'
            name='message'
            margin="dense"
            id="name"
            label="Your Message"
            type="text"
            fullWidth
            multiline
            variant="standard"
            value={message}
            onChange={handleInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSend} disabled={ (email && message) ? false : true } endIcon={<SendIcon />}>
              Send
          </Button>
        </DialogActions>
      </Dialog>
    </PushDownDiv>
  );
}

const ButtonHeader = styled.div`
  position : fixed;
  top : 0; left:0;
  width:100%;
  z-index: 9999;
`

const PushDownDiv = styled.div`
  margin-top:37px;
`