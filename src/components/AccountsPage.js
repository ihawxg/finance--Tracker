import styles from "./styles/pages.module.css"
import AddAccountBTN from "./AddAccountBTN";

export default function AccountsPage(){
    return (
        <div className={styles.page}>
            <h1>Accounts Page</h1>
            <AddAccountBTN />
        </div>
    );
}