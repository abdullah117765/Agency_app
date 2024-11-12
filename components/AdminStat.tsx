"use client";



import { BuildingLibraryIcon, NewspaperIcon, PhoneIcon, UsersIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = () => {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalContacts: 0,
    totalTestimonials: 0,
    totalServices: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/analytics/adminStats`);
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load stats');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 bg-gray-100 my-8">
      {/* Box 1: Total Blogs */}
      <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center">
        <NewspaperIcon className="w-10 h-10 text-blue-600 mb-4" />
        <h3 className="text-xl font-semibold">Total Blogs</h3>
        <p className="text-3xl font-bold mt-2">{stats.totalBlogs}</p>
      </div>

      {/* Box 2: Total Contacts */}
      <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center">
        <PhoneIcon className="w-10 h-10 text-green-600 mb-4" />
        <h3 className="text-xl font-semibold">Total Contacts</h3>
        <p className="text-3xl font-bold mt-2">{stats.totalContacts}</p>
      </div>

      {/* Box 3: Total Testimonials */}
      <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center">
        <UsersIcon className="w-10 h-10 text-yellow-600 mb-4" />
        <h3 className="text-xl font-semibold">Total Testimonials</h3>
        <p className="text-3xl font-bold mt-2">{stats.totalTestimonials}</p>
      </div>

      {/* Box 4: Total Services */}
      <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center">
        < BuildingLibraryIcon className="w-10 h-10 text-red-600 mb-4" />
        <h3 className="text-xl font-semibold">Total Services</h3>
        <p className="text-3xl font-bold mt-2">{stats.totalServices}</p>
      </div>
    </div>
  );
};

export default ChartComponent;
