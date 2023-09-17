import BudgetCard from "./BudgetCard";
import UserInfo from "./UserInfo";
import GoalHistory from "./GoalsHistory";
import styles from "./styles/info.module.css"
import Paper from '@mui/material/Paper';
import { Heading } from "./HistoryPage";
import styled from 'styled-components';

export default function ProfilePage(){
    let goals = [{date : "2021-12-01T14:07:28.000Z", description : "Ibanez RG320", amount : '1200'} , {date : "2021-11-01T14:20:48.000Z", description : 'Kindle Paperwhite', amount : '300'}, {date : "2022-02-09T17:13:53.000Z", description : "Plumbus", amount : "249"}];
    return (
        <div className={styles.userContainer}>
            <UserInfo />
        </div>
    );
}
const HistoryHeader = styled(Heading)`
    text-align: center;
`
const CustomPaper = styled(Paper)`
    background: #A1FFCE;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #FAFFD1, #A1FFCE);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #FAFFD1, #A1FFCE); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`