import React from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const QuoteForm = () => {
  return (
    <div className="max-w-7xl mx-auto w-full p-5 px-10 my-20">
      <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:items-center md:justify-between md:px-20 md:py-10">
        <div>
          <h1 className="font-extrabold text-7xl tracking-tighter max-w-md border-b-4 border-yellow-500">
            Your <br /> Service
            <br /> Our <br />
            Responisbility
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center bg-white shadow-2xl px-28 py-10 rounded-md gap-10">
          <h1 className="font-extrabold border-b-2 border-yellow-500 py-2">
            Enter Details Here
          </h1>
          <Input placeholder="Name" type="text" />
          <Input placeholder="Email" type="email" />
          <Input placeholder="Phone" type="phone" />
          <Input placeholder="Service Intersted" type="text" />
          <Textarea placeholder="Message" typeof="text" />
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
