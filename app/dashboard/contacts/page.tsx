"use client";

import Pagination from "@/components/Pagination";
import { TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios"; // For fetching contacts
import { useEffect, useState } from "react";
import { deleteContact } from "./axiosApi"; // Assuming deleteContact is in axiosApi
import { Contact } from "./contacts.interface";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // State for total pages
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const itemsPerPage = 20;

  // Fetch contacts from backend
  const fetchContacts = async (page: number) => {
    try {

      
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/contacts/paginated`,
        {
          params: { page, pageSize: itemsPerPage },
        }
      );

      // Log the fetched data to check structure
      console.log("Fetched contacts:", response.data);

      // Assuming your API returns an object with totalCount and contacts array
      if (
        response.data &&
        response.data.totalCount &&
        Array.isArray(response.data.contact)
      ) {
        setContacts(response.data.contact);
        // Calculate total pages based on the total count and items per page
        const totalPages = Math.ceil(response.data.totalCount / itemsPerPage);
        setTotalPages(totalPages);
      } else {
        console.error("Unexpected data structure:", response.data);
        setContacts([]);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setContacts([]);
    }
  };

  useEffect(() => {
    setSuccessMessage(null)
    fetchContacts(currentPage); // Fetch contacts based on currentPage
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Set the current page
  };

  // Delete contact
  const handleDelete = async (id: string) => {
    try {
      await deleteContact(id);
      setSuccessMessage("Contact deleted successfully!");
      fetchContacts(currentPage);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
            <div className="flex flex-col items-start justify-center gap-2 mt-20 mb-8">
        <h1 className="font-extrabold text-5xl md:text-6xl tracking-tighter border-b-4 border-yellow-500 py-2">
         Contacts
        </h1>

      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 border border-green-300 rounded">
          {successMessage}
        </div>
      )}

      {/* Contacts Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">Full Name</th>
              <th className="px-4 py-2 text-left text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-gray-700">Message</th>
              <th className="px-4 py-2 text-left text-gray-700">Phone</th>
              <th className="px-4 py-2 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="border-t">
                <td className="px-4 py-2">{contact.fullName}</td>
                <td className="px-4 py-2">{contact.email}</td>
                <td className="px-4 py-2">{contact.message}</td>
                <td className="px-4 py-2">{contact.phone}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <TrashIcon
                      onClick={() => handleDelete(contact.id)}
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
