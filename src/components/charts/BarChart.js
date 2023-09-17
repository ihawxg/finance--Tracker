import { Bar } from 'react-chartjs-2';
import styled from 'styled-components'
import React, { useEffect, useState } from 'react';
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
  let transactions = props.data.sort((a,b) => (new Date(a.date).getTime()) - (new Date(b.date)).getTime())
  let incomes = props.data.filter(item => item.type == 'income')
  let expenses = props.data.filter(item => item.type == 'expense')

  const months = [...incomes, ...expenses].map(item => (new Date(item.date)).getMonth())
  const labels = months.map(item => {
    switch(item) {
        case 0 : return "January";
        case 1 : return "February";
        case 2 : return "March";
        case 3 : return "April";
        case 4 : return "May";
        case 5 : return "June";
        case 6 : return "July";
        case 7 : return "August";
        case 8 : return "September";
        case 9 : return "October";
        case 10 : return "November";
        case 11 : return "December";
    };
});

const data = {
  labels,
  datasets: [
    {
      label: 'Incomes',
      data: incomes.map(item => item.amount),
      backgroundColor: 'rgba(39, 173, 86, .8)',
    },
    {
        label: 'Expenses',
        data: expenses.map(item => item.amount),
        backgroundColor: 'rgba(219, 30, 30, .8)',
    }
  ],
};
    return (
        <Bar data={data} />
    )
} 