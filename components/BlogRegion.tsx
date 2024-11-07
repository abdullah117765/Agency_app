"use client";
import { Blog2 } from "@/app/dashboard/blogs/blogs.interface";
import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import Pagination from "./Pagination";

const BlogRegion = () => {
  const [blogs, setBlogs] = useState<Blog2[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // State for total pages

  const itemsPerPage = 10;

  // Fetch blogs from backend
  const fetchBlogs = async (page: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/paginated`,
        {
          params: { page, pageSize: itemsPerPage },
        }
      );

      // Log the fetched data to check structure
      console.log("Fetched blogs:", response.data);

      // Assuming your API returns an object with totalCount and blogs array
      if (
        response.data &&
        response.data.totalCount &&
        Array.isArray(response.data.blogs)
      ) {
        setBlogs(response.data.blogs);
        // Calculate total pages based on the total count and items per page
        const totalPages = Math.ceil(response.data.totalCount / itemsPerPage);
        setTotalPages(totalPages);
      } else {
        console.error("Unexpected data structure:", response.data);
        setBlogs([]);
      }
    } catch (error) {
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

  return (
    <div className="max-w-7xl mx-auto p-5 px-10 w-full border-t-2 border-gray-200 my-24">
      {/* <Input placeholder="Search" /> */}

      <div>
        {blogs && blogs.length > 0 ? (
          <div className="flex flex-col gap-10 items-center justify-center md:grid md:grid-cols-2 md:gap-20  px-20 py-20">
            {blogs.map((blog) => (
              <BlogCard
                date={blog.createdAt?.toString() || ""}
                title={blog.title}
                id={blog.id}
                image={typeof blog.image === "string" ? blog.image : ""}
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BlogRegion;
