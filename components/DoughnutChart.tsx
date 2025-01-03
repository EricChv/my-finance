"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type PieChartProps = {
  accounts: { name: string; currentBalance: number }[];
};

const PieChart = ({ accounts }: PieChartProps) => {
  if (!accounts.length) {
    return <p>No accounts to display.</p>;
  }

  const accountNames = accounts.map((a) => a.name);
  const balances = accounts.map((a) => a.currentBalance);

  const data = {
    datasets: [
      {
        label: "Balance",
        data: balances,
        backgroundColor: ['#383D52', '#779198', '#263238'], // Your defined colors
      },
    ],
    labels: accountNames,
  };

  return (
    <div style={{ width: "130px", height: "130px", margin: "auto" }}>
      <Pie
        data={data}
        options={{
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const value = context.raw as number;
                  return ` $${value.toLocaleString("en-US")}`; // Only show the balance
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;