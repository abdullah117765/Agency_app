"use client";

import BlogForm from "@/components/BlogForm";
import Pagination from "@/components/Pagination";
import { TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios"; // For fetching blogs
import { CheckCircleIcon, EditIcon, XCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { createBlog, deleteBlog, updateBlog, updateStatus } from "./axiosApi";
import { Blog } from "./blogs.interface";



export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // State for total pages
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const itemsPerPage = 5;

  // Fetch blogs from backend
  const fetchBlogs = async (page: number) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs/paginated`, {
        params: { page, pageSize: itemsPerPage },
      });

      // Log the fetched data to check structure
      console.log("Fetched blogs:", response.data);

      // Assuming your API returns an object with totalCount and blogs array
      if (response.data && response.data.totalCount && Array.isArray(response.data.blogs)) {
        setBlogs(response.data.blogs);
        // Calculate total pages based on the total count and items per page
        const totalPages = Math.ceil(response.data.totalCount / itemsPerPage);
        setTotalPages(totalPages);
      } else {
        console.error("Unexpected data structure:", response.data);
        setBlogs([]);
      }
    } catch (error) {
      if (error instanceof Error) {
        setSuccessMessage(error.message);
      }

      
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    }
  };

  useEffect(() => {
   
    fetchBlogs(currentPage); // Fetch blogs based on currentPage
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Set the current page
  };

  // Add new blog
  const handleAddBlog = () => {
    setSelectedBlog(null);
    setIsFormOpen(true);
  };

  // Submit blog (Add or Update)
const handleSubmit = async (blog: Blog) => {
  const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("author", blog.author);
  formData.append("description", blog.description);
  formData.append("status", blog.status);
  if (blog.image instanceof File) {
    formData.append("image", blog.image);
  }

  try {
    if (blog.id) {
      // Update logic
      await updateBlog(blog.id, formData); // Pass formData for updates
      setSuccessMessage("Blog updated successfully!");
    } else {
      // Add new blog logic
      await createBlog(formData);
      setSuccessMessage("Blog added successfully!");
    }
    fetchBlogs(currentPage); // Refresh blogs after submission
  } catch (error) {

    if (error instanceof Error) {
        setSuccessMessage(error.message);
      }

    
    console.error("Error submitting blog:", error);
  }
  setIsFormOpen(false);
};


  // Delete blog
  const handleDelete = async (id: string) => {
    try {
      await deleteBlog(id);
      setSuccessMessage("Blog deleted successfully!");
      fetchBlogs(currentPage);
    } catch (error) {
      if (error instanceof Error) {
        setSuccessMessage(error.message);
      }


      console.error("Error deleting blog:", error);
    }
  };

  // Change blog status
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateStatus(id, newStatus);
      
      setSuccessMessage("Status updated successfully!");
      fetchBlogs(currentPage);
    } catch (error) {

      if (error instanceof Error) {
        setSuccessMessage(error.message);
      }


      console.error("Error updating status:", error);
    }
  };

  // Edit blog
  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsFormOpen(true);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
          <div className="flex flex-col items-start justify-center gap-3 mt-16">
        <h1 className="font-extrabold text-xl md:text-2xl tracking-tighter border-b-4 border-yellow-500 py-2">
          Blogs
        </h1>

      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 border border-green-300 rounded">
          {successMessage}
        </div>
      )}

      {/* Add Blog Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddBlog}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Blog
        </button>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white shadow-lg p-6 rounded-lg transition-transform transform hover:scale-105 relative">
            {blog.image && (
              <img
                src={typeof blog.image === "string" ? blog.image : URL.createObjectURL(blog.image)}
                alt={blog.title}
                
              />
            )}
       <h2 className="text-xl font-semibold text-gray-800 text-center">{blog.title}</h2>
                        <div className="border-b-2 border-gray-400">
              <h1 className="font-bold tracking-tighter">{blog.author}</h1>
            </div>
         
            
            <p className="text-gray-600 text-center mt-2">{blog.description}</p>


            {/* Edit, Delete, and Status Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
               <EditIcon onClick={() => handleEdit(blog)} className=" h-5 w-5  text-blue-600 hover:text-blue-700 transition "/>
              <TrashIcon onClick={() => handleDelete(blog.id)} className=" h-5 w-5 text-red-600 hover:text-red-700 transition" />
               <button
    onClick={() => handleStatusChange(blog.id, blog.status === "active" ? "inactive" : "active")}
    className="text-gray-600 hover:text-gray-700 transition"
  >
    {blog.status === "active" ? (
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

      {/* Blog Form Modal */}
      {isFormOpen && (
        <BlogForm
          blog={selectedBlog}
          onSubmit={handleSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
