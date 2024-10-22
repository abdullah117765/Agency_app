"use client";

import { Quote } from "@/app/dashboard/quotes/quotes.interface";
import { PhoneIcon } from "@heroicons/react/24/solid";
import { MailIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";

interface QuoteFormProps {
  quote: Quote | null;
  onSubmit: (quote: Quote) => void;
  onCancel: () => void;
}

export default function QuoteForm({
  quote,
  onSubmit,
  onCancel,
}: QuoteFormProps) {
  const [firstName, setFirstName] = useState<string>(quote?.firstName || "");
  const [lastName, setLastName] = useState<string>(quote?.lastName || "");
  const [services, setServices] = useState<string>(quote?.services || "");
  const [comments, setComments] = useState<string>(quote?.comments || "");
  const [NoOfServices, setNoOfServices] = useState<number>(
    quote?.NoOfServices || 0
  );
  const [email, setEmail] = useState<string>(quote?.email || "");
  const [phone, setPhone] = useState<string>(quote?.phone || "");

  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Form submitted:", {
      firstName,
      lastName,
      services,
      NoOfServices,
      comments,
      email,
      phone,
    });

    // Call onSubmit with a File instead of a URL
    onSubmit({
      id: quote?.id || "",
      firstName,
      lastName,
      services,
      NoOfServices,
      comments,
      email,
      phone,
    });
    setSuccessMessage("Quote submitted successfully!");
    resetForm();
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setServices("");
    setComments("");
    setNoOfServices(0);
    setEmail("");
    setPhone("");
    setTimeout(() => setSuccessMessage(""), 3000); // Clear success message after 3 seconds
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          {quote ? "Edit" : "Add"} Quote
        </h2>

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
            placeholder="First Name"
            value={firstName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFirstName(e.target.value)
            }
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div className="relative mb-4">
          <PhoneIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLastName(e.target.value)
            }
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div className="relative mb-4">
          <MailIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Services"
            value={services}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setServices(e.target.value)
            }
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div className="relative mb-4">
          <MailIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
          <input
            type="number"
            placeholder="Number of Services"
            value={NoOfServices}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNoOfServices(Number(e.target.value))
            }
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div className="relative mb-4">
          <MailIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
          <textarea
            placeholder="Comments"
            value={comments}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setComments(e.target.value)
            }
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div className="relative mb-4">
          <MailIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div className="relative mb-4">
          <MailIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPhone(e.target.value)
            }
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div className="flex justify-between">
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
