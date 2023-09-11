import BudgetCard from "./BudgetCard";
import UserInfo from "./UserInfo";
import GoalHistory from "./GoalsHistory";
import styles from "./styles/info.module.css"
import Paper from '@mui/material/Paper';

export default function ProfilePage(){
    return (
        <div className={styles.userContainer}>
            <UserInfo />
            <BudgetCard />
            <Paper elevation={2} className={styles.goalContainer}>
                <GoalHistory />
            </Paper>
        </div>
    );
}