// LineChart.tsx
import React from 'react';
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
import { Line } from "react-chartjs-2"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type LineChartProps = {
  labels: string[];
  dataPoints: number[];
  chartTitle?: string;
};

const LineChart: React.FC<LineChartProps> = ({ labels, dataPoints, chartTitle = 'Dynamic Line Chart' }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Data',
        data: dataPoints,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        fill: true,
        tension: 0.4, // Curve the lines slightly
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: chartTitle,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time', // Customize x-axis title
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value', // Customize y-axis title
        },
        beginAtZero: true, // Ensure y-axis starts at 0
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default LineChart;
