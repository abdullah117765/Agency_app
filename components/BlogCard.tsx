import React from "react";
import Image from "next/image";
import image from "@/public/abc.jpg";
import { Button } from "./ui/button";

const BlogCard = ({ description, date }: any) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Image src={image} alt="image" width={500} height={500} />
      <div className="flex flex-col items-start justify-center gap-2 mr-20">
        <h1 className="text-slate-400 tracking-tighter">{date}</h1>
        <h1 className="font-extrabold tracking-tighter max-w-md border-b-2 border-black py-2">
          {description}
        </h1>
        <div>
          <Button>Read More</Button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
