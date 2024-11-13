"use client";

import Pagination from "@/components/Pagination";

import { TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios"; // For fetching projects
import { CheckCircleIcon, EditIcon, XCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";

import ProjectForm from "@/components/ProjectForm";
import { createProject, deleteProject, updateProject, updateStatus } from "./axiosApi";
import { Project } from "./projects.interface";




export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // State for total pages
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const itemsPerPage = 5;

  // Fetch projects from backend
  const fetchProjects = async (page: number) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects/paginated`, {
        params: { page, pageSize: itemsPerPage },
      });

      // Log the fetched data to check structure
      console.log("Fetched projects:", response.data);

      // Assuming your API returns an object with totalCount and projects array
      if (response.data && response.data.totalCount && Array.isArray(response.data.projects)) {
        setProjects(response.data.projects);
        // Calculate total pages based on the total count and items per page
        const totalPages = Math.ceil(response.data.totalCount / itemsPerPage);
        setTotalPages(totalPages);
      } else {
        console.error("Unexpected data structure:", response.data);
        setProjects([]);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    }
  };

  useEffect(() => {
    fetchProjects(currentPage); // Fetch projects based on currentPage
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Set the current page
  };

  // Add new project
  const handleAddProject = () => {
    setSelectedProject(null);
    setIsFormOpen(true);
  };

  // Submit project (Add or Update)
  // Submit project (Add or Update)
const handleSubmit = async (project: Project) => {
  const formData = new FormData();
    formData.append("title", project.title);
  formData.append("description", project.description);
  formData.append("status", project.status);
  if (project.image instanceof File) {
    formData.append("image", project.image);
  }

  try {
    if (project.id) {
      // Update logic
      await updateProject(project.id, formData); // Pass formData for updates
      setSuccessMessage("Project updated successfully!");
    } else {
      // Add new project logic
      await createProject(formData);
      setSuccessMessage("Project added successfully!");
    }
    fetchProjects(currentPage); // Refresh projects after submission
  } catch (error) {
    if (error instanceof Error) {
        setSuccessMessage(error.message);
      }

    
    console.error("Error submitting project:", error);
  }
  setIsFormOpen(false);
};


  // Delete project
  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      setSuccessMessage("Project deleted successfully!");
      fetchProjects(currentPage);
    } catch (error) {

      if (error instanceof Error) {
        setSuccessMessage(error.message);
      }


      console.error("Error deleting project:", error);
    }
  };

  // Change project status
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateStatus(id, newStatus);
      setSuccessMessage("Status updated successfully!");
      fetchProjects(currentPage);
    } catch (error) {

      if (error instanceof Error) {
        setSuccessMessage(error.message);
      }


      
      console.error("Error updating status:", error);
    }
  };

  // Edit project
  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsFormOpen(true);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
             <div className="flex flex-col items-start justify-center gap-3 mt-16">
        <h1 className="font-extrabold text-xl md:text-2xl tracking-tighter border-b-4 border-yellow-500 py-2">
          Projects
        </h1>

      </div>


      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 border border-green-300 rounded">
          {successMessage}
        </div>
      )}

      {/* Add Project Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddProject}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white shadow-lg p-6 rounded-lg transition-transform transform hover:scale-105 relative"
          >
            {project.image && (
              <img
                src={
                  typeof project.image === "string"
                    ? project.image
                    : URL.createObjectURL(project.image)
                }
                alt={project.title}
               
              />
            )}

            <div className="border-b-2 border-gray-400">
              <h1 className="font-bold tracking-tighter">{project.title}</h1>
            </div>

            <p className="text-gray-600  mt-2">
              {project.description}
            </p>

            {/* Edit, Delete, and Status Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <EditIcon
                onClick={() => handleEdit(project)}
                className=" h-5 w-5  text-blue-600 hover:text-blue-700 transition "
              />
              <TrashIcon
                onClick={() => handleDelete(project.id)}
                className=" h-5 w-5 text-red-600 hover:text-red-700 transition"
              />
              <button
                onClick={() =>
                  handleStatusChange(
                    project.id,
                    project.status === "active" ? "inactive" : "active"
                  )
                }
                className="text-gray-600 hover:text-gray-700 transition"
              >
                {project.status === "active" ? (
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Project Form Modal */}
      {isFormOpen && (
        <ProjectForm
          project={selectedProject}
          onSubmit={handleSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
