"use client";

import ContactForm from "@/components/ContactForm";
import Pagination from "@/components/Pagination";
import { PhoneIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios"; // For fetching contacts
import { EditIcon, MailIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { createContact, deleteContact, updateContact } from "./axiosApi";
import { Contact } from "./contacts.interface";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // State for total pages
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const itemsPerPage = 5;

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
    fetchContacts(currentPage); // Fetch contacts based on currentPage
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Set the current page
  };

  // Add new contact
  const handleAddContact = () => {
    setSelectedContact(null);
    setIsFormOpen(true);
  };

  // Submit contact (Add or Update)
  // Submit contact (Add or Update)
  const handleSubmit = async (contact: Contact) => {
    const formData = new FormData();
    formData.append("fullName", contact.fullName);
    formData.append("email", contact.email);
    formData.append("phone", contact.phone);
    formData.append("message", contact.message);

    try {
      if (contact.id) {
        // Update logic
        await updateContact(contact.id, formData); // Pass formData for updates
        setSuccessMessage("Contact updated successfully!");
      } else {
        // Add new contact logic
        await createContact(formData);
        setSuccessMessage("Contact added successfully!");
      }
      fetchContacts(currentPage); // Refresh contacts after submission
    } catch (error) {
      console.error("Error submitting contact:", error);
    }
    setIsFormOpen(false);
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

  // Edit contact
  const handleEdit = (contact: Contact) => {
    console.log("editedContact", contact);
    setSelectedContact(contact);
    setIsFormOpen(true);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
        Contacts
      </h1>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 border border-green-300 rounded">
          {successMessage}
        </div>
      )}

      {/* Add Contact Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddContact}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Contact
        </button>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white shadow-lg p-6 rounded-lg transition-transform transform hover:scale-105 relative"
          >
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {contact.fullName}
            </h2>
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {contact.email}
            </h2>
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {contact.message}
            </h2>
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {contact.phone}
            </h2>
            {/* <p className="text-gray-600 text-center mt-2">{contact.description}</p> */}
            <div className="mt-4 flex justify-center gap-4">
              <PhoneIcon className="h-5 w-5 text-blue-600 hover:text-blue-700 transition" />
              <MailIcon className="h-5 w-5 text-blue-600 hover:text-blue-700 transition" />
            </div>

            {/* Edit, Delete, and Status Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <EditIcon
                onClick={() => handleEdit(contact)}
                className=" h-5 w-5  text-blue-600 hover:text-blue-700 transition "
              />
              <TrashIcon
                onClick={() => handleDelete(contact.id)}
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

      {/* Contact Form Modal */}
      {isFormOpen && (
        <ContactForm
          contact={selectedContact}
          onSubmit={handleSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
