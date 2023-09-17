import { ProgressBar, Stack, Card } from "react-bootstrap";
import React from "react";
import FormDialog from "./FormDialog";
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { removeGoal } from "../redux/actions/userActions";
import { getProgressBarVariant, toCurrency } from '../utils/util';

export default function GoalCard(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userData.user);
    const handleClick = () => {
        dispatch(removeGoal(user, props.goal.name));
    }

    const currency = useSelector(state => state.userData.user.currency);

    return (

        <Card className="bg-light mb-3">
            <Card.Body>
                <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                    <div className='me-2'>{props.goal.name}</div>
                    <div className='d-flex align-items-baseline'>
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
                <Stack direction='horizontal' gap='2' className='mt-4'>
                    <FormDialog value="Budget" value="Savings" title="Add Savings" goal={props.goal} />
                    <Button variant="contained" color="error" className='ms-auto' onClick={handleClick}> Abort Goal </Button>
                </Stack>
            </Card.Body>
        </Card>
    );
}
