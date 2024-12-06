"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend }
from "chart.js";
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const data = {
    datasets: [
      {
        label: 'Banks',
        data: [1800, 1300, 1400],
        backgroundColor: ['#5D7075', '#837A79', '#A05A39']
      }
    ],
    labels: ['Bank 1', 'Bank 2', 'Bank 3']
  }

  return <Doughnut 
  data={data} 
  options={{
    cutout: '10%',
    plugins: {
      legend: {
        display: false
        }
      }
    }}
  />
}

export default DoughnutChart
