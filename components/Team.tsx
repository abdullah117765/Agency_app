
'use client';

import { User } from "@/app/dashboard/users/users.interface";
import { Card, CardContent } from "@/components/ui/card";
import p1 from "@/public/p1.jpg";
import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon
} from "@radix-ui/react-icons";
import axios from "axios";
import { User2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";

const Team = () => {
  const brands = [p1];

    const [teams, setTeams] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // State for total pages

  const itemsPerPage = 3;

  // Fetch teams from backend
  const fetchTeams = async (page: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/paginated`,
        {
          params: { page, pageSize: itemsPerPage , status: "active"},
        }
      );

      // Log the fetched data to check structure
      console.log("Fetched teams:", response.data);

      // Assuming your API returns an object with totalCount and teams array
      if (
        response.data &&
        response.data.totalCount &&
        Array.isArray(response.data.users)
      ) {
        setTeams(response.data.users);
        // Calculate total pages based on the total count and items per page
        const totalPages = Math.ceil(response.data.users.length / itemsPerPage);
        setTotalPages(totalPages);
      } else {
        console.error("Unexpected data structure:", response.data);
        setTeams([]);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
      setTeams([]);
    }
  };

  useEffect(() => {
    fetchTeams(currentPage); // Fetch teams based on currentPage
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Set the current page
  };

  

  return (
    <div className="max-w-7xl mx-auto p-5 px-14 w-full mt-20 ">
      <div className="flex flex-col items-start justify-center gap-3">
        <h1 className="font-extrabold text-xl md:text-2xl tracking-tighter border-b-4 border-yellow-500 py-2">
          Team
        </h1>
        <h1 className="font-extrabold tracking-tighter text-3xl md:text-5xl">
          Amazing team <br /> members
        </h1>
      </div>
      <div className="mt-10 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">

          {teams.map((user) => (
       <Card className="w-[380px] flex flex-col items-center justify-center max-h-[500px] hover:scale-105 transition duration-150 border-gray-500 shadow-lg ">

              
               {typeof user.image === "string" ? (
                <img
                  src={user.image}
                  alt="team"
                 className=" mt-8 aspect-square  object-cover rounded-full w-[100px] h-[100px]"
                />
              ) : (
                  <User2Icon className="w-[200px] h-[200px]  " />
              )}
            <CardContent className="flex flex-col items-start px-10 py-10 justify-center ">
              <h1 className="font-extrabold text-3xl tracking-tighter">
               {user.fullname}
              </h1>
              <p className="text-gray-500 tracking-tighter">
                {user.role}
              </p>
 {/* Social Links */}
            <div className="flex gap-4 mt-6 justify-center">
              <a
                href={user.instagram || "#"}
                target={user.instagram ? "_blank" : "_self"}
                rel={user.instagram ? "noopener noreferrer" : undefined}
                onClick={() => {
                  if (!user.instagram) alert("No value for Instagram.");
                }}
              >
                <InstagramLogoIcon className="w-8 h-8 text-black  transition" />
              </a>
              <a
                href={user.twitter || "#"}
                target={user.twitter ? "_blank" : "_self"}
                rel={user.twitter ? "noopener noreferrer" : undefined}
                onClick={() => {
                  if (!user.twitter) alert("No value for Twitter.");
                }}
              >
                <TwitterLogoIcon className="w-8 h-8 text-black transition" />
              </a>
              <a
                href={user.linkedin || "#"}
                target={user.linkedin ? "_blank" : "_self"}
                rel={user.linkedin ? "noopener noreferrer" : undefined}
                onClick={() => {
                  if (!user.linkedin) alert("No value for LinkedIn.");
                }}
              >
                <LinkedInLogoIcon className="w-8 h-8 text-black  transition" />
              </a>
            </div>
            </CardContent>
          </Card>
          ))}
          

         
        </div>

        
      </div>

         {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Team;
