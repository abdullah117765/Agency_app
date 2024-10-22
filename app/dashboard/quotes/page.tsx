"use client";

import Pagination from "@/components/Pagination";
import QuoteForm from "@/components/Quote2Form";
import { PhoneIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios"; // For fetching quotes
import { EditIcon, MailIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { createQuote, deleteQuote, updateQuote } from "./axiosApi";
import { Quote } from "./quotes.interface";

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // State for total pages
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const itemsPerPage = 5;

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
    fetchQuotes(currentPage); // Fetch quotes based on currentPage
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Set the current page
  };

  // Add new quote
  const handleAddQuote = () => {
    setSelectedQuote(null);
    setIsFormOpen(true);
  };

  // Submit quote (Add or Update)
  // Submit quote (Add or Update)

  const handleSubmit = async (quote: Quote) => {
    const formData = new FormData();
    formData.append("firstName", quote.firstName);
    formData.append("lastName", quote.lastName);
    formData.append("services", quote.services);
    formData.append("comments", quote.comments);
    formData.append("NoOfServices", quote.NoOfServices.toString());
    formData.append("email", quote.email);
    formData.append("phone", quote.phone);

    try {
      if (quote.id) {
        // Update logic
        await updateQuote(quote.id, formData); // Pass formData for updates
        setSuccessMessage("Quote updated successfully!");
      } else {
        // Add new quote logic
        await createQuote(formData);
        setSuccessMessage("Quote added successfully!");
      }
      fetchQuotes(currentPage); // Refresh quotes after submission
    } catch (error) {
      console.error("Error submitting quote:", error);
    }
    setIsFormOpen(false);
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

  // Edit quote
  const handleEdit = (quote: Quote) => {
    console.log("editedQuote", quote);
    setSelectedQuote(quote);
    setIsFormOpen(true);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
        Quotes
      </h1>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 border border-green-300 rounded">
          {successMessage}
        </div>
      )}

      {/* Add Quote Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddQuote}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Quote
        </button>
      </div>

      {/* Quotes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {quotes.map((quote) => (
          <div
            key={quote.id}
            className="bg-white shadow-lg p-6 rounded-lg transition-transform transform hover:scale-105 relative"
          >
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {quote.firstName + " " + quote.lastName}
            </h2>
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {quote.email}
            </h2>
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {quote.services}
            </h2>
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {quote.NoOfServices}
            </h2>

            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {quote.comments}
            </h2>
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {quote.phone}
            </h2>
            {/* <p className="text-gray-600 text-center mt-2">{quote.description}</p> */}
            <div className="mt-4 flex justify-center gap-4">
              <PhoneIcon className="h-5 w-5 text-blue-600 hover:text-blue-700 transition" />
              <MailIcon className="h-5 w-5 text-blue-600 hover:text-blue-700 transition" />
            </div>

            {/* Edit, Delete, and Status Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <EditIcon
                onClick={() => handleEdit(quote)}
                className=" h-5 w-5  text-blue-600 hover:text-blue-700 transition "
              />
              <TrashIcon
                onClick={() => handleDelete(quote.id)}
                className=" h-5 w-5 text-red-600 hover:text-red-700 transition"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Quote Form Modal */}
      {isFormOpen && (
        <QuoteForm
          quote={selectedQuote}
          onSubmit={handleSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
