import TextField from '@mui/material/TextField';
import styles from "./styles/pages.module.css"

export default function CategoriesPage(){
    return (
        <div className={styles.page}>
            <TextField id="standard-basic" label="Standard" variant="standard" />
        </div>
    );
}