import { useSelector } from 'react-redux';
import AddCategoryBTN from './AddCategoryBTN';
import CategoryCard from "./CategoryCard";
import { StyledPage, Heading } from './HistoryPage';
import styled from 'styled-components'
import { StyledButton } from "./BudgetsPage";

export default function CategoriesPage() {
    const user = useSelector(state => state.userData.user);

    return (
        <StyledPage>
            <StyledButton>
                <AddCategoryBTN isInHome={false}/>
            </StyledButton>
            <Heading>Categories</Heading>
            <Columns>
                <Box>
                    <CenteredHeading>Income Categories</CenteredHeading>
                    { user.incomeCategories.map(cat => (
                            <CategoryCard type="Income" label={cat.name} color={cat.color} />
                        ))
                    }
                </Box>
                <Box>
                    <CenteredHeading>Expense Categories</CenteredHeading>
                    { user.expenseCategories.map(cat => (
                            <CategoryCard type="Expense" label={cat.name} color={cat.color} />
                        ))
                    }
                </Box>
            </Columns>
        </StyledPage>
    );
}
const CenteredHeading = styled(Heading)`
    width: 100%;
    color : #fff;
    border-radius: 20px 20px 0 0 ;
    background: #ad5389;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #3c1053, #ad5389);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #3c1053, #ad5389); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`
const Box = styled.div`
    text-align: center;
    width: 47%;
    display : flex;
    flex-flow : row wrap;
    justify-content : space-evenly;
    border : 1px solid rgba(68, 18, 96, .1);
    border-radius: 20px;
    box-shadow: 2px 3px 10px rgba(68, 18, 96, .2);
    padding-bottom: 20px;
    background: #D3CCE3;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #E9E4F0, #D3CCE3);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #E9E4F0, #D3CCE3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
   
`
const Columns = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    gap: 25px;
`