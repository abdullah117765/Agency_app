import { MailIcon, PhoneIcon } from 'lucide-react';

const RecentQuotes = () => {
  return (
    <div className="bg-white shadow-lg p-6 rounded-lg h-[500px] flex flex-col">
      {/* Header with Add Quote button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Recent Quotes</h2>
        
      </div>

      {/* Quote list */}
      <div className="overflow-y-auto space-y-4">
        <ul className="space-y-4">
          <li className="border-b pb-4">
            <div className="text-lg font-semibold text-gray-900">John Doe</div>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <MailIcon className="w-4 h-4 mr-2" />
              johndoe@gmail.com
            </div>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <PhoneIcon className="w-4 h-4 mr-2" />
              (555) 555-5555
            </div>
            <div className="text-gray-500 text-sm mt-2 truncate">"Interested in 3 services for the upcoming event..."</div>
          </li>
          <li className="border-b pb-4">
            <div className="text-lg font-semibold text-gray-900">Jane Smith</div>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <MailIcon className="w-4 h-4 mr-2" />
              janesmith@email.com
            </div>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <PhoneIcon className="w-4 h-4 mr-2" />
              (555) 555-5555
            </div>
            <div className="text-gray-500 text-sm mt-2 truncate">"I need a quote for 5 services to be completed this month..."</div>
          </li>
        
        </ul>
      </div>
    </div>
  );
};

export default RecentQuotes;
