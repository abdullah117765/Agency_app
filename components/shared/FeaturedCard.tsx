import React from "react";
import Image from "next/image";
import agency from "@/public/ag1.jpg";

const FeaturedCard = () => {
  return (
    <div className="bg-white rounded-md shadow-2xl mt-10">
      <Image
        src={agency}
        alt="image"
        className="rounded-t-md w-full object-cover "
      />
      <div className="flex flex-col gap-5 mt-5 px-10 py-5">
        <h1 className="font-medium tracking-tighter text-4xl md:text-5xl">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur,
          dolorem?
        </h1>
        <p className="border-b-2 border-slate-300 pb-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis ea
          corporis doloremque modi nemo in tenetur! Magnam exercitationem, animi
          ea unde reprehenderit facilis voluptates, distinctio minus culpa
          laudantium sapiente accusamus dolorum rerum, commodi dolores dolorem.
          Non tempore suscipit fugiat soluta illum? Deleniti nam fugiat
          perferendis veniam nemo vero. Quaerat ab natus iure! Quasi mollitia
          ipsum ullam, veniam quas alias repellendus impedit aliquid qui
          deleniti accusamus. Quas ipsam provident facilis molestiae!
        </p>
        <p className="text-slate-400">January 3, 2024</p>
      </div>
    </div>
  );
};

export default FeaturedCard;
