// Import Contact interface
import { Contact } from '@/app/dashboard/contacts/contacts.interface';
import { PhoneIcon } from "@heroicons/react/24/solid"; // Import icons if needed
import { MailIcon } from "lucide-react"; // Import icons if needed

interface ContactItemProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export default function ContactItem({ contact, onEdit, onDelete }: ContactItemProps) {
  
    <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-md flex items-start space-x-4 transition-transform transform hover:scale-105">
     

      {/* Contact Content Section */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{contact.fullName}</h3>
        <h3 className="text-lg font-semibold text-gray-800">{contact.email}</h3>
        <h3 className="text-lg font-semibold text-gray-800">{contact.message}</h3>
         <h3 className="text-lg font-semibold text-gray-800">{contact.phone}</h3>
        {/* Truncated Description */}
        {/* <p className="text-gray-600 mt-1 line-clamp-2">
          {contact.description}
        </p> */}
        <div className="mt-2 flex space-x-2">
          <PhoneIcon className="h-5 w-5 text-blue-600 hover:text-blue-700 transition" />
          <MailIcon className="h-5 w-5 text-blue-600 hover:text-blue-700 transition" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col justify-between space-y-2">
        <button
          onClick={() => onEdit(contact)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-150 ease-in-out"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(contact.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-150 ease-in-out"
        >
          Delete
        </button>
      </div>
    </div>
  
}
