
import { useRouter } from "next/navigation";

import { format } from "date-fns";
import React from "react";
import { Button } from "./ui/button";

interface BlogCardProps {
  title: string;
  date: string;
  id: string; // Add an ID to route to individual posts
  image: string ;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, date, id,image }) => {
  const router = useRouter();

  const handleReadMore = () => {
    router.push(`/blog/${id}`); // Navigate to blog post
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <img src={image} alt="image" width={500} height={500} />
      <div className="flex flex-col items-start justify-center gap-2 mr-20">
        <h1 className="text-slate-400 tracking-tighter">
          {format(new Date(date), "MMMM d, yyyy")}
        </h1>
        <h1 className="font-extrabold tracking-tighter max-w-md border-b-2 border-black py-2">
          {title}
        </h1>
        <div>
          <Button onClick={handleReadMore}>Read More</Button>{" "}
          {/* Navigate on click */}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
