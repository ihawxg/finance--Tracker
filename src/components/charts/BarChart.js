import { Bar } from 'react-chartjs-2';
import React from 'react';
import { getMonthFromNumber } from "../../utils/util";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const BarChart = (props) => {
    let transactions =  props.data;
    transactions.sort((a,b) => (new Date(a.date).getTime()) - (new Date(b.date)).getTime());

    let dataMap = new Map();

    transactions.forEach(trans => {
        const month = (new Date(trans.date)).getMonth();
        if(dataMap.has(month)){
            if(trans.type === "income"){
              dataMap.set(month, [dataMap.get(month)[0], dataMap.get(month)[1] + Number(trans.amount)]);
            }
            else{
              dataMap.set(month, [dataMap.get(month)[0] + Number(trans.amount), dataMap.get(month)[1]]);
            }
        }
        else{
            if(trans.type === "income"){
              dataMap.set(month, [0, Number(trans.amount)]);
            }
            else{
              dataMap.set(month, [Number(trans.amount), 0]);
            }
        }
    });

    const labels = Array.from(dataMap.keys()).map(num => getMonthFromNumber(num));
    const incomes = Array.from(dataMap.values()).map(trans => trans[1]);
    const expenses = Array.from(dataMap.values()).map(trans => trans[0]);

    const data = {
        labels,
        datasets: [
          {
            label: 'Incomes',
            data: incomes,
            backgroundColor: 'rgba(39, 173, 86, .8)',
          },
          {
              label: 'Expenses',
              data: expenses,
              backgroundColor: 'rgba(219, 30, 30, .8)',
          }
        ],
    };

    return (
        <Bar  data={data}/>
    )
} 