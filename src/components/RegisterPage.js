import React from "react";
import DatePick from "./DatePick";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import styles from "./styles/reg_log.module.css";
import Card from '@mui/material/Card';
import { useState } from 'react';
export default function RegisterPage(){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirm, setConfrim] = useState("");
    // const [birthDate, setBirthDate] = useState("");
    const [currency, setCurrency] = useState("");

    const handleInput = e => {
        switch(e.target.name) {
            case "firstName" :
                setFirstName(e.target.value.trim());
                break;
            case "lastName":
                setLastName(e.target.value.trim());
                break;
            case "email":
                setEmail(e.target.value.trim());
                break;
            case "pass":
                setPass(e.target.value.trim());
                break;
            case "confirm":
                setConfrim(e.target.value.trim());
                break;
            default :
                return "";           
        }
    }

    //getting the local currency of the user
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

    const handleDateChange = (ev) => {
        console.log("Vasko");
        console.log(ev.target.value);
    }

    return (
        <div className={styles.formContainer}>
            <Card className={styles.regCard}>
                <div className={styles.Regform}>
                <h3 className={styles.formText}>Registration</h3>
                    <div className={styles.input_container}>
                        <TextField fullWidth name="firstName" id="fname" label="First Name" variant="outlined" onInput={e => handleInput(e)} />
                        <TextField fullWidth name="lastName" id="lname" label="Last Name" variant="outlined" onInput={e => handleInput(e)}/>
                        <TextField fullWidth name="email" id="email" label="Email" variant="outlined" onInput={e => handleInput(e)}/>
                        <TextField fullWidth name="pass" id="pass" label="Password" type="password" autoComplete="current-password" onInput={e => handleInput(e)}/>
                        <TextField fullWidth name="confirm" id="pass-rep" label="Repeat Password" type="password" autoComplete="current-password" onInput={e => handleInput(e)}/>
                    </div>
                    <div className={styles.dateCurrencyContainer}>
                        <DatePick name="birthDate" onChange={handleDateChange}/>
                        <TextField className={styles.currency} disabled id="filled-disabled" label="Currency" value={currency} variant="filled" />
                    </div>
                    
                    <Button variant="contained">Sign up</Button>
                
                    <Link to="/login"> You already have account? Sign in</Link>

                </div>
            </Card>
        </div>
    );
}