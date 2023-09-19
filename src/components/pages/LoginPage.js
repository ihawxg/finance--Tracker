import TextField from '@mui/material/TextField';
import styles from "../styles/reg_log.module.css";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../backendConfig/firebase';
import { Alert } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from '../../redux/actions/userActions';

export default function LoginPage(){

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errors, setErrors] = useState({email: false, pass: false});


    const handleInput = e => {
        if(e.target.name === "email") {
            setEmail(e.target.value.trim());
            
            setTimeout(() => {
            }, 2000);
        } else if(e.target.name === "pass") {
            setPass(e.target.value.trim());
        }

        setErrors(prevData => ({...prevData, [e.target.name]: e.target.value.trim() === ""}));
    }  

    const handleChange = () => {
        setRememberMe(prev => !prev);
    }

    const handleClick = async () => {
        try{
            await signInWithEmailAndPassword(auth, email, pass)
            .then(() => {
                if(rememberMe){
                    localStorage.setItem("currentUser", email);
                }
                sessionStorage.setItem("currentUser", email);
    
                dispatch(loginAction(email));
                navigate("/home");
            })
            .catch((error) => {
                setHasError(true);
            });
        }
        catch(err){
            setHasError(true);
        }
    } 

    return (
        <div className={styles.formContainer}>
            <Card className={styles.loginCard} style={ {height: hasError ? "440px" : "370px"}}>
                <div className={styles.Regform}>
                    <h3 className={styles.formText}>Login</h3>
                    <form className={styles.input_container}>
                        <TextField 
                            fullWidth 
                            error={errors.email}
                            id="outlined-basic" 
                            label="Email" 
                            name="email" 
                            variant="outlined" 
                            value={email}
                            inputProps={{ maxLength: 36 }} 
                            autoComplete="current-email"
                            onInput={(e) => handleInput(e)}/>
                        
                            
                        <TextField 
                            fullWidth 
                            id="outlined-password-input" 
                            label="Password" 
                            error={errors.pass}
                            value={pass}
                            inputProps={{ maxLength: 16 }} 
                            name="pass" 
                            type="password" 
                            autoComplete="current-password"
                            onInput={(e) => handleInput(e)}/>
                            
                    </form>
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