import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import styles from "./styles/pages.module.css"
import AddCategoryBTN from './AddCategoryBTN';
import CategoryCard from "./CategoryCard";

export default function CategoriesPage(){
    const dispatch = useDispatch();

    const user = useSelector(state => state.userData.user);

    return (
        <div className={styles.page}>
            <div className={styles.filterAddContainer}>
                <TextField id="standard-basic" label="Standard" variant="standard" />
                <AddCategoryBTN operation="add"/>
            </div>
            
            <div>
                <h1>Income Categories: </h1>
                <div className={styles.container}>
                    {   
                        user.incomeCategories.map(cat => (
                            <>
                                <CategoryCard label={cat.name} color={cat.color}/>
                            </>
                            )
                        )
                    }
                </div>
                
                <h1>Expense Categories: </h1>
                <div className={styles.container}>
                    
                    {   
                        user.expenseCategories.map(cat => (
                            <>
                                <CategoryCard label={cat.name} color={cat.color}/>
                            </>
                            )
                        )
                    }
                </div>
            </div>
            
        </div>
    );
}