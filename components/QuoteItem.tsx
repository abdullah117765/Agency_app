// Import Quote interface
import { Quote } from "@/app/dashboard/quotes/quotes.interface";
import { PhoneIcon } from "@heroicons/react/24/solid"; // Import icons if needed
import { MailIcon } from "lucide-react"; // Import icons if needed

interface QuoteItemProps {
  quote: Quote;
  onEdit: (quote: Quote) => void;
  onDelete: (id: string) => void;
}

export default function QuoteItem({ quote, onEdit, onDelete }: QuoteItemProps) {
  <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-md flex items-start space-x-4 transition-transform transform hover:scale-105">
    {/* Quote Content Section */}
    <div className="flex-1">
      <h3 className="text-lg font-semibold text-gray-800">{quote.firstName}</h3>
      <h3 className="text-lg font-semibold text-gray-800">{quote.lastName}</h3>
      <h3 className="text-lg font-semibold text-gray-800">{quote.email}</h3>
      <h3 className="text-lg font-semibold text-gray-800">{quote.phone}</h3>
      <h3 className="text-lg font-semibold text-gray-800">{quote.services}</h3>
      <h3 className="text-lg font-semibold text-gray-800">{quote.phone}</h3>
      <h3 className="text-lg font-semibold text-gray-800">{quote.comments}</h3>
      {/* Truncated Description */}
      {/* <p className="text-gray-600 mt-1 line-clamp-2">
          {quote.description}
        </p> */}
      <div className="mt-2 flex space-x-2">
        <PhoneIcon className="h-5 w-5 text-blue-600 hover:text-blue-700 transition" />
        <MailIcon className="h-5 w-5 text-blue-600 hover:text-blue-700 transition" />
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex flex-col justify-between space-y-2">
      <button
        onClick={() => onEdit(quote)}
        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-150 ease-in-out"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(quote.id)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-150 ease-in-out"
      >
        Delete
      </button>
    </div>
  </div>;
}
