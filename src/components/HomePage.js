import React from "react";
import AddButtons from "./AddButtons";
import styled from 'styled-components';
import styles from './styles/total_box.module.css';
import TotalBox from "./TotalBox";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Button from '@mui/material/Button';
import LegendField from "./LegendField";
import { getColor } from "../utils/util";
import RecentHistoryTable from "./RecentHistoryTable";


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
                    dataMap.set(inc.category, {amount: Number(inc.amount), color: getColor(user, inc.category, "income")});
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
                    dataMap.set(exp.category, {amount: Number(exp.amount), color: getColor(user, exp.category, "expense")});
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

    let br = 0;

    return (
        <HomePage>
            
            <div className={styles.overAllContainer}>
                <div className={styles.containerBoxAll}>
                    <div className={styles.containerBoxTwo}>
                        <TotalBox name="balance"/>
                        <TotalBox name="transactions"/>               
                    </div>
                    <div className={styles.containerBoxTwo}>
                        <TotalBox name="incomes"/>
                        <TotalBox name="expenses"/>
                    </div>
                </div>
            </div>
            <div className={styles.pieContainer}>
                <div className={styles.pie}>
                    <Pie data={metaData} options={options} />
                </div>
                <div className={styles.legendContainer}>
                    {
                        colors.map(color => {
                            return (<LegendField key={br} label={labels[br++]} color={color}/>);
                        })
                    }   
                    <AddButtons/>
                    <Button className="w-200" onClick={handleClick} variant="contained" color={!toggle ? "success" : "error"}>{!toggle ? "Check Incomes" : "Check Expenses"}</Button>
                </div>
                
            </div>
            <RecentHistoryTable/>
        </HomePage>

    )
}
const HomePage = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`