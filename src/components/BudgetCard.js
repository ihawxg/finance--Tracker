import  { ProgressBar } from "react-bootstrap";
import React from "react";
import styles from "./styles/progress_card.module.css"
import Card from '@mui/material/Card';
import FormDialog from "./FormDialog";

export default function BudgetCard({ amount, min, max, name }){
    function getProgressBarVariant(amount, max){
        const ratio = amount / max;
        if (ratio < 0.5) return "primary";
        if (ratio < 0.75) return "warning";
        return "danger";
    }

    const currency = "BGN";

    return (
        <div className={styles.formContainer}>
            <Card className={styles.progCard}>
                <div className={styles.infoContainer}>
                    <h3>{name}</h3>
                    <h3>{`${amount} ${currency} / ${max} ${currency}`}</h3>
                </div>
                <div className={styles.card}>
                    <ProgressBar now={amount} className={`${styles.progress} rounded-pill`} min={min} max={max} variant={getProgressBarVariant(amount, max)}/>
                </div>

                <FormDialog value="Savings" title="Add savings"/>

            </Card>
        </div>
    );

}