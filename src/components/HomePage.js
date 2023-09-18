import React from "react";
import AddCategoryBTN from './AddCategoryBTN';
import AddGoalButton from './AddGoalButton';
import AddAccountBTN from './AddAccountBTN'
import styled from 'styled-components';
import styles from './styles/total_box.module.css';
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getColor } from "../utils/util";
import RecentHistoryTable from "./RecentHistoryTable";
import TotalBoxTest from "./TotalBoxTest";
import { Heading, StyledPage } from "./HistoryPage";
import FormDialog from './FormDialog';
import { Account } from './AccountItem';


ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
    //true -> incomes / false -> expenses
    const user = useSelector(state => state.userData.user);
    const [toggle, setToggle] = React.useState(true);
    const dataMap = new Map();

    const handleClick = () => {
        setToggle(prev => !prev);
    }

    if (toggle) {
        //in case of incomes
        user.accounts.forEach(acc => {
            acc.incomes.forEach(inc => {
                if (dataMap.has(inc.category)) {
                    dataMap.set(inc.category, { ...dataMap.get(inc.category), amount: dataMap.get(inc.category).amount + Number(inc.amount) });
                }
                else {
                    dataMap.set(inc.category, { amount: Number(inc.amount), color: getColor(user, inc.category, "income") });
                }
            })
        })
    }
    else {
        //in case of expenses
        user.accounts.forEach(acc => {
            acc.expenses.forEach(exp => {
                if (dataMap.has(exp.category)) {
                    dataMap.set(exp.category, { ...dataMap.get(exp.category), amount: dataMap.get(exp.category).amount + Number(exp.amount) });
                }
                else {
                    dataMap.set(exp.category, { amount: Number(exp.amount), color: getColor(user, exp.category, "expense") });
                }
            })
        })
    }
    let labels = Array.from(dataMap.keys());
    let data = Array.from(dataMap.values()).map(data => data.amount);
    let colors = Array.from(dataMap.values()).map(data => data.color);
    const metaData = {
        labels,
        datasets: [
            {
                label: toggle ? "Incomes Chart" : "Expenses Chart",
                data,
                backgroundColor: colors,
            }
        ],
    };
    const options = {
        plugins: {
            legend: {
                display: true
            },
        }
    }

    return (
        <StyledPage>
            <Heading>Welcome, {user.firstName}</Heading>
            <Row>
                <ColumnWrapper>
                    <TotalBoxTest />
                    <MainButtons> <FormDialog value="Expense" title="Add an expense" />
                        <FormDialog value="Income" title="Add an income" /></MainButtons>
                    <RecentHistoryTable />
                </ColumnWrapper>

                <ColumnWrapper>
                    <Widget>
                        <ChartWrapper onClick={handleClick}>
                            <Pie data={metaData} options={options} />
                        </ChartWrapper>
                    </Widget>
                    <ButtonsWrapper>

                        <AddAccountBTN isInHome={true} />
                        <AddCategoryBTN isInHome={true} />
                        <AddGoalButton sx={{ backgroundColor: 'purple' }} title="Add Goal" />
                        <FormDialog value="Budget" title="Add Budget" />

                    </ButtonsWrapper>
                </ColumnWrapper>
            </Row>
        </StyledPage>
    )
}
const MainButtons = styled.div`
    display: flex;
    flex-direction : row;
    justify-content: space-between;
    width: 100%;
`
const Widget = styled(Account)`
    margin: 0;
    padding: 20px;
    border-radius: 5px;
`
const Row = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content : space-between;
`
const ColumnWrapper = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
`
const ButtonsWrapper = styled.div`
    // position:fixed;
    // right: 80px; bottom : 30px;
    display: flex;
    flex-flow: row wrap;
    justify-content : flex-start;
    gap : 5px;
    width: 410px;
`

const ChartWrapper = styled.div`
    height: 360px;
    width:360px;
    margin-left: auto;
    
`