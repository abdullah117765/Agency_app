"use client";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  return (
    <footer className="bg-slate-950 text-white tracking-tighter">
      <div className="max-w-7xl mx-auto p-20 px-10 w-full">
        <div className="flex flex-col md:flex-row gap-16 md:gap-40">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold">Agency</h1>
            <div className="flex flex-col text-slate-400">
              <h1>support@agency.com</h1>
              <h1>+92 123456789</h1>
            </div>
            <div className="flex gap-8">
              <LinkedInLogoIcon className="hover:text-yellow-400 cursor-pointer" />
              <InstagramLogoIcon className="hover:text-yellow-400 cursor-pointer" />
              <TwitterLogoIcon className="hover:text-yellow-400 cursor-pointer" />
              <GitHubLogoIcon className="hover:text-yellow-400 cursor-pointer" />
            </div>
          </div>
          <div className="flex flex-col gap-5 ">
            <div className="flex flex-col items-start justify-center gap-2">
              <h1 className="font-bold">Company</h1>
              <div className="text-slate-400 cursor-pointer ">
                <h1 className="hover:text-yellow-400">
                  {" "}
                  <Link href={"/"}>Home</Link>
                </h1>
                <h1 className="hover:text-yellow-400">
                  <Link href={"/about"}>About</Link>
                </h1>
                <h1 className="hover:text-yellow-400">
                  <Link href={"/contact"}>Contact</Link>
                </h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 ">
            <div className="flex flex-col items-start justify-center gap-2">
              <h1 className="font-bold">Locations</h1>
              <div className="text-slate-400 cursor-pointer">
                <h1 className="hover:text-yellow-400">California, CA</h1>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <h1 className="font-bold">Resources</h1>
              <div className="text-slate-400 cursor-pointer">
                <h1 className="hover:text-yellow-400">
                  {" "}
                  <Link href={"/blog"}>Blog</Link>
                </h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-5">
            <h1 className="font-bold">Newsletter</h1>
            <Input
              placeholder="Enter Email"
              className="placeholder:text-slate-400 text-slate-400 max-w-xs"
            />
            <Button className="bg-yellow-500 text-black hover:bg-yellow-500 hover:opacity-80">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
