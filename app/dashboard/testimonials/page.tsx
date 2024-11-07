"use client";

import Pagination from "@/components/Pagination";
import TestimonialForm from "@/components/TestimonialForm";
import { TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios"; // For fetching testimonials
import { CheckCircleIcon, EditIcon, XCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { createTestimonial, deleteTestimonial, updateStatus, updateTestimonial } from "./axiosApi";

interface Testimonial {
  id: string;
  fullName: string;
  description: string;
  image: File | string | null; // Allow both File and URL types
  status: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // State for total pages
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const itemsPerPage = 8;

  // Fetch testimonials from backend
  const fetchTestimonials = async (page: number) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/testimonials/paginated`, {
        params: { page, pageSize: itemsPerPage },
      });

      // Log the fetched data to check structure
      console.log("Fetched testimonials:", response.data);

      // Assuming your API returns an object with totalCount and testimonials array
      if (response.data && response.data.totalCount && Array.isArray(response.data.testimonials)) {
        setTestimonials(response.data.testimonials);
        // Calculate total pages based on the total count and items per page
        const totalPages = Math.ceil(response.data.totalCount / itemsPerPage);
        setTotalPages(totalPages);
      } else {
        console.error("Unexpected data structure:", response.data);
        setTestimonials([]);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setTestimonials([]);
    }
  };

  useEffect(() => {
    fetchTestimonials(currentPage); // Fetch testimonials based on currentPage
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Set the current page
  };

  // Add new testimonial
  const handleAddTestimonial = () => {
    setSelectedTestimonial(null);
    setIsFormOpen(true);
  };

  // Submit testimonial (Add or Update)
  // Submit testimonial (Add or Update)
const handleSubmit = async (testimonial: Testimonial) => {
  const formData = new FormData();
  formData.append("fullName", testimonial.fullName);
  formData.append("description", testimonial.description);
  formData.append("status", testimonial.status);
  if (testimonial.image instanceof File) {
    formData.append("image", testimonial.image);
  }

  try {
    if (testimonial.id) {
      // Update logic
      await updateTestimonial(testimonial.id, formData); // Pass formData for updates
      setSuccessMessage("Testimonial updated successfully!");
    } else {
      // Add new testimonial logic
      await createTestimonial(formData);
      setSuccessMessage("Testimonial added successfully!");
    }
    fetchTestimonials(currentPage); // Refresh testimonials after submission
  } catch (error) {
         if (error instanceof Error) {
        setSuccessMessage(error.message);
      }

    console.error("Error submitting testimonial:", error);
  }
  setIsFormOpen(false);
};


  // Delete testimonial
  const handleDelete = async (id: string) => {
    try {
      await deleteTestimonial(id);
      setSuccessMessage("Testimonial deleted successfully!");
      fetchTestimonials(currentPage);
    } catch (error) {
       if (error instanceof Error) {
        setSuccessMessage(error.message);
      }
      console.error("Error deleting testimonial:", error);
    }
  };

  // Change testimonial status
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateStatus(id, newStatus);
      setSuccessMessage("Status updated successfully!");
      fetchTestimonials(currentPage);
    } catch (error) {
         if (error instanceof Error) {
        setSuccessMessage(error.message);
      }
      console.error("Error updating status:", error);
    }
  };

  // Edit testimonial
  const handleEdit = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsFormOpen(true);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
           <div className="flex flex-col items-start justify-center gap-2 mt-20">
        <h1 className="font-extrabold text-5xl md:text-6xl tracking-tighter border-b-4 border-yellow-500 py-2">
          Testimonials
        </h1>
        <p className="text-slate-500 tracking-tighter">
          Our clients speak for us: Incredible attention to detail and unmatched
          expertise. Working with Agency has been a game-changer for our
          business.
        </p>
      </div>
      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 border border-green-300 rounded">
          {successMessage}
        </div>
      )}

      {/* Add Testimonial Button */}
      <div className="flex justify-end mb-4 mt-8">
        <button
          onClick={handleAddTestimonial}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Testimonial
        </button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white shadow-lg p-6 rounded-lg transition-transform transform hover:scale-105 relative">
            {testimonial.image && (

               <div className="flex flex-col items-start justify-center gap-5">
          <img
            src={typeof testimonial.image === "string" ? testimonial.image : URL.createObjectURL(testimonial.image)}
              alt={testimonial.fullName}
            width={100}
            height={100}
            className="aspect-square  object-cover rounded-full w-[100px] h-[100px]"
          />
          <p className="tracking-tighter text-slate-500">{testimonial.description}</p>
        </div>

            )}
          
         <div className="border-t-2 border-gray-400">
          <h1 className="font-bold tracking-tighter">{testimonial.fullName}</h1>
        </div>

            {/* Edit, Delete, and Status Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
               <EditIcon onClick={() => handleEdit(testimonial)} className=" h-5 w-5  text-blue-600 hover:text-blue-700 transition "/>
              <TrashIcon onClick={() => handleDelete(testimonial.id)} className=" h-5 w-5 text-red-600 hover:text-red-700 transition" />
               <button
    onClick={() => handleStatusChange(testimonial.id, testimonial.status === "active" ? "inactive" : "active")}
    className="text-gray-600 hover:text-gray-700 transition"
  >
    {testimonial.status === "active" ? (
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

      {/* Testimonial Form Modal */}
      {isFormOpen && (
        <TestimonialForm
          testimonial={selectedTestimonial}
          onSubmit={handleSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
