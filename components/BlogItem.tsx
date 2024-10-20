// Import Blog interface
import { Blog } from "@/app/dashboard/blogs/blogs.interface";
import { PhoneIcon } from "@heroicons/react/24/solid"; // Import icons if needed
import { MailIcon } from "lucide-react"; // Import icons if needed

interface BlogItemProps {
  blog: Blog;
  onEdit: (blog: Blog) => void;
  onDelete: (id: string) => void;
}

export default function BlogItem({ blog, onEdit, onDelete }: BlogItemProps) {
  // Determine the source of the image
  const imageUrl =
    typeof blog.image === "string" && blog.image // Check if image is a string (URL)
      ? blog.image
      : blog.image instanceof File // Check if image is a File object
      ? URL.createObjectURL(blog.image)
      : ""; // Default to empty string if neither

  return (
    <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-md flex items-start space-x-4 transition-transform transform hover:scale-105">
      {/* Image Section */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={blog.title}
          className="w-16 h-16 rounded-full border-2 border-blue-500 shadow"
        />
      )}

      {/* Blog Content Section */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{blog.title}</h3>
        <h3 className="text-lg font-semibold text-gray-800">{blog.author}</h3>
        {/* Truncated Description */}
        <p className="text-gray-600 mt-1 line-clamp-2">
          {blog.description}
        </p>
        <div className="mt-2 flex space-x-2">
          <PhoneIcon className="h-5 w-5 text-blue-600 hover:text-blue-700 transition" />
          <MailIcon className="h-5 w-5 text-blue-600 hover:text-blue-700 transition" />
        </div>
      </div>

      

      {/* Action Buttons */}
      <div className="flex flex-col justify-between space-y-2">
        <button
          onClick={() => onEdit(blog)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-150 ease-in-out"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(blog.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-150 ease-in-out"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
