import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';

export default function AddAccountBTN() {
    const [open, setOpen] = React.useState(false);
    const [accountInfo, setAccountInfo] = React.useState({name: "", amount: ""});

    const user = useSelector(state => state.userData.user);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = () => {
        const today = new Date();
        const date = `${(today.getMonth()+1)}/${today.getDate()}/${today.getFullYear()}`;
        user.accounts.push({name: accountInfo.name,
            budgets: [],
            categories: [1,2,3],
            expenses: [],
            incomes: [
                {
                    date: date,
                    amount: accountInfo.amount,
                    category: "Initial Deposit",
                    description: `Initial "${accountInfo.name}" Deposit`
                }
            ],
            goals: []
        });
        setAccountInfo({name: "", amount: ""});
        setOpen(false);
    }

    const handleChange = (ev) => {
        setAccountInfo(prevInfo => ({...prevInfo, [ev.target.name]: ev.target.value}));
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Account
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter name and start wage for the account you want to add!
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
                    <TextField
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
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}> Cancel </Button>
                    <Button onClick={handleAdd}> Add Account </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}