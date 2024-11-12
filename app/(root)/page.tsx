'use client';

import FeaturedProjects from "@/components/FeaturedProjects";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import { trackVisitor } from "@/lib/utils";
import { useEffect } from 'react';
// Import the trackVisitor function

export default function Home() {
  useEffect(() => {
    // Track visitor on initial load
    trackVisitor();
  }, []); // The empty dependency array ensures this runs only once when the component mounts

  return (
    <>
      <Hero />
      <Services />
      <Testimonials />
      <FeaturedProjects />
    </>
  );
}
