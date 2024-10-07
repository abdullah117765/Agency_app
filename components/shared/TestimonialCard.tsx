import React from "react";
import imagePerson from "@/public/person2.webp";
import Image from "next/image";
const TestimonialCard = ({ testimonial, name }: any) => {
  return (
    <div className="bg-white rounded-md shadow-2xl px-5 py-5 max-w-md mt-10 hover:scale-105 transition duration-150 ">
      <div className="flex flex-col items-start justify-center gap-10 ">
        <div className="flex flex-col items-start justify-center gap-5">
          <Image
            src={imagePerson}
            alt="person"
            width={100}
            height={100}
            className="aspect-square  object-cover rounded-full w-[100px] h-[100px]"
          />
          <p className="tracking-tighter text-slate-500">{testimonial}</p>
        </div>
        <div className="border-t-2 border-gray-400">
          <h1 className="font-bold tracking-tighter">{name}</h1>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
