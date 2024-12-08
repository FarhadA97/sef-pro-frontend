"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';

// CatalogItem Component
const CatalogItem = ({ image, title, color }: { image: string; title: string; color: string }) => {
  return (
    <div className="flex align-center group relative w-[320px] h-[300px] overflow-hidden rounded-lg bg-white shadow-lg">
      {/* Image */}
      <img
        src={image}
        alt="Product"
        className="relative z-10 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:-translate-y-12 group-hover:scale-105"
      />
      {/* Overlay Text */}
      <div
        className={`absolute inset-0 flex justify-center bg-opacity-30 text-white text-lg font-semibold transition-opacity duration-1000 group-hover:bg-opacity-60 ${color}`}
      >
        <p className="absolute z-20 bottom-6 text-white text-[25px] font-semibold transition-all duration-500 group-hover:bottom-1 group-hover:text-[18px]">
          {title}
        </p>
      </div>
    </div>
  );
};

// Slider Component
const CatalogSlider = ({ categories }: { categories: { image: string; title: string; color: string }[] }) => {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      slidesPerView={1.5}
      breakpoints={{
        768: { slidesPerView: 2.5, spaceBetween: 0 },
        1024: { slidesPerView: 6 },
      }}
      className="w-full my-8"
    >
      {categories.map((category, index) => (
        <SwiperSlide key={index}>
          <CatalogItem image={category.image} title={category.title} color={category.color} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CatalogSlider;