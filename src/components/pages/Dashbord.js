import React from "react";
import AddCategoryBTN from '../AddCategoryBTN';
import AddGoalButton from '../AddGoalButton';
import AddAccountBTN from '../AddAccountBTN'
import styled from 'styled-components';
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getColor } from "../../utils/util";
import RecentHistoryTable from "../RecentHistoryTable";
import TotalBox from "../TotalBox";
import { Heading, StyledPage } from "./HistoryPage";
import FormDialog from '../FormDialog';
import { Account } from '../AccountItem';
import { BarChart } from "../charts/BarChart";
import { Charts } from "./ReportsPage";;


ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
    //true -> incomes / false -> expenses
    const user = useSelector(state => state.userData.user);
    const [toggle, setToggle] = React.useState(true);
    const dataMap = new Map();
    const headerOpen = useSelector(state => state.headerStatus.isOpen);
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
        <StyledPage status={headerOpen}>
            <Heading>Welcome, {user.firstName}</Heading>
            <Row>
                <ColumnWrapper>
                    <TotalBox />
                    <MainButtons>
                        <FormDialog value="Expense" title="Add an expense" />
                        <FormDialog value="Income" title="Add an income" />
                    </MainButtons>
                    <RecentHistoryTable />
                </ColumnWrapper>

                <ColumnWrapper>
                    <Widget>
                        <ChartWrapper onClick={handleClick}>
                            <h6>{toggle ? "Incomes" : "Expenses"}</h6>
                            <Pie data={metaData} options={options} />
                        </ChartWrapper>
                    </Widget>
                    <ButtonsWrapper>
                        <ButtonRow>
                            <AddAccountBTN isInHome={true} />
                            <AddCategoryBTN isInHome={true} />
                        </ButtonRow>
                        <ButtonRow>
                            <AddGoalButton sx={{ backgroundColor: 'purple' }} isInHome={true} title="Add Goal" />
                            <FormDialog value="Budget" title="Add Budget" />

                        </ButtonRow>

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
    gap: 10px;
`
const ButtonRow = styled.div`
    display : flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-left: auto;
    gap: 10px;
`
const Widget = styled(Account)`
    margin: 0;
    border-radius: 5px;
    width: 100%;
    display: flex;
    justify-content: center;
`
const Row = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content : space-evenly;
    align-items: center;
    height: 80vh;
    gap: 20px;
`
const ColumnWrapper = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

`
const ButtonsWrapper = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content : space-between;
    width: 100%;
    gap:10px;
`

const ChartWrapper = styled.div`
    min-height: 360px;
    min-width: 360px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    @media (max-width: 1158px){
        width: 411px;
    }

    @media (min-width: 1300px){
        width: 360px;
        heigth: 360px;
    }
`