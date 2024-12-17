"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Product, ProductCard } from "../shop";

export const ProductSlider = ({ products }: { products: Product[] }) => {
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
          prevEl: "#prev-button", // Attach custom navigation buttons
          nextEl: "#next-button",
        }}
        className="bg-red"
        modules={[Navigation]}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2.5, spaceBetween: 10 },
          1024: { slidesPerView: 'auto', spaceBetween: 10 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide className={`!w-fit`} key={product.id}>
            <ProductCard containerStyle="" product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
