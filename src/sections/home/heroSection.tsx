"use client"; // Ensure this is a client-side component

import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { ArrowRight, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useSpring, animated, useInView } from "@react-spring/web";

const heroSectionData = [
  {
    title: (
      <div className="flex flex-col lg:flex-row w-full items-center justify-center">
        <span className="absolute mx-auto py-4 flex border w-fit bg-gradient-to-l blur-xl from-[#987736] via-[#81B42E] to-[#D8592E] bg-clip-text text-6xl box-content font-extrabold text-transparent text-center select-none">
          High Visibility
        </span>
        <h1 className="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-l items-center from-[#987736] via-[#81B42E] to-[#D8592E] bg-clip-text text-6xl font-extrabold text-transparent text-center select-auto">
          High Visibility
        </h1>
        <h1 className="text-3xl mt-2 ml-5">Work Wears</h1>
      </div>
    ),
    description: (
      <div className="flex flex-col lg:flex-row gap-2 items-center">
        <p>wide range of certified high visibility garments aiming to protect workers</p>
        <Link href="#products" className="flex justify-center">
          <button className="flex items-center justify-center gap-2 p-5 bg-[#1F2937] rounded-full text-white">
            Browse <ArrowRight width={20} height={20}/>
          </button>
        </Link>
      </div>
    ),
    image: "/heroImage.jpg",
    textSectionStyles: "",
  },
  {
    title: (
      <p>
        Empowering You with Custom Gear and Trusted Protection.
      </p>
    ),
    description: (
      <Link href="#products" className="flex justify-center mt-5">
        <button className="flex items-center justify-center gap-2 p-5 bg-[#1F2937] rounded-full text-white">
          Browse <ArrowRight width={20} height={20}/>
        </button>
      </Link>
    ),
    image: "/heroImage2.png",
    textSectionStyles: "",
  },
];

export const HeroSection = () => {
  const [ref] = useInView({
    once: true,
});

  const slideInTop = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 300,
  });

  const slideInBottom = useSpring({
    from: { opacity: 0, transform: "translateY(-50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 200,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY; // Current scroll position
      const images = document.querySelectorAll<HTMLImageElement>(".hero-image"); // Get all images

      images.forEach((image) => {
        // Apply parallax effect and opacity change
        image.style.transform = `translateY(${scrollY * 0.5}px)`; // Moves image down
        image.style.opacity = `${Math.max(1 - scrollY / 1000, 0)}`; // Reduces opacity
      });
    };

    // Attach scroll event
    window.addEventListener("scroll", handleScroll, true);

    // Clean up on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <div ref={ref} className="relative">
      <button
        className="absolute left-2 z-10 p-2 rounded-full -translate-y-1/2 top-1/2"
        id="prev-button"
      >
        <ChevronLeftIcon color="white" width={50} height={50} />
      </button>
      <button
        className="absolute right-2 z-10 p-2 rounded-full -translate-y-1/2 top-1/2"
        id="next-button"
      >
        <ChevronRightIcon color="white" width={50} height={50} /> {/* Right Arrow */}
      </button>
      <Swiper
        navigation={{
          prevEl: "#prev-button", // Attach custom navigation buttons
          nextEl: "#next-button",
        }}
        modules={[Navigation]}
        slidesPerView={1}
      >
        {heroSectionData.map((data, index) => (
          <SwiperSlide key={index}>
            <section className="homeSlider flex justify-center items-center">
              <img
                src={data.image} // Replace with your image path
                alt="Hero"
                className="hero-image absolute top-0 left-0 w-full h-full"
              />
              {/* Text Content */}
              <div
                className={`absolute text-center text-white z-12 ${data.textSectionStyles}`}
              >
                <animated.div style={slideInBottom} className="text-4xl font-medium">{data.title}</animated.div>
                <animated.div style={slideInTop} className="mt-2">{data.description}</animated.div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
