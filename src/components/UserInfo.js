import Paper from '@mui/material/Paper';
import styles from "./styles/info.module.css"
import TextField from '@mui/material/TextField';
import DatePick from './DatePick';
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import EditButton from './EditButton';
import { updateUserInfoAction } from '../redux/actions/userActions';

export default function UserInfo(){

    const [editable, setEditable] = React.useState(false);
    const currentUser = useSelector(state => state.userData.user);

    const dispatch = useDispatch();

    React.useEffect(() => {
        setUser({firstName: currentUser.firstName, lastName: currentUser.lastName, birthdate: currentUser.birthdate});
    }, [currentUser]);
    
    const [user, setUser] = React.useState({firstName: currentUser.firstName, lastName: currentUser.lastName, birthdate: currentUser.birthdate});

    const handleClick = () => {
        if(editable){
            dispatch(updateUserInfoAction(currentUser.id, user));
        }
        setEditable(prev => !prev);
    }

    const handleInput = (ev) => {
        setUser(prev => ({...prev, [ev.target.name]: ev.target.value}));
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
                        <TextField disabled className={styles.mailInput} name="email" id="email" label="Email" variant="outlined" value={currentUser.email} onInput={handleInput}/>
                    </div>
               
                    <div className={styles.nameContainer}>
                        <DatePick label="Birthdate" disabled={!editable} value={new Date(user.birthdate)} className={styles.date} handleDateChange={setUser}/>
                        <EditButton disabled={user.firstName === "" || user.lastName === "" || user.birthdate === ""} handleClick={handleClick}/>
                    </div> 
                </div>
            </Paper>
        </div>
    );
}