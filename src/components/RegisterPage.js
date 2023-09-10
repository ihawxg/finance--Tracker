import React from "react";
import DatePick from "./DatePick";
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { Link, renderMatches } from "react-router-dom";
import styles from "./styles/reg_log.module.css";
import Card from '@mui/material/Card';

export default function RegisterPage(){

    const [currency, setCurrency] = React.useState("");

    React.useEffect( () => {
        function getCurrency(country){
            fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
            .then(resp => resp.json())
            .then(data => setCurrency(Object.keys(data[0].currencies)[0]))

        }

        fetch("https://spott.p.rapidapi.com/places/ip/me", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "spott.p.rapidapi.com",
                "x-rapidapi-key": "c53e90f3c9msh82b20dd55873607p113bc7jsnf803978e85bc"
            }
        })
        .then(resp => resp.json())
        .then(data => {
            if(typeof data.country != "undefined"){
                getCurrency(data.country.name);
            }
            else{
                getCurrency(data.name);
            }
        })
    }, []);

    return (
        <div className={styles.formContainer}>
            <Card className={styles.regCard}>
                <div className={styles.Regform}>
                <h3 className={styles.formText}>Registration</h3>
                    <div className={styles.input_container}>
                        <TextField fullWidth id="fname" label="First Name" variant="outlined" />
                        <TextField fullWidth id="lname" label="Last Name" variant="outlined" />
                        <TextField fullWidth id="email" label="Email" variant="outlined" />
                        <TextField fullWidth id="pass" label="Password" type="password" autoComplete="current-password"/>
                        <TextField fullWidth id="pass-rep" label="Repeat Password" type="password" autoComplete="current-password"/>
                    </div>
                    <div className={styles.dateCurrencyContainer}>
                        <DatePick />
                        <TextField className={styles.currency} disabled id="filled-disabled" label="Currency" value={currency} variant="filled" />
                    </div>
                    <div className={styles.btnCheckContainer}>
                        <FormControlLabel control={<Checkbox />} label="Remember me" />
                        <Button variant="contained">Sign up</Button>
                    </div>
                        <Link to="/login"> You already have account? Sign in</Link>
                </div>
            </Card>
        </div>
    );
}