import Image from "next/image";
import React from "react";
import headphones from "@/public/headphones.png";
import file from "@/public/file.svg";
import { Headset } from "lucide-react";
const Card = ({ title, description }: any) => {
  return (
    <div className="bg-white shadow-2xl rounded-md px-5 py-5 max-w-md">
      <div className="flex flex-col gap-3 items-start justify-center">
        <Headset />
        <h1 className="font-bold text-lg ">{title}</h1>

        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
