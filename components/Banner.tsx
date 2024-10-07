import React from "react";

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto w-full p-5 px-10 mt-10">
      <div className="border-t-2 border-b-2 border-yellow-500 flex flex-col items-center justify-center md:flex-row md:justify-between gap-10 md:gap-20 px-10 py-10">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-5xl font-extrabold tracking-tighter">14+</h1>
          <p>Years of experience</p>
        </div>
        <div className="flex flex-col items-center justify-center  gap-2">
          <h1 className="text-5xl font-extrabold tracking-tighter">3k+</h1>
          <p>Products Sold</p>
        </div>
        <div className="flex flex-col items-center justify-center  gap-2">
          <h1 className="text-5xl font-extrabold tracking-tighter">1k+</h1>
          <p>Client Satisfy</p>
        </div>
        <div className="flex flex-col items-center justify-center  gap-2">
          <h1 className="text-5xl font-extrabold tracking-tighter">50</h1>
          <p>Company trusted us</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
