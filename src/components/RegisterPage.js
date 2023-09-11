import React from "react";
import DatePick from "./DatePick";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import styles from "./styles/reg_log.module.css";
import Card from '@mui/material/Card';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from "../firebase";
import { getDocs, addDoc, updateDoc, deleteDoc, doc, collection } from "firebase/firestore";

export default function RegisterPage(){

    const [userData, setUserData] = useState({firstName: "", lastName: "", email: "", pass: "", confirm: "", birthdate: "", startBudget: ""});

    const [currency, setCurrency] = useState("");

    const [message, setMessage] = useState("You'r dead baka");

    const [hasError, setHasError] = useState(false);

    const usersCollectionRef = collection(db, "users");

    const createUser = async () => {
        //init a new User with his coresponding data
        await addDoc(usersCollectionRef, { firstName: userData.firstName,
                                            lastName: userData.lastName,
                                            email: userData.email, 
                                            birthdate: userData.birthdate,
                                            startBudget: userData.startBudget,
                                            incomes: [],
                                            expenses: [],
                                            goals: []});
    };

    const updateUser = async (id, age) => {
        // const userDoc = doc(db, "users", id);
        // const newFields = { age: age + 1 };
        // await updateDoc(userDoc, newFields);
    };

    const handleInput = e => {
        setUserData(prevData => ({...prevData, [e.target.name]: e.target.value}));
    }

    const handleClick = () => {
        setHasError(false);

        if(userData.pass !== userData.confirm){
            setHasError(true);
            setMessage("Password missmatch!")
        }
        else if(userData.email.split('@').length !== 2){
            setHasError(true);
            setMessage("Incorectly typed email!");
        }
        else{
            createUserWithEmailAndPassword(auth, userData.email, userData.pass)
            .then((userCredential) => {
                try{
                    const user = userCredential.user;
                    createUser();
                }
                catch(err){
                    setHasError(true);
                    setMessage("Unable to create an account");
                }
            })
            .catch((error) => {
                setHasError(true);
                setMessage("Account with the same email already exists!");
            });
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

    const isFilled = () => {
        return (userData.firstName && userData.lastName && userData.email && userData.pass && userData.confirm && userData.birthdate && userData.startBudget && userData.startBudget != 0);
    }

    return (
        <div className={styles.formContainer}>
            <Card className={styles.regCard}>
                
                <div className={styles.Regform}>
                <h3 className={styles.formText}>Registration</h3>
                    <div className={styles.input_container}>
                        <TextField fullWidth name="firstName" id="fname" label="First Name" variant="outlined" value={userData.firstName} onInput={e => handleInput(e)} />
                        <TextField fullWidth name="lastName" id="lname" label="Last Name" variant="outlined" value={userData.lastName} onInput={e => handleInput(e)}/>
                        <TextField fullWidth name="email" id="email" label="Email" variant="outlined" value={userData.email} onInput={e => handleInput(e)}/>
                        <TextField fullWidth name="pass" id="pass" label="Password" type="password" value={userData.pass} autoComplete="current-password" onInput={e => handleInput(e)}/>
                        <TextField fullWidth name="confirm" id="pass-rep" label="Repeat Password" type="password" value={userData.confirm} autoComplete="current-password" onInput={e => handleInput(e)}/>
                    </div>
                    <div className={styles.dateCurrencyContainer}>
                        <DatePick name="birthDate" handleDateChange={setUserData}/>
                        <TextField className={styles.startBudget} name="startBudget" id="budget" label="Start Budget" variant="outlined" onInput={e => handleInput(e)} />
                        <TextField className={styles.currency} disabled id="currency" label="Currency" value={currency} variant="filled" />
                    </div>
                    
                    <Button variant="contained" disabled={!isFilled()} onClick={handleClick}>Sign up</Button>
                
                    <div>
                        <span> You already have account? </span> <Link to="/login"> Sign in</Link>
                    </div>
                    { hasError && <Alert severity="error">{message}</Alert> }
                </div>
            </Card>
        </div>
    );
}