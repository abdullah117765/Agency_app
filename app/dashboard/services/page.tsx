"use client";

import Pagination from "@/components/Pagination";
import ServiceForm from "@/components/ServiceForm";
import { PhoneIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios"; // For fetching services
import { CheckCircleIcon, EditIcon, MailIcon, XCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { createService, deleteService, updateService, updateStatus } from "./axiosApi";
import { Service } from "./services.interface";



export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // State for total pages
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const itemsPerPage = 5;

  // Fetch services from backend
  const fetchServices = async (page: number) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/services/paginated`, {
        params: { page, pageSize: itemsPerPage },
      });

      // Log the fetched data to check structure
      console.log("Fetched services:", response.data);

      // Assuming your API returns an object with totalCount and services array
      if (response.data && response.data.totalCount && Array.isArray(response.data.services)) {
        setServices(response.data.services);
        // Calculate total pages based on the total count and items per page
        const totalPages = Math.ceil(response.data.totalCount / itemsPerPage);
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

  // Add new service
  const handleAddService = () => {
    setSelectedService(null);
    setIsFormOpen(true);
  };

  // Submit service (Add or Update)
  // Submit service (Add or Update)
const handleSubmit = async (service: Service) => {
  const formData = new FormData();
    formData.append("title", service.title);
    formData.append("price", service.price.toString());
  formData.append("description", service.description);
  formData.append("status", service.status);
  if (service.image instanceof File) {
    formData.append("image", service.image);
  }

  try {
    if (service.id) {
      // Update logic
      await updateService(service.id, formData); // Pass formData for updates
      setSuccessMessage("Service updated successfully!");
    } else {
      // Add new service logic
      await createService(formData);
      setSuccessMessage("Service added successfully!");
    }
    fetchServices(currentPage); // Refresh services after submission
  } catch (error) {
    console.error("Error submitting service:", error);
  }
  setIsFormOpen(false);
};


  // Delete service
  const handleDelete = async (id: string) => {
    try {
      await deleteService(id);
      setSuccessMessage("Service deleted successfully!");
      fetchServices(currentPage);
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  // Change service status
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateStatus(id, newStatus);
      setSuccessMessage("Status updated successfully!");
      fetchServices(currentPage);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Edit service
  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setIsFormOpen(true);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">Services</h1>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 border border-green-300 rounded">
          {successMessage}
        </div>
      )}

      {/* Add Service Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddService}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Service
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service.id} className="bg-white shadow-lg p-6 rounded-lg transition-transform transform hover:scale-105 relative">
            {service.image && (
              <img
                src={typeof service.image === "string" ? service.image : URL.createObjectURL(service.image)}
                alt={service.title}
                className="h-32 w-32 rounded-full mx-auto mb-4 border-2 border-blue-500"
              />
            )}
                <h2 className="text-xl font-semibold text-gray-800 text-center">{service.title}</h2>
                 <h2 className="text-xl font-semibold text-gray-800 text-center">{service.price}</h2>
            <p className="text-gray-600 text-center mt-2">{service.description}</p>
            <div className="mt-4 flex justify-center gap-4">
              <PhoneIcon className="h-5 w-5 text-blue-600 hover:text-blue-700 transition" />
              <MailIcon className="h-5 w-5 text-blue-600 hover:text-blue-700 transition" />
            </div>

            {/* Edit, Delete, and Status Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
               <EditIcon onClick={() => handleEdit(service)} className=" h-5 w-5  text-blue-600 hover:text-blue-700 transition "/>
              <TrashIcon onClick={() => handleDelete(service.id)} className=" h-5 w-5 text-red-600 hover:text-red-700 transition" />
               <button
    onClick={() => handleStatusChange(service.id, service.status === "active" ? "inactive" : "active")}
    className="text-gray-600 hover:text-gray-700 transition"
  >
    {service.status === "active" ? (
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

      {/* Service Form Modal */}
      {isFormOpen && (
        <ServiceForm
          service={selectedService}
          onSubmit={handleSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
