import { PhoneIcon } from '@heroicons/react/24/solid';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { MailIcon } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = () => {


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-6 bg-gray-100">
      {/* Box 1: Total Blogs */}
      <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center">
        <MailIcon className="w-10 h-10 text-blue-600 mb-4" />
        <h3 className="text-xl font-semibold">Total Blogs</h3>
        <p className="text-3xl font-bold mt-2">128</p>
      </div>

      {/* Box 2: Total Contacts */}
      <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center">
        <PhoneIcon className="w-10 h-10 text-green-600 mb-4" />
        <h3 className="text-xl font-semibold">Total Contacts</h3>
        <p className="text-3xl font-bold mt-2">54</p>
      </div>

      {/* Box 3: Total Testimonials */}
      <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center">
        <MailIcon className="w-10 h-10 text-yellow-600 mb-4" />
        <h3 className="text-xl font-semibold">Total Testimonials</h3>
        <p className="text-3xl font-bold mt-2">85</p>
      </div>

      {/* Box 4: Total Services */}
      <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center">
        <PhoneIcon className="w-10 h-10 text-red-600 mb-4" />
        <h3 className="text-xl font-semibold">Total Services</h3>
        <p className="text-3xl font-bold mt-2">18</p>
      </div>

      
    </div>
  );
};

export default ChartComponent;
