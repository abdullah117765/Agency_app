
'use client';
import { Project } from "@/app/dashboard/projects/projects.interface";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import FeaturedCard from "./shared/FeaturedCard";


const FeaturedProjects = () => {

   const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // State for total pages
  const itemsPerPage = 2;

// Fetch projects from backend
  const fetchProjects = async (page: number) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects/paginated`, {
        params: { page, pageSize: itemsPerPage ,status: "active"},
      });

      // Log the fetched data to check structure
      console.log("Fetched projects:", response.data);

      // Assuming your API returns an object with totalCount and projects array
      if (response.data && response.data.totalCount && Array.isArray(response.data.projects)) {
        setProjects(response.data.projects);
        // Calculate total pages based on the total count and items per page
        const totalPages = Math.ceil(response.data.projects.length / itemsPerPage);
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

  
  return (
    <div className="bg-slate-950 py-1 my-32">
      <div className="max-w-7xl p-5 px-10 w-full mx-auto">
        <div className="flex flex-col items-start justify-center gap-2">
          <h1 className="text-white border-b-4 border-yellow-500 py-2">
            Projects
          </h1>
          <h1 className="font-extrabold text-5xl md:text-6xl tracking-tighter text-white">
            Our Featured Projects
          </h1>
          <p className="text-slate-400 tracking-tighter">
            Get inspired by some of the most innovative architecture projects.
            View photos and discover the stories behind the projects.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
            {projects.map((project) => (
        <FeaturedCard
          title={project.title}
          description={project.description}
                images={project.image}
                date={project.createdAt}
        />
      ))}
        </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default FeaturedProjects;
