import Container from 'react-bootstrap/Container';
import { toCurrency, getBudgetProgress } from "../utils/util";
import { Card, ProgressBar, Stack } from 'react-bootstrap';
import Button from '@mui/material/Button';
import FormDialog from "./FormDialog";

export default function BudgetItem({ name, amount, max, onClick, gray, dateFrom, dateTo }) {

    const classNames = []
    if(amount > max) {
        classNames.push('bg-danger', 'bg-opacity-10')
    }   else if(gray) {
        classNames.push('bg-light', 'bg-opacity-80')
    }
    const getDateString = (date) => {
        let month;
        if(typeof date === 'string') {
            date = new Date(date);
        }
        switch (date.getMonth()) {
            case 0: month = "January"; break;
            case 1: month = "February"; break;
            case 2: month = "March"; break;
            case 3: month = "April"; break;
            case 4: month = "May"; break;
            case 5: month = "June"; break;
            case 6: month = "July"; break;
            case 7: month = "August"; break;
            case 8: month = "September"; break;
            case 9: month = "October"; break;
            case 10: month = "November"; break;
            case 11: month = "December"; break;
        }
        return `${month} ${date.getDate()}, ${date.getFullYear()}`
    }
    return(
        <Card className={classNames.join(" ")}>
            <Card.Body>
                <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                    <div className='me-2'>{name}</div>
                    <div className='text-muted fs-6'>{getDateString(dateFrom)} - {getDateString(dateTo)}</div>
                    <div className='d-flex align-items-baseline'>
                        {toCurrency(amount)} 
                        <span className='text-muted fs-6 ms-1'>/ {toCurrency(max)}</span>
                    </div>
                </Card.Title>
                <ProgressBar 
                    className="rounded-pill" 
                    variant={getBudgetProgress(amount, max)}
                    min={0}
                    max={max} 
                    now={amount}    
                />
                <Stack direction='horizontal' gap='2' className='mt-4'>
                    <FormDialog value="Budget" title="Edit Budget" operation="edit" />
                    <Button variant="outlined" color="error" className='ms-auto' onClick={onClick}> Remove </Button>
                </Stack>
                
                           
            </Card.Body>
        </Card>
    )

}