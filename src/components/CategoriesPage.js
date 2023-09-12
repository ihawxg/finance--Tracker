import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import styles from "./styles/pages.module.css"
import AddCategoryBTN from './addCategoryBTN';

export default function CategoriesPage(){
    const categories = useSelector(state => state.userData.user);
    return (
        <div className={styles.page}>
            <div className={styles.filterAddContainer}>
                <TextField id="standard-basic" label="Standard" variant="standard" />
                <AddCategoryBTN/>
            </div>

            <div>
                <h1>Expenses: </h1>
                {categories.expenseCategories.map(cat => (<ul key={cat}>{cat}</ul>))};

                <h1>Incomes: </h1>
                {categories.incomeCategories.map(cat => (<ul key={cat}>{cat}</ul>))};
            </div>

        </div>
    );
}