import React from "react";
import TestimonialCard from "./shared/TestimonialCard";

const Testimonials = () => {
  return (
    <div className="max-w-7xl mx-auto p-5 px-10 w-full my-32">
      <div className="flex flex-col items-start justify-center gap-2">
        <h1 className="font-extrabold text-5xl md:text-6xl tracking-tighter border-b-4 border-yellow-500 py-2">
          Testimonials
        </h1>
        <p className="text-slate-500 tracking-tighter">
          Our clients speak for us: Incredible attention to detail and unmatched
          expertise. Working with Agency has been a game-changer for our
          business.
        </p>
      </div>
      <div className="flex flex-col gap-2 md:grid md:grid-cols-3 md:gap-4">
        <TestimonialCard
          name="Sam"
          testimonial="I've been in the insurance industry for years, and I've never encountered final expense leads as promising as those from US Leads Agency. Their leads are not only top-notch but also highly responsive. They've had a profound impact on my business, and I can't recommend them highly enough!"
        />
        <TestimonialCard
          name="Edward"
          testimonial="I can't praise US Leads Agency enough! After trying numerous lead providers, I can confidently state that this company is the only one that has consistently delivered outstanding results. With every order from US Leads Agency, I've managed to sell at least one policy, and my return on investment has more than doubled."
        />
        <TestimonialCard
          name="Adam"
          testimonial="US Leads Agency has revolutionized my business. Their final expense leads consistently deliver outstanding results, significantly boosting my conversions. The leads are always thoroughly vetted and eager to engage. If you're in the final expense insurance market, US Leads Agency is the best choice!"
        />
      </div>
    </div>
  );
};

export default Testimonials;
