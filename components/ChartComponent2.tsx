'use client';

import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BlogGraph = () => {
  const [blogsData, setBlogData] = useState<any>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/blogs?page=1&limit=100`);
      const data = await res.json();
      setBlogData(data);
    };

    fetchBlogData();
  }, []);

  if (!blogsData) return <div className="text-center text-gray-500">Loading...</div>;

  // Prepare data for the chart (this week's days)
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const chartData = {
    labels: daysOfWeek,
    datasets: [
      {
        label: 'Blogs This Week',
        data: blogsData.dailyVisitorCounts, // Data for each day of the week
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="my-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Blogs This Week</h2>
      <div className="max-w-full overflow-hidden">
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default BlogGraph;
