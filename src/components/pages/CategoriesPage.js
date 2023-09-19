import { useSelector } from 'react-redux';
import AddCategoryBTN from '../AddCategoryBTN';
import CategoryCard from "../CategoryCard";
import { StyledPage, Heading } from './HistoryPage';
import styled from 'styled-components'
import { StyledButton } from "./BudgetsPage";
import styles from "../styles/categories.module.css";
import { uuidv4 } from '../../utils/util';

export default function CategoriesPage() {
    const user = useSelector(state => state.userData.user);
    const headerOpen = useSelector(state => state.headerStatus.isOpen);

    return (
        <StyledPage status={headerOpen}>
            <Heading>Categories</Heading>
            <StyledButton>
                <AddCategoryBTN isInHome={false}/>
            </StyledButton>
            <Columns>
                <Box>
                    <CenteredHeading>Income Categories</CenteredHeading> 
        
                    <div className={styles.container}>
                
                        { 
                            user.incomeCategories.map(cat => (
                                <CategoryCard key={uuidv4()} type="Income" label={cat.name} color={cat.color} />
                            ))
                        }
                    
                    </div>
    
                </Box>
                <Box>
                    <CenteredHeading>Expense Categories</CenteredHeading>
                    <div className={styles.container}>
        
                    { 
                        user.expenseCategories.map(cat => (
                            <CategoryCard key={uuidv4()} type="Expense" label={cat.name} color={cat.color} />
                        ))
                    }
    
                    </div>
                </Box>
            </Columns>
        </StyledPage>
    );
}
const CenteredHeading = styled(Heading)`
    width: 100%;
    height: 49px; 
    color : #fff;
    border-radius: 20px 20px 0 0 ;
    background: #ad5389;
    background: -webkit-linear-gradient(to right, #3c1053, #ad5389);
    background: linear-gradient(to right, #3c1053, #ad5389);
   
`
const Box = styled.div`
    text-align: center;
    min-width: 47%;
    display : flex;
    flex-flow : row wrap;
    
    border : 1px solid rgba(68, 18, 96, .1);
    border-radius: 20px;
    box-shadow: 2px 3px 10px rgba(68, 18, 96, .2);
    padding-bottom: 20px;
    background: #D3CCE3;
    background: -webkit-linear-gradient(to right, #E9E4F0, #D3CCE3);
    background: linear-gradient(to right, #E9E4F0, #D3CCE3);  


`
const Columns = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    gap: 25px;
`