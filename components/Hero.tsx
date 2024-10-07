"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import imageHero from "@/public/picture.jpg";
import { ReactTyped } from "react-typed";

const Hero = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-5 px-10 w-full my-52">
      {scrollPosition < 50 ? (
        <div className="text-center">
          <Image
            src={imageHero}
            alt="hero"
            layout="fill"
            objectFit="cover"
            className="mt-[4.5rem]"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center md:flex-row gap-2 md:justify-between">
          <h1 className="font-extrabold tracking-tighter text-5xl md:text-6xl ">
            Shape the impact of <br />
            <ReactTyped
              className="font-extrabold tracking-tighter bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-700 inline-block text-transparent bg-clip-text pb-10"
              strings={["Emerging Technology"]}
              typeSpeed={80}
              loop
              loopCount={2}
            />
          </h1>
          <div className="hidden md:block md:w-1/2">
            <Image
              src={imageHero}
              alt="hero"
              layout="responsive"
              width={700}
              height={500}
              objectFit="cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
