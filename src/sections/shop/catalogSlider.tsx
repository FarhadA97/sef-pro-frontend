"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

type category = {
  id: number,
  picture: string,
  name: string;
}
interface CatalogSliderProps {
  categories: category[];
  categoryId: string | number;
  subCategoryId?: string | number;
}

const ProductData = [
  { colorClass: 'bg-[#e1be69]', borderClass: 'border-[#e1be69]' },
  { colorClass: 'bg-[#e62531]', borderClass: 'border-[#e62531]' },
  { colorClass: 'bg-[#89bba8]', borderClass: 'border-[#89bba8]' },
  { colorClass: 'bg-[#95d4e4]', borderClass: 'border-[#95d4e4]' },
  { colorClass: 'bg-[#ccbeb0]', borderClass: 'border-[#ccbeb0]' },
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
const CatalogSlider = ({
  categories,
  categoryId,
  subCategoryId
}: CatalogSliderProps) => {
  return (
    <div className="relative">
      {/* Custom Navigation Buttons */}
      <button
        className="absolute -left-5 z-10 bg-gray-300 p-2 rounded-full -translate-y-1/2 top-1/2"
        id="prev-button"
      >
        <ChevronLeftIcon />
      </button>
      <button
        className="absolute -right-5 z-10 bg-gray-300 p-2 rounded-full -translate-y-1/2 top-1/2"
        id="next-button"
      >
        <ChevronRightIcon /> {/* Right Arrow */}
      </button>

      <Swiper
        navigation={{
          prevEl: '#prev-button', // Attach custom navigation buttons
          nextEl: '#next-button',
        }}
        modules={[Navigation]}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2.5, spaceBetween: 10 },
          1024: { slidesPerView: 'auto', spaceBetween: 10 },
        }}
      >
        {categories.map((category, index) => {
          const slideColor =
            ProductData[Math.floor(Math.random() * ProductData.length)].colorClass;
          const borderColor = ProductData.find(
            (p) => p.colorClass === slideColor
          )?.borderClass;

          return (
            <SwiperSlide
              className={`!w-fit my-5 ${
                category.id === subCategoryId && `border-2 rounded-lg ${borderColor}`
              }`}
              key={index}
            >
              <Link
                href={`/shop/${categoryId}/category/${category.id}`}
                className="!cursor-pointer"
              >
                <CatalogItem
                  image={category.picture}
                  title={category.name}
                  color={slideColor}
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CatalogSlider;
