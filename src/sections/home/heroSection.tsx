"use client"; // Ensure this is a client-side component

import { useEffect } from "react";

export const HeroSection = () => {
  // State to check if component has mounted

  useEffect(() => {
    const handleScroll = () => {

        const scrollY = window.scrollY; // Current scroll position
        const image = document.getElementById("hero-image");
        console.log(scrollY)
        if (image) {    
          // Apply parallax effect and opacity change
          image.style.transform = `translateY(${scrollY * 0.2}px)`; // Moves image down
          image.style.opacity = `${Math.max(1 - scrollY / 500, 0)}`; // Reduces opacity
        }
    };

    // Attach scroll event
    window.addEventListener("scroll", handleScroll, true);

    // Clean up on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  
  return (
    <div className="relative h-[100vh]">
      <section className="homeSlider flex align-center justify-center">
        {/* Hero Image */}
        <img
          id="hero-image"
          src="/home.jpg" // Replace with your image path
          alt="Hero"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Text Content */}
        <div className="absolute text-center text-white z-12">
          <h1 className="text-4xl font-bold">Hero Title</h1>
          <p className="mt-2 text-lg">Subtitle or description here</p>
        </div>
      </section>
    </div>
  );
};
