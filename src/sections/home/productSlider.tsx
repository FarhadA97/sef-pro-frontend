"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Product, ProductCard } from "../shop";

export const ProductSlider = ({ products }: { products: Product[] }) => {
  return (
    <div className="relative px-5">
      <h3 className="block w-fit text-[30px] self-center font-medium border-b-2 border-[#114EC7] mx-auto mb-8">Now Available</h3>
      {/* Custom Navigation Buttons */}
      <button
        className="absolute left-2 z-10 bg-gray-300 p-2 rounded-full -translate-y-1/2 top-1/2"
        id="prev-button"
      >
        <ChevronLeftIcon />
      </button>
      <button
        className="absolute right-2 z-10 bg-gray-300 p-2 rounded-full -translate-y-1/2 top-1/2"
        id="next-button"
      >
        <ChevronRightIcon /> {/* Right Arrow */}
      </button>

      <Swiper
        navigation={{
          prevEl: "#prev-button", // Attach custom navigation buttons
          nextEl: "#next-button",
        }}
        modules={[Navigation]}
        breakpoints={{
          768: { slidesPerView: 2, spaceBetween: 5 },
          1024: { slidesPerView: 'auto', spaceBetween: 20 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide className="w-auto md:!w-fit border rounded" key={product.id}>
            <ProductCard imageContainerStyles="md:w-[450px] min-h-[520px]" textStyle="min-h-[140px] sm:min-h-0" product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
