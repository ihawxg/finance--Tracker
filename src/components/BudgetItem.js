import React, {useEffect, useState} from 'react';
import { toCurrency, getBudgetProgress, formatDateNoDay } from "../utils/util";
import { Card, ProgressBar, Stack } from 'react-bootstrap';
import Button from '@mui/material/Button';
import FormDialog from "./FormDialog";
import { useSelector } from 'react-redux';
import styled from "styled-components";
import { CardButtons } from './GoalCard';
export default function BudgetItem({ name, amount, max, onClick, gray, dateFrom, dateTo }) {

    const currency = useSelector(state => state.userData.user.currency);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const classNames = []
    if(amount > max) {
        classNames.push('bg-danger', 'bg-opacity-10');
    }   else if(gray) {
        classNames.push('bg-light', 'bg-opacity-80');
    }
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])

    return(
        <Card className={classNames.join(" ")}>
            <Card.Body>
                <Card.Title className='d-flex flex-wrap justify-content-between align-items-baseline fw-normal mb-3'>
                    <div className='me-2'>{name}</div>
                    <div className='text-muted fs-6'>{formatDateNoDay(dateFrom)} - {formatDateNoDay(dateTo)}</div>
                    <div className='d-flex flex-wrap align-items-baseline'>
                        {toCurrency(amount, currency)} 
                        <span className='text-muted fs-6 ms-1'>/ {toCurrency(max, currency)}</span>
                    </div>
                </Card.Title>
                <ProgressBar 
                    className="rounded-pill" 
                    variant={getBudgetProgress(amount, max)}
                    min={0}
                    max={max} 
                    now={amount}    
                />
                <CardButtons className='mt-4'>
                    <FormDialog value="Budget" title="Edit Budget" operation="edit" editdetails={ {name, max, dateFrom, dateTo} }/>
                    <Button fullWidth={windowWidth < 768} variant="contained" color="error" className='ms-auto' onClick={onClick}> Remove </Button>
                </CardButtons>
                
                           
            </Card.Body>
        </Card>
    )

}