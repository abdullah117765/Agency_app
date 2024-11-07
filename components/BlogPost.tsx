"use client";
import { Blog } from "@/app/dashboard/blogs/blogs.interface";
import image from "@/public/ag4.jpg";
import Image from "next/image";

interface BlogPostProps {

  blog: Blog;
}

const BlogPost: React.FC<BlogPostProps> = ({blog }) => {
  return (
    <div className="max-w-7xl mx-auto w-full p-5 px-10 mt-10 mb-32">
      <div className="flex flex-col items-center justify-center gap-28 ">
        <div>
          <Image src={image} alt="image" />
        </div>
        <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:justify-between md:gap-44">


          <div className="flex flex-col items-center justify-center gap-2 ">
            <h1>{blog.description}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
