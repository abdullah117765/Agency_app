"use client";

import Pagination from "@/components/Pagination";
import UserForm from "@/components/UserForm";
import { PhoneIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios"; // For fetching users
import { CheckCircleIcon, EditIcon, MailIcon, XCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { createUser, deleteUser, updateStatus, updateUser } from "./axiosApi";
import { User } from "./users.interface";



export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // State for total pages
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const itemsPerPage = 5;

  // Fetch users from backend
  const fetchUsers = async (page: number) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/paginated`, {
        params: { page, pageSize: itemsPerPage },
      });

      // Log the fetched data to check structure
      console.log("Fetched users:", response.data);

      // Assuming your API returns an object with totalCount and users array
      if (response.data && response.data.totalCount && Array.isArray(response.data.users)) {
        setUsers(response.data.users);
        // Calculate total pages based on the total count and items per page
        const totalPages = Math.ceil(response.data.totalCount / itemsPerPage);
        setTotalPages(totalPages);
      } else {
        console.error("Unexpected data structure:", response.data);
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage); // Fetch users based on currentPage
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Set the current page
  };

  // Add new user
  const handleAddUser = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  // Submit user (Add or Update)
  // Submit user (Add or Update)
const handleSubmit = async (user: User) => {
  const formData = new FormData();
  formData.append("fullname", user.fullname);
    formData.append("role", user.role);
    formData.append("email", user.email);
    formData.append("phoneNumber", user.phoneNumber);
    if (user.twitter) {
        formData.append("twitter", user.twitter);
    }
    if (user.instagram) {
        formData.append("instagram", user.instagram);
    }
    if (user.linkedin) {
        formData.append("linkedin", user.linkedin);
    }
  formData.append("status", user.status);
  if (user.image instanceof File) {
    formData.append("image", user.image);
  }

  try {
    if (user.id) {
      // Update logic
      await updateUser(user.id, formData); // Pass formData for updates
      setSuccessMessage("User updated successfully!");
    } else {
      // Add new user logic
      await createUser(formData);
      setSuccessMessage("User added successfully!");
    }
    fetchUsers(currentPage); // Refresh users after submission
  } catch (error) {
    console.error("Error submitting user:", error);
  }
  setIsFormOpen(false);
};


  // Delete user
  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      setSuccessMessage("User deleted successfully!");
      fetchUsers(currentPage);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Change user status
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateStatus(id, newStatus);
      setSuccessMessage("Status updated successfully!");
      fetchUsers(currentPage);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Edit user
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">Users</h1>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 border border-green-300 rounded">
          {successMessage}
        </div>
      )}

      {/* Add User Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddUser}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add User
        </button>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user) => (
          <div key={user.id} className="bg-white shadow-lg p-6 rounded-lg transition-transform transform hover:scale-105 relative">
            {user.image && (
              <img
                src={typeof user.image === "string" ? user.image : URL.createObjectURL(user.image)}
                alt={user.fullname}
                className="h-32 w-32 rounded-full mx-auto mb-4 border-2 border-blue-500"
              />
            )}
            <h2 className="text-xl font-semibold text-gray-800 text-center">{user.fullname}</h2>
                <h2 className="text-xl font-semibold text-gray-800 text-center">{user.role}</h2>
                <h2 className="text-xl font-semibold text-gray-800 text-center">{user.email}</h2>
                <h2 className="text-xl font-semibold text-gray-800 text-center">{user.phoneNumber}</h2>
                <h2 className="text-xl font-semibold text-gray-800 text-center">{user.twitter}</h2>
                <h2 className="text-xl font-semibold text-gray-800 text-center">{user.instagram}</h2>
                <h2 className="text-xl font-semibold text-gray-800 text-center">{user.linkedin}</h2>
            <div className="mt-4 flex justify-center gap-4">
              <PhoneIcon className="h-5 w-5 text-blue-600 hover:text-blue-700 transition" />
              <MailIcon className="h-5 w-5 text-blue-600 hover:text-blue-700 transition" />
            </div>

            {/* Edit, Delete, and Status Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
               <EditIcon onClick={() => handleEdit(user)} className=" h-5 w-5  text-blue-600 hover:text-blue-700 transition "/>
              <TrashIcon onClick={() => handleDelete(user.id)} className=" h-5 w-5 text-red-600 hover:text-red-700 transition" />
               <button
    onClick={() => handleStatusChange(user.id, user.status === "active" ? "inactive" : "active")}
    className="text-gray-600 hover:text-gray-700 transition"
  >
    {user.status === "active" ? (
      <CheckCircleIcon className="h-5 w-5 text-green-600 hover:text-green-700 transition" />
    ) : (
      <XCircleIcon className="h-5 w-5 text-gray-600 hover:text-gray-700 transition" />
    )}
  </button>
            
             
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

      {/* User Form Modal */}
      {isFormOpen && (
        <UserForm
          user={selectedUser}
          onSubmit={handleSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
