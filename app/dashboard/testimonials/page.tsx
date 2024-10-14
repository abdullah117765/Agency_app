"use client";

import Pagination from "@/components/Pagination";
import TestimonialForm from "@/components/TestimonialForm";
import { PhoneIcon } from "@heroicons/react/24/solid";
import { MailIcon } from "lucide-react";
import { useEffect, useState } from "react";

// Dummy data
const testimonialsData = Array.from({ length: 25 }, (_, i) => ({
  id: `${i + 1}`,
  fullName: `Testimonial User ${i + 1}`,
  description: `This is a testimonial from user ${i + 1}. It's an amazing experience!`,
  image: `https://via.placeholder.com/150`,
  status: "active",
}));

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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(testimonialsData.length / itemsPerPage);

  // Pagination logic
  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setTestimonials(testimonialsData.slice(start, end));
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => setCurrentPage(page);

  // Add new testimonial
  const handleAddTestimonial = () => {
    setSelectedTestimonial(null);
    setIsFormOpen(true);
  };

  // Submit testimonial (Add or Update)
  const handleSubmit = (testimonial: Testimonial) => {
    if (testimonial.id) {
      // Update logic
      const updatedTestimonials = testimonials.map((t) =>
        t.id === testimonial.id ? { ...testimonial, image: testimonial.image } : t
      );
      setTestimonials(updatedTestimonials);
    } else {
      // Add new testimonial logic
      const newTestimonial = { ...testimonial, id: `${testimonials.length + 1}` };
      setTestimonials([...testimonials, newTestimonial]);
    }
    setIsFormOpen(false);
  };

  // Delete testimonial
  const handleDelete = (id: string) => {
    const updatedTestimonials = testimonials.filter((t) => t.id !== id);
    setTestimonials(updatedTestimonials);
  };

  // Edit testimonial
  const handleEdit = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsFormOpen(true);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">Testimonials</h1>

      {/* Add Testimonial Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddTestimonial}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Testimonial
        </button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white shadow-lg p-6 rounded-lg transition-transform transform hover:scale-105 relative">
            {testimonial.image && (
              <img
                src={typeof testimonial.image === "string" 
                     ? testimonial.image 
                     : URL.createObjectURL(testimonial.image)}
                alt={testimonial.fullName}
                className="h-32 w-32 rounded-full mx-auto mb-4 border-2 border-blue-500"
              />
            )}
            <h2 className="text-xl font-semibold text-gray-800 text-center">{testimonial.fullName}</h2>
            <p className="text-gray-600 text-center mt-2">{testimonial.description}</p>
            <div className="mt-4 flex justify-center gap-4">
              <PhoneIcon className="h-5 w-5 text-blue-600 hover:text-blue-700 transition" />
              <MailIcon className="h-5 w-5 text-blue-600 hover:text-blue-700 transition" />
            </div>

            {/* Edit and Delete Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={() => handleEdit(testimonial)}
                className="text-blue-600 hover:text-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(testimonial.id)}
                className="text-red-600 hover:text-red-700 transition"
              >
                Delete
              </button>
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
