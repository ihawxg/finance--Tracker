import styled from 'styled-components'
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart(props) {
  const [chart, setChart] = useState([]);  
  const categories = [...new Set(chart.map(item => item.category))]
  const amounts = categories.map(category => {
     return chart.filter(item => item.category === category).reduce((acc, curr) => acc + Number(curr.amount), 0)
  })
 
  useEffect(() => {
    setChart(props.data)
  }, [props.data])

  const data = {
    labels: [...new Set(chart.map(item => item.category))],
    datasets: [
      {
        label: props.purpose,
        data: amounts,
        backgroundColor:  [
          'rgba(255, 99, 132, 0.3)',
          'rgba(54, 162, 235, 0.3)',
          'rgba(255, 206, 86, 0.3)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: "#FFF",
        borderWidth: 2,
      },
    ],
  };
  return  <ChartContainer><Pie data={data} /></ChartContainer>;
}
const ChartContainer = styled.div`
  height: 400px;
  width: 400px;

`