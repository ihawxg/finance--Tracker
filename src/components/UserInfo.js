import styles from "./styles/info.module.css"
import TextField from '@mui/material/TextField';
import DatePick from './DatePick';
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import EditButton from './EditButton';
import { updateAvatarAction, updateUserInfoAction } from '../redux/actions/userActions';
import styled from 'styled-components';
import { Heading } from './pages/HistoryPage';
import { setSnackbar } from "../redux/actions/snackbarActions";
export default function UserInfo(){

    const [editable, setEditable] = React.useState(false);
    
    const currentUser = useSelector(state => state.userData.user);

    const dispatch = useDispatch();

    const [user, setUser] = React.useState({firstName: currentUser.firstName, lastName: currentUser.lastName, birthdate: currentUser.birthdate});

    const [pic, setPic] = React.useState(currentUser.avatar);

    const handleClick = () => {
        const currentYear = new Date().getFullYear();
        if((currentYear - Number(user.birthdate.slice(0,4))) < 18){
            dispatch(setSnackbar(true, "error", `You cannot edit your birthdate to be underage!`));
            setEditable(prev => !prev);
            return;
        }
        if(editable){
            dispatch(updateUserInfoAction(currentUser.id, user));
        }
        setEditable(prev => !prev);
    }

    const handlePictureUpdate = (ev) => {
        const path = ev.target.value.split("\\")[2];
        const extension = path.split(".")[1];
        if(extension !== "png" && extension !== "jpg"){
            dispatch(setSnackbar(true, "warning", "You are trying to upload a file that is not an image!"));
            return;
        }
        dispatch(updateAvatarAction(currentUser, path));
        setPic(path);
    }

    const handleInput = (ev) => {
        setUser(prev => ({...prev, [ev.target.name]: ev.target.value}));
    }

    return (
            <CustomPaper>
                <HeadingProfile>My Profile</HeadingProfile>
                <Profile>
                    <ProfilePic src={pic} alt="profile-pic"></ProfilePic>
                    <Info>
                        <TextField disabled={!editable} id="fname" name="firstName" label="First Name" variant="outlined" value={user.firstName} onInput={handleInput} />
                        <TextField disabled={!editable} id="lname" name="lastName" label="Last Name" variant="outlined" value={user.lastName} onInput={handleInput} />
                        <TextField disabled name="email" id="email" label="Email" variant="outlined" value={currentUser.email} onInput={handleInput}/>
                        <DatePick label="Birthdate" disabled={!editable} value={new Date(user.birthdate)} className={styles.date} handleDateChange={setUser}/>
                        <EditButton disabled={user.firstName === "" || user.lastName === "" || user.birthdate === ""} handleClick={handleClick}/>
                        <div className={styles.inputWrapper}>
                            <input className={styles.fileInput} onChange={handlePictureUpdate} type="file" name="file1"/>
                            <UploadButton>Upload Avatar</UploadButton>
                        </div>
                    </Info>
                </Profile>
            </CustomPaper> 
    );
}
const HeadingProfile = styled(Heading)`
    width: 80%;
    text-align: center;
    margin-top: -10px;
`
const Profile = styled.div`
    width: 70%;
    display : flex;
    flex-direction : row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    gap: 50px;
    margin-top: 25px;
    @media (max-width: 768px) {
        flex-direction : column;
        justify-content: flex-start;
       
    }
`
const ProfilePic = styled.img`
    border-radius: 50%;
    max-width: 350px;
    @media (max-width: 768px) {
        width: 200px;
    }
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
    height: 100%;
    width: 100%;
    flex-flow: column wrap;
    align-items : center;
    background: #D3CCE3;
    background: -webkit-linear-gradient(to right, #E9E4F0, #D3CCE3);
    background: linear-gradient(to right, #E9E4F0, #D3CCE3);
`
const UploadButton = styled.span` 
    font-weight: 300;
    font-size: 14px;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
`