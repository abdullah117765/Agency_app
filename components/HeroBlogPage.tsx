import { Blog2 } from "@/app/dashboard/blogs/blogs.interface";
import { format } from "date-fns";
import React from "react";

interface BlogPostProps {


  blog: Blog2;
}
const HeroBlogPage : React.FC<BlogPostProps> = ({  blog }) => {
  return (
    <div className="max-w-7xl mx-auto w-full p-5 px-10 mt-32 border-b-2 border-b-gray-300 py-2">
      <div className="flex flex-col items-start justify-center gap-2">
        <h1 className="font-extrabold">{format(new Date(blog.createdAt ), "MMMM d, yyyy")}</h1>
        <h1 className="font-extrabold tracking-tighter text-3xl md:text-6xl ">
         {blog.title}
        </h1>
        <h1 className="justify-right"> BY {blog.author}</h1>
      </div>
    </div>
  );
};

export default HeroBlogPage;
