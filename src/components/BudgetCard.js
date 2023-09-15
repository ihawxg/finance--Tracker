import  { ProgressBar } from "react-bootstrap";
import React from "react";
import styles from "./styles/progress_card.module.css"
import Card from '@mui/material/Card';
import FormDialog from "./FormDialog";
import AddGoalButton from "./AddGoalButton";
import Button from '@mui/material/Button';

export default function BudgetCard(){
    function getProgressBarVariant(amount, max){
        const ratio = amount / max;
        if (ratio < 0.5) return "warning";
        if (ratio < 0.75) return "primary";
        return "success";
    }

    const [goal, setGoal] = React.useState({min: 0, max: 120, amount: 60, name: "Tesla Model X"});
    const [hasGoal, setHasGoal] = React.useState(true);

    function handleClick(){
        setHasGoal(prevGoal => !prevGoal);
    }

    const currency = "BGN";

    return (
        <div className={styles.formContainer}>
            {hasGoal && <Card className={styles.progCard}>
                <div className={styles.infoContainer}>
                    <h3>{goal.name}</h3>
                    <h3>{`${goal.amount} ${currency} / ${goal.max} ${currency}`}</h3>
                </div>
                <div className={styles.card}>
                    <ProgressBar now={goal.amount} className={`${styles.progress} rounded-pill`} min={goal.min} max={goal.max} variant={getProgressBarVariant(goal.amount, goal.max)}/>
                    
                </div>
                <div className={styles.btnContainer}>
                    <FormDialog className={styles.btn} clickAction={(amount) => setGoal(prev => ({...prev, amount: prev.amount + amount}))} value="Savings" title="Add savings"/>
                    <Button className={styles.btn} variant="outlined" color="error" onClick={handleClick}>Abort Goal</Button>
                </div>

            </Card>}
            {!hasGoal && <AddGoalButton title="Add Goal" setGoal={setGoal} setHasGoal={setHasGoal}/>}
        </div>
    );
    
}

