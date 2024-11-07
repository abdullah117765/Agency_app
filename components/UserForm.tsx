"use client";


import { User } from '@/app/dashboard/users/users.interface';
import { PhoneIcon, } from '@heroicons/react/24/solid';
import {
  AvatarIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  PersonIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { MailIcon } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from "react";


interface UserFormProps {
  user: User | null;
  onSubmit: (user: User) => void;
  onCancel: () => void;
}

export default function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const [fullname, setFullname] = useState<string>(user?.fullname || "");
  const [role, setRole] = useState<string>(user?.role || "");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [phoneNumber, setpPhoneNumber] = useState<string>(user?.phoneNumber || "");
  const [twitter, setTwitter] = useState<string>(user?.twitter || "");
  const [instagram, setInstagram] = useState<string>(user?.instagram || "");
  const [linkedin, setLinkedin] = useState<string>(user?.linkedin|| "");
  const [image, setImage] = useState<File | string |  null>(user?.image || null); // Change to handle File type
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image file.");
      return;
    }

    // Call onSubmit with a File instead of a URL
    onSubmit({ id: user?.id || "", fullname, role, email,phoneNumber,twitter,instagram,linkedin, image, status: "active" });
    setSuccessMessage("User submitted successfully!");
    resetForm();
  };

  const resetForm = () => {
    setFullname("");
    setRole("");
    setEmail("");
    setpPhoneNumber("");
    setTwitter("");
    setInstagram("");
    setLinkedin("");
    setImage(null);
    setTimeout(() => setSuccessMessage(""), 3000); // Clear success message after 3 seconds
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null; // Get the first file
    setImage(file);
  };

  return (
<div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center">
  <form
    onSubmit={handleSubmit}
    className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl max-h-screen overflow-y-auto"
  >
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
      {user ? "Edit" : "Add"} User
    </h2>

    {/* Success Message */}
    {successMessage && (
      <div className="mb-4 p-2 bg-green-100 text-green-700 border border-green-300 rounded">
        {successMessage}
      </div>
    )}

    {/* Form Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Full Name Field */}
      <div className="relative flex items-center">
        <AvatarIcon  className="absolute left-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>

      {/* Role Field */}
      <div className="relative flex items-center">
        <PersonIcon className="absolute left-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>

      {/* Email Field */}
      <div className="relative flex items-center">
        <MailIcon className="absolute left-3 h-5 w-5 text-gray-400" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>

      {/* Phone Number Field */}
      <div className="relative flex items-center">
        <PhoneIcon className="absolute left-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setpPhoneNumber(e.target.value)}
          className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>

      {/* Twitter Field */}
      <div className="relative flex items-center">
        <TwitterLogoIcon className="absolute left-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Twitter"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
          className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Instagram Field */}
      <div className="relative flex items-center">
        <InstagramLogoIcon className="absolute left-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* LinkedIn Field */}
      <div className="relative flex items-center">
        <LinkedInLogoIcon className="absolute left-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="LinkedIn"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Image Upload Field */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
        {image && (
          <div className="mt-2">
            <img
             src={
                  typeof image === "string" ? image : URL.createObjectURL(image)
                }
              alt="Preview"
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}
      </div>
    </div>

    {/* Buttons */}
    <div className="flex justify-between mt-6">
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Save
      </button>
      <button
        type="button"
        className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  </form>
</div>

  );
}
