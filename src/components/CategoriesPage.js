import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import styles from "./styles/pages.module.css"
import AddCategoryBTN from './AddCategoryBTN';

export default function CategoriesPage(){
    const categories = useSelector(state => state.userData.user.categories);
    let counterForCategories = 0;
    // let counterForSpecificType = 0;
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
                            <ul key={counterForCategories}>Category: {cat.name}, type: {cat.type}</ul>
                            <AddCategoryBTN key={counterForCategories} position={counterForCategories} operation="edit"/>
                            {counterForCategories++}
                        </>
                    ))}
            </div>

        </div>
    );
}