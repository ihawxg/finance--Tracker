import { useDispatch, useSelector } from "react-redux";
import { removeBudget } from "../../redux/actions/userActions";
import FormDialog from "../FormDialog";
import { StyledPage, Heading } from "./HistoryPage";
import BudgetItem from "../BudgetItem";
import styled from 'styled-components';
import { uuidv4 } from "../../utils/util";

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
                <FormDialog key={uuidv4()} value="Budget" title="Add Budget" />
            </StyledButton>
            {
                user.budgets.map(budget => {
                    return (
                        <Container key={uuidv4()}>
                            <BudgetItem
                                key={uuidv4()}
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

    @media (max-width: 768px) {
        width: 100%;
        position: relative;
        margin-bottom: 20px;
    }

`
const Container = styled.div`
    margin: 20px;
`