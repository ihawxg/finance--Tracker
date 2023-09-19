import { ProgressBar, Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import FormDialog from "./FormDialog";
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { removeGoal } from "../redux/actions/userActions";
import { getProgressBarVariant, toCurrency } from '../utils/util';
import styled from "styled-components";

export default function GoalCard(props) {
    const dispatch = useDispatch();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const user = useSelector(state => state.userData.user);
    const handleClick = () => {
        dispatch(removeGoal(user, props.goal.name));
    }
    const currency = useSelector(state => state.userData.user.currency);
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])

    return (

        <Card className="bg-light mb-3">
            <Card.Body>
                <Card.Title className='d-flex flex-wrap justify-content-between align-items-baseline fw-normal mb-3'>
                    <div className='me-2'>{props.goal.name}</div>
                    <div className='d-flex flex-wrap align-items-baseline'>
                        {toCurrency(props.goal.amount, currency)}
                        <span className='text-muted fs-6 ms-1'>/ {toCurrency(props.goal.goal, currency)}</span>
                    </div>
                </Card.Title>
                <ProgressBar
                    className="rounded-pill"
                    variant={getProgressBarVariant(props.goal.amount, props.goal.goal)}
                    min={0}
                    max={props.goal.goal}
                    now={props.goal.amount}
                />
                <CardButtons className='mt-4 flex-wrap'>
                    <FormDialog value="Savings" title="Add Savings" goal={props.goal} />
                    <Button fullWidth={windowWidth < 768} variant="contained" color="error" className='ms-auto' onClick={handleClick}> Abort Goal </Button>
                </CardButtons>
            </Card.Body>
        </Card>
    );
}

export const CardButtons = styled.div` 
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @media (max-width: 768px) {
        flex-direction : column;
        gap: 10px;
    }

`