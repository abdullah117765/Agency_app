"use client";


import { Project } from '@/app/dashboard/projects/projects.interface';
import {
  KeyboardIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { ChangeEvent, FormEvent, useState } from "react";


interface ProjectFormProps {
  project: Project | null;
  onSubmit: (project: Project) => void;
  onCancel: () => void;
}

export default function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const [title, setTitle] = useState<string>(project?.title || "");

  const [description, setDescription] = useState<string>(project?.description || "");
  const [image, setImage] = useState<File | string|  null>(project?.image || null); // Change to handle File type
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image file.");
      return;
    }

    // Call onSubmit with a File instead of a URL
    onSubmit({ id: project?.id || "", title, description, image, status: "active" });
    setSuccessMessage("Project submitted successfully!");
    resetForm();
  };

  const resetForm = () => {
    setTitle("");

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
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">{project ? "Edit" : "Add"} Project</h2>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 border border-green-300 rounded">
            {successMessage}
          </div>
        )}

        <div className="relative mb-4 flex items-center">
          <PersonIcon className="absolute left-3  h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>



        <div className="relative mb-4 flex items-center">
          <KeyboardIcon className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
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
              <img  src={
                  typeof image === "string" ? image : URL.createObjectURL(image)
                } alt="Preview" className="w-full h-auto rounded-lg" />
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