import Image from "next/image";
import React from "react";
import image from "@/public/ag1.jpg";

const HeroAbout = () => {
  return (
    <div className="max-w-7xl mx-auto w-full mt-32 p-5 px-10 ">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex flex-col items-start justify-center gap-2">
          <h1 className="font-extrabold text-xl md:text-2xl tracking-tighter border-b-4 py-2 border-yellow-500">
            About us
          </h1>
          <h1 className="font-bold tracking-tighter text-3xl md:text-5xl">
            We build bridge between companies and customers
          </h1>
        </div>
        <p className="max-w-xl">
          At US Leads Agency, our dynamic team of professionals shares a passion
          for excellence. Our diverse backgrounds and expertise create a
          cohesive unit dedicated to helping businesses succeed. We believe our
          strength lies in the relationships we build and the trust we earn from
          our valued clients. Learn more about the individuals driving our
          success and the values that define us.
        </p>
      </div>

      <Image src={image} alt="image" className="mt-10 " />
    </div>
  );
};

export default HeroAbout;
