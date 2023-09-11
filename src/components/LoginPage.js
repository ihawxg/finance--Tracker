import TextField from '@mui/material/TextField';
import styles from "./styles/reg_log.module.css";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function LoginPage(){
    return (
        <div className={styles.formContainer}>
            <Card className={styles.loginCard}>
                <div className={styles.Regform}>
                    <h3 className={styles.formText}>Login</h3>
                    <div className={styles.input_container}>
                        <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" />
                        <TextField fullWidth id="outlined-password-input" label="Password" type="password" autoComplete="current-password"/>
                    </div>
                    <div className={styles.btnCheckContainer}>
                        <FormControlLabel control={<Checkbox />} label="Remember me" />
                        <Button variant="contained">Sign in</Button>
                    </div>
                    <Link to="/register"> You don't have an account? Sign up</Link>
                </div>    
            </Card>
        </div>
    );
}