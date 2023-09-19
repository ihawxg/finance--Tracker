import Paper from '@mui/material/Paper';
import { Heading, StyledPage } from "./HistoryPage";
import styled from 'styled-components';
import GoalHistory from "../GoalsHistory";
import GoalCard from "../GoalCard";
import AddGoalButton from '../AddGoalButton';
import { StyledButton } from "./BudgetsPage";
import { useSelector } from 'react-redux';
export default function GoalsPage() {
    const user = useSelector(state => state.userData.user);
    const headerOpen = useSelector(state => state.headerStatus.isOpen);
    return (
        <StyledPage status={headerOpen}>
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
    background: #D3CCE3;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #E9E4F0, #D3CCE3);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #E9E4F0, #D3CCE3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`