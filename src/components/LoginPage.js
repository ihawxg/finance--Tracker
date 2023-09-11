import TextField from '@mui/material/TextField';
import styles from "./styles/reg_log.module.css";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Alert } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function LoginPage(){

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleInput = e => {
        if(e.target.name === "loginEmail") {
            setEmail(e.target.value.trim());
        } else if(e.target.name === "loginPass") {
            setPass(e.target.value.trim());
        } 
    }

    const handleChange = () => {
        setRememberMe(prev => !prev);
        console.log(rememberMe);
    }

    const handleClick = () => {
        signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            const user = userCredential.user;
            if(rememberMe){
                localStorage.setItem("currenctUser", email);
            } 
            navigate("/home");
        })
        .catch((error) => {
            setHasError(true)
        });
    }

    return (
        <div className={styles.formContainer}>
            <Card className={styles.loginCard}>
                <div className={styles.Regform}>
                    <h3 className={styles.formText}>Login</h3>
                    <div className={styles.input_container}>
                        <TextField 
                            fullWidth 
                            id="outlined-basic" 
                            label="Email" 
                            name="loginEmail" 
                            variant="outlined" 
                            onInput={(e) => handleInput(e)}/>
                        <TextField 
                            fullWidth 
                            id="outlined-password-input" 
                            label="Password" 
                            name="loginPass" 
                            type="password" 
                            autoComplete="current-password"
                            onInput={(e) => handleInput(e)}/>
                    </div>
                    <div className={styles.btnCheckContainer}>
                        <FormControlLabel control={<Checkbox checked={rememberMe} onChange={handleChange}/>} label="Remember me" />
                        <Button variant="contained" disabled={(email && pass) ? false : true} onClick={handleClick}>Sign in</Button>
                    </div>
                    <span> Need an account? </span> <Link to="/register"> Sign up</Link>
                    { hasError && <Alert severity="error">You have entered wrong credentials! Please try again</Alert> }
                </div>    
            </Card>
        </div>
    );
}