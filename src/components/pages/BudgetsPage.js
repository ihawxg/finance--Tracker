import { useDispatch, useSelector } from "react-redux";
import { removeBudget } from "../../redux/actions/userActions";
import FormDialog from "../FormDialog";
import { StyledPage, Heading } from "./HistoryPage";
import BudgetItem from "../BudgetItem";
import styled from 'styled-components';
export default function BudgetsPage() {
    const user = useSelector(state => state.userData.user);
    const dispatch = useDispatch();
    const handleClick = (category) => {
        dispatch(removeBudget(user, category));
    }
    const headerOpen = useSelector(state => state.headerStatus.isOpen);

    return (
        <StyledPage status={headerOpen}>
            <Heading>Budgets</Heading>
            <StyledButton>
                <FormDialog value="Budget" title="Add Budget" />
            </StyledButton>
            {
                user.budgets.map(budget => {
                    return (
                        <Container>
                            <BudgetItem
                                onClick={() => { handleClick(budget.category) }}
                                name={budget.category}
                                amount={budget.amount}
                                max={Number(budget.max)}
                                dateFrom={budget.from}
                                dateTo={budget.to}
                                gray
                            />
                        </Container>
                    );
                })
            }
        </StyledPage>
    );
}

export const StyledButton = styled.div` 
    position: fixed;
    top: 0; right: 0px;
`
const Container = styled.div`
    margin: 20px;
`