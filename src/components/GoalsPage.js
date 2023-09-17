import Paper from '@mui/material/Paper';
import { Heading, StyledPage } from "./HistoryPage";
import styled from 'styled-components';
import GoalHistory from "./GoalsHistory";
import BudgetCard from "./BudgetCard";
import AddGoalButton from './AddGoalButton';
import { StyledButton } from "./BudgetsPage";
export default function GoalsPage() {
    let goals = [{date : "2021-12-01T14:07:28.000Z", description : "Ibanez RG320", amount : '1200'} , {date : "2021-11-01T14:20:48.000Z", description : 'Kindle Paperwhite', amount : '300'}, {date : "2022-02-09T17:13:53.000Z", description : "Plumbus", amount : "249"}];

    return (
        <StyledPage>
            <StyledButton>
                <AddGoalButton title="Add New Goal" />
            </StyledButton>
            <BudgetCard />
        <CustomPaper elevation={2} >
            <HistoryHeader>Goals history</HistoryHeader>
            <GoalHistory data={goals} />
        </CustomPaper>
        </StyledPage>
    )
}

const HistoryHeader = styled(Heading)`
    text-align: center;
`
const CustomPaper = styled(Paper)`
    margin: 20px;
    background: #A1FFCE;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #FAFFD1, #A1FFCE);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #FAFFD1, #A1FFCE); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`