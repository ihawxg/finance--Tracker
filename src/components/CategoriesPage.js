import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import styles from "./styles/pages.module.css"
import AddCategoryBTN from './AddCategoryBTN';
import {editExpenseCategories, editIncomeCategories} from "../redux/actions/userActions";
import MyButton from "./MyButton";

export default function CategoriesPage(){
    const categories = useSelector(state => state.userData.user.categories);
    let counterForCategories = 0;
    const dispatch = useDispatch();

    const user = useSelector(state => state.userData.user);

    const handleClick = (cat, position) => {
        if(cat.type === "expense") {
            dispatch(editExpenseCategories(user.id, position - 1, user.expenseCategories, user.incomeCategories, user.categories, cat, cat, true));
        }
        else {
            dispatch(editIncomeCategories(user.id, position - 1, user.expenseCategories, user.incomeCategories, user.categories, cat, cat, true));
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.filterAddContainer}>
                <TextField id="standard-basic" label="Standard" variant="standard" />
                <AddCategoryBTN operation="add"/>
            </div>
            
            <div>
                <h1>Categories: </h1>
                {   
                    categories.map(cat => (
                        <>
                            <ul key={(counterForCategories + 1)*1000}>Category: {cat.name}, type: {cat.type}</ul>
                            <AddCategoryBTN key={counterForCategories++} position={counterForCategories} operation="edit"/>
                            {/* <button onClick={() => handleClick(cat, counterForCategories)}>Remove</button> */}
                            <MyButton handleClick={handleClick} cat={cat} position={counterForCategories}/>
                        </>
                        )
                    )
                }
            </div>
            
        </div>
    );
}