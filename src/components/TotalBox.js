import styles from "./styles/total_box.module.css";
import { BsWallet2, BsArrowUpRight, BsArrowDownRight, BsReceipt } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function TotalBox(props){
    let details = 0;
    const user = useSelector(state => state.userData.user);
    let icon = <BsWallet2 />;
    let label;
    const currency = "BGN";

    let style = styles.totalBalance;
    switch(props.name){
        case "incomes": 
            user.accounts.forEach(acc => {
                acc.incomes.forEach(inc => details += Number(inc.amount));
            });
            style = styles.totalIncomes;
            icon = <BsArrowUpRight />;
            label = "Total Incomes ";
        break;

        case "expenses": 
            user.accounts.forEach(acc => {
                acc.expenses.forEach(exp => details += Number(exp.amount));
            });
            style = styles.totalExpenses;
            icon = <BsArrowDownRight />;
            label = "Total Expenses ";
        break;

        case "transactions": 
            user.accounts.forEach(acc => {
                details += acc.expenses.length + acc.incomes.length;
            });
            style = styles.totalTransactions;
            icon = <BsReceipt />;
            label = "Total Transactions ";
        break;

        case "balance": 
            user.accounts.forEach(acc => details += Number(acc.total));
            style = styles.totalBalance;
            icon = <BsWallet2 />;
            label = "Balance ";
        break;
    }

    return (
        <div className={style}>
            <h2 className={styles.detailsText}> {label} {icon} </h2>
            <h1 className={styles.detailsText}> {details} { props.name !== "transactions" ? currency : ""} </h1>
        </div>
    );
}