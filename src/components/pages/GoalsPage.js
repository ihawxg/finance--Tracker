import Paper from '@mui/material/Paper';
import { Heading, StyledPage } from "./HistoryPage";
import styled from 'styled-components';
import GoalHistory from "../GoalsHistory";
import GoalCard from "../GoalCard";
import AddGoalButton from '../AddGoalButton';
import { StyledButton } from "./BudgetsPage";
import { useSelector } from 'react-redux';
import { uuidv4 } from "../../utils/util";

export default function GoalsPage() {
    const user = useSelector(state => state.userData.user);
    const headerOpen = useSelector(state => state.headerStatus.isOpen);
    return (
        <StyledPage status={headerOpen} key={uuidv4()}>
            <StyledButton key={uuidv4()}>
                <AddGoalButton key={uuidv4()} title="Add New Goal" />
            </StyledButton>
            <Heading key={uuidv4()}>Goals</Heading>
            { user.goals.filter(goal => goal.status === "ongoing")
                        .map(goal => <GoalCard key={uuidv4()} goal={goal} />)
            }
            <CustomPaper elevation={2} key={uuidv4()}>
                <HistoryHeader key={uuidv4()}>Goals history</HistoryHeader>
                <GoalHistory key={uuidv4()} data={ user.goals.filter(goal => goal.status === "completed" || goal.status === "aborted") } />
            </CustomPaper>
        </StyledPage>
    )
}

const HistoryHeader = styled(Heading)`
    text-align: center;
`
const CustomPaper = styled(Paper)`
    margin-top: 25px;
    background: #D3CCE3; 
    background: -webkit-linear-gradient(to right, #E9E4F0, #D3CCE3);
    background: linear-gradient(to right, #E9E4F0, #D3CCE3);
`