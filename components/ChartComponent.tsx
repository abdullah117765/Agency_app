'use client';

import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VisitorGraph = () => {
  const [visitorData, setVisitorData] = useState<any>(null);

  useEffect(() => {
    const fetchVisitorData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/visitors?page=1&limit=100`);
      const data = await res.json();
      setVisitorData(data);
    };

    fetchVisitorData();
  }, []);

  if (!visitorData) return <div className="text-center text-gray-500">Loading...</div>;

  // Prepare data for the chart (this week's days)
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const chartData = {
    labels: daysOfWeek,
    datasets: [
      {
        label: 'Visitors This Week',
        data: visitorData.dailyVisitorCounts, // Data for each day of the week
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="my-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Visitors This Week</h2>
      <div className="max-w-full overflow-hidden">
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default VisitorGraph;
