import  { ProgressBar } from "react-bootstrap";
import React from "react";
import styles from "./styles/progress_card.module.css"
import Card from '@mui/material/Card';
import FormDialog from "./FormDialog";
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { removeGoal } from "../redux/actions/userActions";

export default function BudgetCard(props){

    const dispatch = useDispatch();
    const user = useSelector(state => state.userData.user);

    function getProgressBarVariant(amount, max){
        const ratio = amount / max;
        if (ratio < 0.5) return "warning";
        if (ratio < 0.75) return "primary";
        return "success";
    }

    const handleClick = () => {
        dispatch(removeGoal(user, props.goal.name));
    }

    const currency = "BGN";

    return (
            <div className={styles.formContainer}>
                <Card className={styles.progCard}>
                    <div className={styles.infoContainer}>
                        <h3>{props.goal.name}</h3>
                        <h3>{`${props.goal.amount} ${currency} / ${props.goal.goal} ${currency}`}</h3>
                    </div>
                    <div className={styles.card}>
                        <ProgressBar now={props.goal.amount} className={`${styles.progress} rounded-pill`} min={0} max={props.goal.goal} variant={getProgressBarVariant(props.goal.amount, props.goal.goal)}/>
                        
                    </div>
                    <div className={styles.btnContainer}>
                        <FormDialog className={styles.btn} value="Savings" title="Add savings" goal={props.goal}/>
                        <Button className={styles.btn} variant="outlined" color="error" onClick={handleClick}>Abort Goal</Button>
                    </div>

                </Card>
            </div>  
    );   
}
