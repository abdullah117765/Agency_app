"use client";

import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import menu from "@/public/menu.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";

const NavbarAdmin = () => {
  const TOP_OFFSET = 0;
  const router = useRouter();
  const pathname = usePathname();
  const [showBackground, setShowBackground] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigateToServicesAndScroll = (e: any) => {
    e.preventDefault();
    router.push("/services#quote-form");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const services = [
    { name: "Medical", link: "/service1" },
    { name: "Motorgage", link: "/service2" },
    { name: "ACA", link: "/service3" },
  ];

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  return (
    <div
      className={`p-5 px-10 w-full font-extralight fixed z-10 ${
        showBackground ? "bg-white shadow-lg ring-1 ring-white/5" : "bg-white"
      }`}
    >
      <div className="flex flex-row items-center justify-between">
        <div>
          <Link href={"/"} className="tracking-tight font-bold text-lg">
            WeMarket
          </Link>
        </div>
        <div className="hidden md:block">
          <div className="flex items-center justify-center gap-10 relative text-sm md:text-sm">
            <Link
              className={`${pathname === "/" ? "font-bold" : "text-black"}`}
              href={"/dashboard"}
            >
              Dashboard
            </Link>
            <Link
              className={`${
                pathname === "/about" ? "font-bold" : "text-black"
              }`}
              href={"/dashboard/users"}
            >
              Users
            </Link>
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                className={`${
                  pathname === "/services" ? "font-bold" : "text-black"
                }`}
                href={"/dashboard/services"}
              >
                SERVICES
              </Link>
              {showDropdown && <Dropdown services={services} />}
            </div>
            <Link
              className={`${
                pathname === "/contact" ? "font-bold" : "text-black"
              }`}
              href={"/dashboard/contacts"}
            >
              CONTACT
            </Link>
            <Link
              className={`${pathname === "/blog" ? "font-bold" : "text-black"}`}
              href={"/dashboard/blogs"}
            >
              BLOGS
            </Link>

                        <Link
              className={`${pathname === "/testimonials" ? "font-bold" : "text-black"}`}
              href={"/dashboard/testimonials"}
            >
              TESTIMONIALS
            </Link>

                        <Link
              className={`${pathname === "/blog" ? "font-bold" : "text-black"}`}
              href={"/dashboard/quotes"}
            >
              QUOTES
            </Link>


          </div>
        </div>
        <div className="block md:hidden">
          <Sheet>
            <SheetTrigger className="align-middle">
              <Image
                src={menu}
                alt="menu"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-6 bg-white md:hidden text-sm">
              <Link href={"/"} className="tracking-tight font-bold text-lg">
                Agency
              </Link>
              <Separator className="border border-gray-50" />
              <div className="flex flex-col gap-5">
                <Link
                  className={`${pathname === "/" ? "font-bold" : "text-black"}`}
                  href={"/"}
                >
                  HOME
                </Link>
                <Link
                  className={`${
                    pathname === "/about" ? "font-bold" : "text-black"
                  }`}
                  href={"/about"}
                >
                  ABOUT
                </Link>
                <div
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    className={`${
                      pathname === "/services" ? "font-bold" : "text-black"
                    }`}
                    href={"/services"}
                  >
                    SERVICES
                  </Link>
                  {showDropdown && <Dropdown services={services} />}
                </div>
                <Link
                  className={`${
                    pathname === "/contact" ? "font-bold" : "text-black"
                  }`}
                  href={"/contact"}
                >
                  CONTACT
                </Link>
                <Link
                  className={`${
                    pathname === "/blog" ? "font-bold" : "text-black"
                  }`}
                  href={"/blog"}
                >
                  BLOG
                </Link>

                <Link
                  href="/services"
                  onClick={navigateToServicesAndScroll}
                  className="text-white px-3 py-2 font-bold bg-black rounded-md hover:bg-black hover:opacity-80 hover:text-white"
                >
                  Request to Get Quote
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default NavbarAdmin;
