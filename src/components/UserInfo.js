import Paper from '@mui/material/Paper';
import styles from "./styles/info.module.css"
import TextField from '@mui/material/TextField';
import DatePick from './DatePick';
import Button from '@mui/material/Button';
import React from "react";

export default function UserInfo(){

    const [editable, setEditable] = React.useState(false);

    const [user, setUser] = React.useState({firstName: "Vasil", lastName: "Lyubenov", email: "vasetokaiba@gogo.com"});

    const handleClick = () => {
        setEditable(prev => !prev);
    }

    const handleInput = (ev) => {
        setUser(prev => ({...prev, [ev.target.name]: ev.target.value}))
    }

    return (
        <div className={styles.boxContainer}>
            <Paper elevation={2} className={styles.box}>
                <div className={styles.pic}>
                    <img src="prof_pic.png" className={styles.image} alt="profile-pic"/>
                </div>
                <div className={styles.info}>
                    <div className={styles.nameContainer}>
                        <TextField disabled={!editable} id="fname" name="firstName" label="First Name" variant="outlined" value={user.firstName} onInput={handleInput} />
                        <TextField disabled={!editable} id="lname" name="lastName" label="Last Name" variant="outlined" value={user.lastName} onInput={handleInput} />
                    </div>
                    <div className={styles.nameContainer}>
                        <TextField disabled={!editable} className={styles.mailInput} name="email" id="email" label="Email" variant="outlined" value={user.email} onInput={handleInput}/>
                    </div>

                    <div className={styles.nameContainer}>
                        <DatePick disabled={!editable} className={styles.date}/>
                        <Button className="w-200" onClick={handleClick} variant="contained" color={editable ? "success" : "primary"}>{editable ? "Save Info" : "Edit Info"}</Button>
                    </div>
                </div>
            </Paper>
        </div>
    );
}