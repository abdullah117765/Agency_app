"use client"
import { Service } from "@/app/dashboard/services/services.interface";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import ServicesCard from "./ServicesCard";
const HeroServices = () => {

   const [services, setServices] = useState<Service[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // State for total pages
  const itemsPerPage = 3;

// Fetch services from backend
  const fetchServices = async (page: number) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/services/paginated`, {
        params: { page, pageSize: itemsPerPage ,status: "active"},
      });

      // Log the fetched data to check structure
      console.log("Fetched services:", response.data);

      // Assuming your API returns an object with totalCount and services array
      if (response.data && response.data.totalCount && Array.isArray(response.data.services)) {
        setServices(response.data.services);
        // Calculate total pages based on the total count and items per page
        const totalPages = Math.ceil(response.data.services.length / itemsPerPage);
        setTotalPages(totalPages);
      } else {
        console.error("Unexpected data structure:", response.data);
        setServices([]);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([]);
    }
  };

  useEffect(() => {
    fetchServices(currentPage); // Fetch services based on currentPage
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Set the current page
  };
  
  return (
    <div className="max-w-7xl mx-auto p-5 px-10 mt-32">
      <div className="flex flex-col items-center justify-center gap-2 ">
        <h1 className="font-extrabold tracking-tighter text-lg md:text-xl">
          Services
        </h1>
        <h1 className="font-extrabold tracking-tighter text-3xl md:text-5xl border-b-8 border-yellow-500 py-2">
          Services that we provide
        </h1>
      </div>
      
<div>
  {services && services.length > 0 ? (
     <div className="flex flex-col items-center justify-center gap-10 md:gap-2 mt-10 ">
      {services.map((service) => (
        <ServicesCard
          title={service.title}
          description={service.description}
          images={service.image}
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

export default HeroServices;
