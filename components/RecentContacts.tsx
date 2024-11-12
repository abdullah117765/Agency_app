"use client";

import { Contact } from '@/app/dashboard/contacts/contacts.interface';
import { PhoneIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { MailIcon } from 'lucide-react';
import { useEffect, useState } from 'react';



const RecentContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get<Contact[]>(`${process.env.NEXT_PUBLIC_API_URL}/contacts/recent`);
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg h-[500px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Recent Contacts</h2>
      </div>

      <div className="overflow-y-auto space-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-4">
            {contacts.map((contact) => (
              <li key={contact.id} className="border-b pb-4">
                <div className="text-lg font-semibold text-gray-900">
                  {contact.fullName}
                </div>
                <div className="flex items-center text-gray-600 text-sm mt-1">
                  <MailIcon className="w-4 h-4 mr-2" />
                  {contact.email}
                </div>
                <div className="flex items-center text-gray-600 text-sm mt-1">
                  <PhoneIcon className="w-4 h-4 mr-2" />
                  {contact.phone}
                </div>
                <div className="text-gray-500 text-sm mt-2 truncate">
                  "{contact.message}"
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RecentContacts;
