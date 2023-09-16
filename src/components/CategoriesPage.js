import { useSelector } from 'react-redux';
import styles from "./styles/pages.module.css"
import AddCategoryBTN from './AddCategoryBTN';
import CategoryCard from "./CategoryCard";
import Paper from '@mui/material/Paper';

export default function CategoriesPage(){
    const user = useSelector(state => state.userData.user);

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
        
            {/* <AddCategoryBTN operation="add"/> */}
            
            <div className={styles.bothPageContainer}>
                <Paper className={styles.categoryPage} elevation={3}>
                    <h1>Income Categories: </h1>
                    <div className={styles.container}>
                        {   
                            user.incomeCategories.map(cat => (
                                <>
                                    <CategoryCard type="Income" label={cat.name} color={cat.color}/>
                                </>
                                )
                            )
                        }
                    </div>
                </Paper>
                
                <Paper className={styles.categoryPage} elevation={3}>
                    <h1 className={styles.categoryLabel}>Expense Categories: </h1>
                    <div className={styles.container}>
                        
                        {   
                            user.expenseCategories.map(cat => (
                                <>
                                    <CategoryCard type="Expense" label={cat.name} color={cat.color}/>
                                </>
                                )
                            )
                        }
                        
                    </div>
                </Paper>
            </div>
            
        </div>
    );
}