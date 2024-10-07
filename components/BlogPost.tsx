import React from "react";
import Image from "next/image";
import image from "@/public/ag4.jpg";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import person from "@/public/person2.webp";

const BlogPost = () => {
  return (
    <div className="max-w-7xl mx-auto w-full p-5 px-10 mt-10 mb-32">
      <div className="flex flex-col items-center justify-center gap-28 ">
        <div>
          <Image src={image} alt="image" />
        </div>
        <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:justify-between md:gap-44">
          <div className="flex flex-col items-center px-10 justify-center gap-10">
            <div className="flex items-center justify-center gap-10">
              <LinkedInLogoIcon />
              <GitHubLogoIcon />
              <TwitterLogoIcon />
              <InstagramLogoIcon />
            </div>
            <div className="flex items-center justify-center gap-3">
              <Image
                src={person}
                alt="person"
                className="h-[40px] w-[40px] aspect-square object-cover rounded-full"
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="font-extrabold">Saad Rehman</p>
                <p className="text-slate-300">CEO, Agency</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 ">
            <h1>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              maiores quas odio unde, veritatis culpa vero amet odit repellendus
              eum possimus error iste illum consectetur quidem nulla vitae nobis
              quaerat animi? Vel et natus explicabo dolores quisquam atque,
              ratione consequatur incidunt libero impedit veritatis, ex neque
              aliquid dolore, commodi ad?
            </h1>
            <h1>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet,
              sed! Aut quis minus quaerat quam maxime eum nisi incidunt illum
              ullam accusantium eaque rem, repudiandae dolores mollitia soluta
              recusandae est adipisci. Sint officia aut, ad voluptatum delectus
              obcaecati laborum id.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
