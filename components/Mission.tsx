import Image from "next/image";
import React from "react";
import pic from "@/public/abc.jpg";
import person from "@/public/person1.jpeg";
import story from "@/public/ag3.jpg";

const Mission = () => {
  return (
    <div className="max-w-7xl p-5 px-10 mx-auto w-full mt-12">
      <div className="flex flex-col md:flex-row gap-10 md:gap-28 md:items-center md:justify-between items-center justify-center">
        <div className="flex flex-col items-start justify-center gap-8">
          <h1 className="font-extrabold tracking-tighter text-3xl md:text-4xl border-b-4 border-yellow-500 py-2">
            Our Founding Story
          </h1>

          <Image src={story} alt="pic" width={1000} height={1000} />
          <div className="flex gap-2">
            <Image
              src={person}
              alt="person"
              className="aspect-square object-cover rounded-full w-[50px] h-[50px]"
            />
            <div className="flex flex-col items-start justify-center">
              <h1 className="font-bold tracking-tighter">Stephen</h1>
              <h1 className="text-gray-500 tracking-tighter font-medium">
                CEO, Agency
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="tracking-tighter text-gray-500 max-w-md">
            {/* Your content */}
          </div>
          <h1 className="font-extrabold tracking-tighter text-2xl max-w-md">
            &quot;Our goal is to build software that gives customer-facing teams
            at SMBs the ability to create fruitful and enduring relationships
            with customers.&quot;
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Mission;
