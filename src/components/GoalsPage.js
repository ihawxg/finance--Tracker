import Paper from '@mui/material/Paper';
import { Heading, StyledPage } from "./HistoryPage";
import styled from 'styled-components';
import GoalHistory from "./GoalsHistory";
import GoalCard from "./GoalCard";
import AddGoalButton from './AddGoalButton';
import { StyledButton } from "./BudgetsPage";
import { useSelector } from 'react-redux';
export default function GoalsPage() {
    const user = useSelector(state => state.userData.user);
    return (
        <StyledPage>
            <StyledButton>
                <AddGoalButton title="Add New Goal" />
            </StyledButton>
            <Heading>Goals</Heading>
            { user.goals.filter(goal => goal.status === "ongoing")
                        .map(goal => <GoalCard goal={goal} />)
            }
            <CustomPaper elevation={2} >
                <HistoryHeader>Goals history</HistoryHeader>
                <GoalHistory data={ user.goals.filter(goal => goal.status === "completed" || goal.status === "aborted") } />
            </CustomPaper>
        </StyledPage>
    )
}

const HistoryHeader = styled(Heading)`
    text-align: center;
`
const CustomPaper = styled(Paper)`
    margin-top: 25px;
    background: #A1FFCE;
    background: -webkit-linear-gradient(to right, #FAFFD1, #A1FFCE);
    background: linear-gradient(to right, #FAFFD1, #A1FFCE);
`