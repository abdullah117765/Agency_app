// pages/index.tsx
"use client"; // Declare as a client component

import AdminStat from '@/components/AdminStat';
import ChartComponent2 from '@/components/ChartComponent2';
import ChartComponent from '../../components/ChartComponent';
import RecentContacts from '../../components/RecentContacts';
import RecentQuotes from '../../components/RecentQuotes';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6 md:p-8 lg:p-10">
      {/* Dashboard Title */}
      
      {/* <h1 className="text-4xl font-bold text-center mb-8 text-gray-800  mt-24">Dashboard Overview</h1> */}

      <div className='grid grid-cols-1 md:grid-cols-1 gap-6 mt-4'>
         <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12'>
        <ChartComponent />
        <ChartComponent2 />
        <AdminStat/>
      </div>

       <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
        <RecentContacts />
        <RecentQuotes />
      </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
