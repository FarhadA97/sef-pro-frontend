"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';

const ProductData = [
  { colorClass: 'bg-[#e1be69]' },
  { colorClass: 'bg-[#e62531]' },
  { colorClass: 'bg-[#89bba8]' },
  { colorClass: 'bg-[#95d4e4]' },
  { colorClass: 'bg-[#ccbeb0]' },
];

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
const CatalogSlider = ({ categories }: { categories: { id: number, picture: string; name: string; }[] }) => {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      slidesPerView={1}
      breakpoints={{
        768: { slidesPerView: 2.5, spaceBetween: 10 },
        1024: { slidesPerView: 'auto', spaceBetween: 10 },
      }}
      className="w-full my-8"
    >
      {categories.map((category, index) => (
        <SwiperSlide className='!w-fit' key={index}>
          <CatalogItem image={category.picture} title={category.name} color={ProductData[Math.floor(Math.random() * ProductData.length)].colorClass} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CatalogSlider;