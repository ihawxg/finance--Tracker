import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const LineChart = (props) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        setIncomes(props.data[0])
        setExpenses(props.data[1])
    }, [props.data])

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Balance',
            },
        },
    };
    const markedIncomes = incomes.map(income => {
        return {
            ...income,
            type: "income"
        }
    })
    const markedExpenses = expenses.map(expense => {
        return {
            ...expense,
            type: "expense"
        }
    })

    const months = [...incomes, ...expenses].map(item => (new Date(item.date)).getMonth())
    const labels = months.map(item => {
        switch (item) {
            case 0: return "January";
            case 1: return "February";
            case 2: return "March";
            case 3: return "April";
            case 4: return "May";
            case 5: return "June";
            case 6: return "July";
            case 7: return "August";
            case 8: return "September";
            case 9: return "October";
            case 10: return "November";
            case 11: return "December";
        }
    });
   
    const sortedTransactions = [...markedIncomes, ...markedExpenses].sort((a,b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    })
    const timeline = sortedTransactions.map(item => {
        if(item.type === "income")
        return Number(item.amount)
            else return item.amount*(-1);
    })


   let result = []

   let accumulator = props.data[2];
   for(let i = 0; i < timeline.length; i++) {
        accumulator += timeline[i];  
        result.push(accumulator);
   }

    const data = {
        labels,
        datasets: [
            {
                label: 'Balance',
                data: result,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (<Line options={options} data={data} />)
}