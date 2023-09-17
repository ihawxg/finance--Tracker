import Paper from '@mui/material/Paper';
import styles from "./styles/info.module.css"
import TextField from '@mui/material/TextField';
import DatePick from './DatePick';
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import EditButton from './EditButton';
import { updateUserInfoAction } from '../redux/actions/userActions';
import styled from 'styled-components';
import { StyledPage } from './HistoryPage';
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
        /*
            // < >
               <CustomPaper >
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
        */
            <CustomPaper>
                <Profile>
                    <ProfilePic src="prof_pic.png" alt="profile-pic"></ProfilePic>
                    <Info>
                        <TextField disabled={!editable} id="fname" name="firstName" label="First Name" variant="outlined" value={user.firstName} onInput={handleInput} />
                        <TextField disabled={!editable} id="lname" name="lastName" label="Last Name" variant="outlined" value={user.lastName} onInput={handleInput} />
                        <TextField disabled name="email" id="email" label="Email" variant="outlined" value={currentUser.email} onInput={handleInput}/>
                        <DatePick label="Birthdate" disabled={!editable} value={new Date(user.birthdate)} className={styles.date} handleDateChange={setUser}/>
                        <EditButton disabled={user.firstName === "" || user.lastName === "" || user.birthdate === ""} handleClick={handleClick}/>
                    </Info>
                </Profile>
            </CustomPaper>
       
    );
}

const Profile = styled.div`
    width: 70%;
    display : flex;
    flex-direction : row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    gap: 50px;
    margin-top: 50px;
`
const ProfilePic = styled.img`
    border-radius: 50%;
    width: 350px;
`
const Info = styled.div`
    display: flex;
    flex-flow: column wrap;
    gap : 40px;
`
const CustomPaper = styled.div`
    display : flex;
    margin-top: -20px;
    padding: 30px;
    height: 100vh;
    width: 100%;
    flex-flow: column wrap;
    align-items : center;
    background: #D3CCE3;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #E9E4F0, #D3CCE3);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #E9E4F0, #D3CCE3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
   
`