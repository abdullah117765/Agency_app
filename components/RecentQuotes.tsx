"use client";


import { Quote } from '@/app/dashboard/quotes/quotes.interface';
import axios from 'axios';
import { MailIcon, PhoneIcon } from 'lucide-react';
import { useEffect, useState } from 'react';



const RecentQuotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get<Quote[]>(`${process.env.NEXT_PUBLIC_API_URL}/quotes/recent`);
        setQuotes(response.data);
      } catch (error) {
        console.error('Error fetching quotes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg h-[500px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Recent Quotes</h2>
      </div>

      <div className="overflow-y-auto space-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-4">
            {quotes.map((quote) => (
              <li key={quote.id} className="border-b pb-4">
                <div className="text-lg font-semibold text-gray-900">
                  {quote.firstName} {quote.lastName}
                </div>
                <div className="flex items-center text-gray-600 text-sm mt-1">
                  <MailIcon className="w-4 h-4 mr-2" />
                  {quote.email}
                </div>
                <div className="flex items-center text-gray-600 text-sm mt-1">
                  <PhoneIcon className="w-4 h-4 mr-2" />
                  {quote.phone}
                </div>
                <div className="text-gray-500 text-sm mt-2 truncate">
                  "{quote.comments}"
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RecentQuotes;
