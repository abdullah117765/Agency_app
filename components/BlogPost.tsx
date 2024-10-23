"use client";
import { Blog } from "@/app/dashboard/blogs/blogs.interface";
import { User } from "@/app/dashboard/users/users.interface";
import image from "@/public/ag4.jpg";
import person from "@/public/person2.webp";
import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";

interface BlogPostProps {
  user: User;

  blog: Blog;
}

const BlogPost: React.FC<BlogPostProps> = ({ user, blog }) => {
  return (
    <div className="max-w-7xl mx-auto w-full p-5 px-10 mt-10 mb-32">
      <div className="flex flex-col items-center justify-center gap-28 ">
        <div>
          <Image src={image} alt="image" />
        </div>
        <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:justify-between md:gap-44">
          <div className="flex flex-col items-center px-10 justify-center gap-10">
            {user.linkedin && (
              <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedInLogoIcon />
              </a>
            )}
            {user.twitter && (
              <a href={user.twitter} target="_blank" rel="noopener noreferrer">
                <TwitterLogoIcon />
              </a>
            )}
            {user.instagram && (
              <a
                href={user.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramLogoIcon />
              </a>
            )}
          </div>
          <div className="flex items-center justify-center gap-3">
            <Image
              src={person}
              alt="person"
              className="h-[40px] w-[40px] aspect-square object-cover rounded-full"
            />
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="font-extrabold">{user.fullname}</p>
              <p className="text-slate-300">{user.role}</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 ">
            <h1>{blog.description}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
