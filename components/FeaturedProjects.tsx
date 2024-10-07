import React from "react";
import FeaturedCard from "./shared/FeaturedCard";

const FeaturedProjects = () => {
  return (
    <div className="bg-slate-950 py-1 my-32">
      <div className="max-w-7xl p-5 px-10 w-full mx-auto">
        <div className="flex flex-col items-start justify-center gap-2">
          <h1 className="text-white border-b-4 border-yellow-500 py-2">
            Projects
          </h1>
          <h1 className="font-extrabold text-5xl md:text-6xl tracking-tighter text-white">
            Our Featured Projects
          </h1>
          <p className="text-slate-400 tracking-tighter">
            Get inspired by some of the most innovative architecture projects.
            View photos and discover the stories behind the projects.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <FeaturedCard />
          <FeaturedCard />
          <FeaturedCard />
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjects;
