// components/ChartComponent.tsx
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = () => {
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales Data',
        backgroundColor: 'rgba(75,192,192,0.6)', // Light teal
        borderColor: 'rgba(75,192,192,1)', // Darker teal
        borderWidth: 2,
        data: [65, 59, 80, 81, 56],
      },
      {
        label: 'Revenue Data',
        backgroundColor: 'rgba(255,99,132,0.6)', // Light red
        borderColor: 'rgba(255,99,132,1)', // Darker red
        borderWidth: 2,
        data: [45, 39, 60, 71, 46],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 12,
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartComponent;
