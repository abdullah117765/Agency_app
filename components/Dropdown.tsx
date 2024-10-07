import React from "react";
import Link from "next/link";
type Service = {
  name: string;
  link: string;
};

type DropdownProps = {
  services: Service[];
};

const Dropdown: React.FC<DropdownProps> = ({ services }) => {
  if (!services || services.length === 0) {
    return null; // Return null if no services are passed
  }
  return (
    <div className="absolute top-full mt-1 w-56 bg-white shadow-lg z-10">
      {services.map((service, index) => (
        <a
          key={index}
          href={service.link}
          className="block px-4 py-2 text-sm text-black"
        >
          {service.name}
        </a>
      ))}
    </div>
  );
};

export default Dropdown;
