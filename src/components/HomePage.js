import AddButtons from "./AddButtons";
import styled from 'styled-components';
import styles from './styles/total_box.module.css';
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getColor } from "../utils/util";
import RecentHistoryTable from "./RecentHistoryTable";
import TotalBoxTest from "./TotalBoxTest";
import { StyledPage } from "./HistoryPage";
import React from "react";
import FormDialog from "./FormDialog";
import AddAccountBTN from "./AddAccountBTN";
import AddCategoryBTN from "./AddCategoryBTN";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
    //true -> incomes / false -> expenses
    const user = useSelector(state => state.userData.user);
    const [toggle, setToggle] = React.useState(true);
    const dataMap = new Map();

    const handleClick = () => {
        setToggle(prev => !prev);
    }

    if(toggle){
        //in case of incomes
        user.accounts.forEach(acc => {
            acc.incomes.forEach(inc => {
                if(dataMap.has(inc.category)){
                    dataMap.set(inc.category, {...dataMap.get(inc.category), amount: dataMap.get(inc.category) + Number(inc.amount)});
                }
                else{
                    dataMap.set(inc.category, {amount: Number(inc.amount), color: getColor(user, inc.category, "Income")});
                }
            })
        })
    } 
    else{
        //in case of expenses
        user.accounts.forEach(acc => {
            acc.expenses.forEach(exp => {
                if(dataMap.has(exp.category)){
                    dataMap.set(exp.category, {...dataMap.get(exp.category), amount: dataMap.get(exp.category) + Number(exp.amount)});
                }
                else{
                    dataMap.set(exp.category, {amount: Number(exp.amount), color: getColor(user, exp.category, "Expense")});
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
            label: toggle ? "Income Chart" : "Expense Chart",
            data,
            backgroundColor: colors,
          }
        ],
      };

    const options = {
        plugins: {
            legend: {
                display: false
            }
        }
    }

    return (
        <StyledPage>

            <div className={styles.homePageContainer}>
                <div classnName={styles.sectionContainer}>
                    <TotalBoxTest/>
                </div>
            
                <div classnName={styles.sectionContainer}>
                    <div className={styles.pie} onClick={handleClick}>
                        <Pie data={metaData} options={options}/>
                    </div>
                </div>
            
                <div classnName={styles.sectionContainer}>
                    <div className={styles.btnsContainer}>
                        <FormDialog value="Expense" title="Add an expense"/>
                        <FormDialog value="Income" title="Add an income" />
                        <FormDialog value="Savings" title="Add to savings" />
                        <AddAccountBTN />
                        <AddCategoryBTN />
                    </div>
                </div>
            
                <div classnName={styles.sectionContainer}>
                    <RecentHistoryTable/>
                </div>
            </div>
            
        </StyledPage>
    )
}