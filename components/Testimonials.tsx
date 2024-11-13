"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import TestimonialCard from "./shared/TestimonialCard";

const Testimonials = () => {

   const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // State for total pages
  const itemsPerPage = 3;
  
  
    // Fetch testimonials from backend
  const fetchTestimonials = async (page: number) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/testimonials/paginated`, {
        params: { page, pageSize: itemsPerPage , status: "active" },
      });

      // Log the fetched data to check structure
      console.log("Fetched testimonials:", response.data);

      // Assuming your API returns an object with totalCount and testimonials array
      if (response.data && response.data.totalCount && Array.isArray(response.data.testimonials)) {
        setTestimonials(response.data.testimonials);
        // Calculate total pages based on the total count and items per page
        const totalPages = Math.ceil(response.data.testimonials.length / itemsPerPage);
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


  
  return (
    <div className="max-w-7xl mx-auto p-5 px-10 w-full my-32">
      <div className="flex flex-col items-start justify-center gap-2">
        <h1 className="font-extrabold text-5xl md:text-6xl tracking-tighter border-b-4 border-yellow-500 py-2">
          Testimonials
        </h1>
        <p className="text-slate-500 tracking-tighter">
          Our clients speak for us: Incredible attention to detail and unmatched
          expertise. Working with Agency has been a game-changer for our
          business.
        </p>
      </div>

     
<div>
  {testimonials && testimonials.length > 0 ? (
    <div className="flex flex-col gap-2 md:grid md:grid-cols-3 md:gap-4">
      {testimonials.map((testimonial) => (
        <TestimonialCard
          key={testimonial.id} // Make sure each testimonial has a unique key (like an id)
          name={testimonial.fullName}
          testimonial={testimonial.description}
          image={testimonial.image}
        />
      ))}
    </div>
  ) : (
    <div className="text-center p-4">
      <p>No data fetched</p>
    </div>
  )}
</div>

 {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

    </div>
  );
};

export default Testimonials;
