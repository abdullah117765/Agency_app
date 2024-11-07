"use client";

import Pagination from "@/components/Pagination";
import UserForm from "@/components/UserForm";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import axios from "axios"; // For fetching users
import { CheckCircleIcon, EditIcon, XCircleIcon } from "lucide-react";
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
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/paginated`,
        {
          params: { page, pageSize: itemsPerPage },
        }
      );

      // Log the fetched data to check structure
      console.log("Fetched users:", response.data);

      // Assuming your API returns an object with totalCount and users array
      if (
        response.data &&
        response.data.totalCount &&
        Array.isArray(response.data.users)
      ) {
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
      if (error instanceof Error) {
        setSuccessMessage(error.message);
      }
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
           if (error instanceof Error) {
        setSuccessMessage(error.message);
      }

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
           if (error instanceof Error) {
        setSuccessMessage(error.message);
      }

      console.error("Error updating status:", error);
    }
  };

  // Edit user
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
        <div className="flex flex-col items-start justify-center gap-3 mt-16">
        <h1 className="font-extrabold text-xl md:text-2xl tracking-tighter border-b-4 border-yellow-500 py-2">
          Team
        </h1>
        {/* <h1 className="font-extrabold tracking-tighter text-3xl md:text-5xl">
          Amazing team <br /> members
        </h1> */}
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-3 bg-green-50 text-green-700 border border-green-300 rounded-md text-center font-medium">
          {successMessage}
        </div>
      )}

      {/* Add User Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleAddUser}
          className="bg-blue-500 text-white px-5 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition duration-200"
        >
          Add New User
        </button>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-lg p-6 rounded-lg transition-transform transform hover:scale-105 relative border border-gray-200"
          >
            {/* User Image */}
            {user.image && (
              <img
                src={
                  typeof user.image === "string"
                    ? user.image
                    : URL.createObjectURL(user.image)
                }
                alt={user.fullname}
                className="h-32 w-32 rounded-full mx-auto mb-4 border-2 border-blue-500 object-cover"
              />
            )}
            <div className="text-center">
              {/* User Name */}
              <h2 className="font-semibold text-2xl text-gray-800 mb-1">
                {user.fullname}
              </h2>
              {/* User Role */}
              <p className="text-gray-500 text-sm">{user.role}</p>
              {/* User Email and Phone */}
              <p className="text-gray-600 text-md mt-2">{user.email}</p>
              <p className="text-gray-600 text-md">{user.phoneNumber}</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6 justify-center">
              <a
                href={user.instagram || "#"}
                target={user.instagram ? "_blank" : "_self"}
                rel={user.instagram ? "noopener noreferrer" : undefined}
                onClick={() => {
                  if (!user.instagram) alert("No value for Instagram.");
                }}
              >
                <InstagramLogoIcon className="w-8 h-8 text-blue-500 hover:text-blue-600 transition" />
              </a>
              <a
                href={user.twitter || "#"}
                target={user.twitter ? "_blank" : "_self"}
                rel={user.twitter ? "noopener noreferrer" : undefined}
                onClick={() => {
                  if (!user.twitter) alert("No value for Twitter.");
                }}
              >
                <TwitterLogoIcon className="w-8 h-8 text-blue-400 hover:text-blue-500 transition" />
              </a>
              <a
                href={user.linkedin || "#"}
                target={user.linkedin ? "_blank" : "_self"}
                rel={user.linkedin ? "noopener noreferrer" : undefined}
                onClick={() => {
                  if (!user.linkedin) alert("No value for LinkedIn.");
                }}
              >
                <LinkedInLogoIcon className="w-8 h-8 text-blue-400 hover:text-blue-500 transition" />
              </a>
            </div>

            {/* Edit, Delete, and Status Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <EditIcon
                onClick={() => handleEdit(user)}
                className="h-6 w-6 text-blue-500 hover:text-blue-600 cursor-pointer transition"
              />
              <TrashIcon
                onClick={() => handleDelete(user.id)}
                className="h-6 w-6 text-red-500 hover:text-red-600 cursor-pointer transition"
              />
              <button
                onClick={() =>
                  handleStatusChange(
                    user.id,
                    user.status === "active" ? "inactive" : "active"
                  )
                }
                className="transition"
              >
                {user.status === "active" ? (
                  <CheckCircleIcon className="h-6 w-6 text-green-500 hover:text-green-600" />
                ) : (
                  <XCircleIcon className="h-6 w-6 text-gray-500 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

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
