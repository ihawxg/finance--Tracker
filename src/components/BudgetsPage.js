import FormDialog from "./FormDialog";
import styles from "./styles/pages.module.css"

export default function BudgetsPage(){
    return (
        <div className={styles.page}>
            <h1>Budgets Page</h1>
            <FormDialog value="Budget" title="Add Budget"/>
        </div>
    );
}