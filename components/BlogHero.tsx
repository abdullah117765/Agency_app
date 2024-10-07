import React from "react";

const BlogHero = () => {
  return (
    <div className="max-w-7xl mx-auto w-full p-5 px-10 mt-32">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="font-extrabold tracking-tighter text-lg md:text-xl">
          Blog
        </h1>
        <h1 className="font-extrabold tracking-tighter text-3xl md:text-5xl border-b-8 border-yellow-500 py-2">
          Have a look at our latest articles
        </h1>
      </div>
    </div>
  );
};

export default BlogHero;
