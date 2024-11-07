"use client";
import { Blog2 } from "@/app/dashboard/blogs/blogs.interface";
import BlogPost from "@/components/BlogPost";
import HeroBlogPage from "@/components/HeroBlogPage";
import axios from "axios";
import { useParams } from "next/navigation"; // Import useParams
import { useEffect, useState } from "react";

const BlogPage = () => {
  const [blog, setBlog] = useState<Blog2 | null>(null);
  
  const [isMounted, setIsMounted] = useState(false);
  const { id } = useParams<{ id: string | string[] }>(); // Type the useParams return value

  // Fetch blogs and user from backend
  const fetchData = async (blogId: string) => {
    try {
      const blogResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/findone/${blogId}`
      );

      console.log("Fetched blog:", blogResponse.data);
      if (blogResponse.data) {
        setBlog(blogResponse.data);
      } else {
        console.error("Unexpected blog data structure:", blogResponse.data);
        setBlog(null);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      setBlog(null);
    }

  
  };

  // Ensure the component is mounted before using the ID
  useEffect(() => {
    if (id) {
      const blogId = Array.isArray(id) ? id[0] : id; // Handle both string and string[]
      fetchData(blogId);
    }
    setIsMounted(true);
  }, [id]);

  if (!isMounted) {
    return <div>Loading...</div>; // Show a loading state while waiting for the ID
  }

  if (!blog) {
    return <div>Blog post not found</div>;
  }



  return (
    <>
      <HeroBlogPage blog={blog}  />
      <BlogPost  blog={blog} />
    </>
  );
};

export default BlogPage;
