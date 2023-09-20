import styled from 'styled-components'
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';
import { getColor } from "../../utils/util";
import { isWithinInterval } from 'date-fns';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart(props) {
    const user = useSelector(state => state.userData.user);
    const dataMap = new Map();
    if (props.purpose === 'Incomes') {
        props.transactions.forEach(inc => {
            if (dataMap.has(inc.category)) {
              dataMap.set(inc.category, { ...dataMap.get(inc.category), amount: dataMap.get(inc.category).amount + Number(inc.amount) });
            } else {
              dataMap.set(inc.category, { amount: Number(inc.amount), color: getColor(user, inc.category, "Income") });
              }
            });
    } else {
     
          props.transactions.forEach(exp => {
              if(dataMap.has(exp.category)){
                  dataMap.set(exp.category, {...dataMap.get(exp.category), amount: dataMap.get(exp.category).amount + Number(exp.amount)});
              } else{
                  dataMap.set(exp.category, {amount: Number(exp.amount), color: getColor(user, exp.category, "Expense")});
              }
          });
    }

    const labels = Array.from(dataMap.keys());
    const data = Array.from(dataMap.values()).map(data => data.amount);
    const colors = Array.from(dataMap.values()).map(data => data.color);
  //  console.log(data)
 
    const pieData = {
      labels,
      datasets: [
        {
          label: props.purpose,
          data,
          backgroundColor: colors,
          borderColor: "#FFF",
          borderWidth: 2,
        }
      ],
    };
    return <ChartContainer><Pie data={pieData} /></ChartContainer>;
}
export const ChartContainer = styled.div`
  height: 400px;
  width: 400px;

`