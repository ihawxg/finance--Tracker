import Paper from '@mui/material/Paper';
import styles from "./styles/info.module.css"
import TextField from '@mui/material/TextField';
import DatePick from './DatePick';
import Button from '@mui/material/Button';
import React from "react";
import { useSelector } from 'react-redux';
import EditButton from './EditButton';

export default function UserInfo(){

    const [editable, setEditable] = React.useState(false);

    const [user, setUser] = React.useState(useSelector(state => state.userData.user));

    const handleClick = () => {
        setEditable(prev => !prev);
    }

    const handleInput = (ev) => {
        setUser(prev => ({...prev, [ev.target.name]: ev.target.value}))
    }

    console.log(user);

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
                        <DatePick disabled={!editable} value={new Date(user.birthdate)} className={styles.date}/>
                        <EditButton handleClick={handleClick}/>
                    </div>
                </div>
            </Paper>
        </div>
    );
}