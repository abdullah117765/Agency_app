"use client";

import Pagination from "@/components/Pagination";
import { PhoneIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios"; // For fetching quotes
import { useEffect, useState } from "react";
import { deleteQuote } from "./axiosApi";
import { Quote } from "./quotes.interface";

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // State for total pages
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const itemsPerPage = 20;

  // Fetch quotes from backend
  const fetchQuotes = async (page: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/quotes/paginated`,
        {
          params: { page, pageSize: itemsPerPage },
        }
      );

      // Log the fetched data to check structure
      console.log("Fetched quotes:", response.data);

      // Assuming your API returns an object with totalCount and quotes array
      if (
        response.data &&
        response.data.totalCount &&
        Array.isArray(response.data.quote)
      ) {
        setQuotes(response.data.quote);
        // Calculate total pages based on the total count and items per page
        const totalPages = Math.ceil(response.data.totalCount / itemsPerPage);
        setTotalPages(totalPages);
      } else {
        console.error("Unexpected data structure:", response.data);
        setQuotes([]);
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
      setQuotes([]);
    }
  };

  useEffect(() => {
    setSuccessMessage(null)
    fetchQuotes(currentPage); // Fetch quotes based on currentPage
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Set the current page
  };

  // Delete quote
  const handleDelete = async (id: string) => {
    try {
      await deleteQuote(id);
      setSuccessMessage("Quote deleted successfully!");
      fetchQuotes(currentPage);
    } catch (error) {
      console.error("Error deleting quote:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
            <div className="flex flex-col items-start justify-center gap-2 mt-20 mb-8">
        <h1 className="font-extrabold text-5xl md:text-6xl tracking-tighter border-b-4 border-yellow-500 py-2">
         Quote
        </h1>

      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 border border-green-300 rounded">
          {successMessage}
        </div>
      )}

      {/* Quotes Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">Full Name</th>
              <th className="px-4 py-2 text-left text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-gray-700">Services</th>
              <th className="px-4 py-2 text-left text-gray-700">No of Services</th>
              <th className="px-4 py-2 text-left text-gray-700">Comments</th>
              <th className="px-4 py-2 text-left text-gray-700">Phone</th>
              <th className="px-4 py-2 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => (
              <tr key={quote.id} className="border-t">
                <td className="px-4 py-2">{quote.firstName} {quote.lastName}</td>
                <td className="px-4 py-2">{quote.email}</td>
                <td className="px-4 py-2">{quote.services}</td>
                <td className="px-4 py-2">{quote.NoOfServices}</td>
                <td className="px-4 py-2">{quote.comments}</td>
                <td className="px-4 py-2">{quote.phone}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <TrashIcon
                      onClick={() => handleDelete(quote.id)}
                      className="h-5 w-5 text-red-600 hover:text-red-700 transition cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
