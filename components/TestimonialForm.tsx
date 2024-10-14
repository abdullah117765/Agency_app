"use client";

import { PhoneIcon } from '@heroicons/react/24/solid';
import { MailIcon } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from "react";



interface TestimonialFormProps {
  testimonial: Testimonial | null;
  onSubmit: (testimonial: Testimonial) => void;
  onCancel: () => void;
}

export default function TestimonialForm({ testimonial, onSubmit, onCancel }: TestimonialFormProps) {
  const [fullName, setFullName] = useState<string>(testimonial?.fullName || "");
  const [description, setDescription] = useState<string>(testimonial?.description || "");
  const [image, setImage] = useState<File | null>(null); // Change to handle File type
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image file.");
      return;
    }

    // Call onSubmit with a File instead of a URL
    onSubmit({ id: testimonial?.id || "", fullName, description, image, status: "active" });
    setSuccessMessage("Testimonial submitted successfully!");
    resetForm();
  };

  const resetForm = () => {
    setFullName("");
    setDescription("");
    setImage(null);
    setTimeout(() => setSuccessMessage(""), 3000); // Clear success message after 3 seconds
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null; // Get the first file
    setImage(file);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">{testimonial ? "Edit" : "Add"} Testimonial</h2>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 border border-green-300 rounded">
            {successMessage}
          </div>
        )}

        <div className="relative mb-4">
          <PhoneIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div className="relative mb-4">
          <MailIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="file"
            accept="image/*" // Accept only image files
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          {image && (
            <div className="mt-2">
              <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-auto rounded-lg" />
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Save
          </button>
          <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
