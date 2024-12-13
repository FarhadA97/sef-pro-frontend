"use client";

import React, { useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

interface ProductImagesProps {
  images: string[];
}

// const SkeletonLoader = () => {
//   return (
//     <div className="flex flex-col lg:flex-row gap-6">
//       {/* Vertical Bar with small image boxes */}
//       <div className="flex flex-row lg:flex-col order-last lg:order-first gap-4">
//         {/* 3 Placeholder boxes */}
//         {Array(3).fill(0).map((_, index) => (
//           <div key={index} className="w-20 h-20 bg-gray-300 rounded-md animate-pulse" />
//         ))}
//       </div>

//       {/* Main Image Div */}
//       <div className="flex-1">
//         <div className="w-auto md:w-[400px] lg:w-[550px] h-[500px] bg-gray-300 rounded-md animate-pulse"></div>
//       </div>
//     </div>
//   );
// };

export const ProductImages: React.FC<ProductImagesProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-3 rounded border order-last lg:order-first wrap">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`relative w-20 h-20 overflow-hidden ${
              selectedImage === image ? "p-2 border-2 rounded" : "border-gray-300"
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      {/* Main Image */}
      <Gallery options={{ showHideAnimationType:'none' }}>
        <div className="relative w-auto md:w-[400px] lg:w-[550px] h-[500px] cursor-pointer">
          <Item
            original={selectedImage}
            thumbnail={selectedImage}
            width="1200"
            height="800"
          >
            {({ ref, open }) => (
              <img
                ref={ref}
                onClick={open}
                src={selectedImage}
                alt="Selected"
                className="w-full h-full rounded-md shadow-lg"
              />
            )}
          </Item>
        </div>

        {/* All Images in Gallery */}
        <div className="hidden">
          {images.map((image, index) => (
            <Item
              key={index}
              original={image}
              thumbnail={image}
              width="1200"
              height="800"
            >
              {({ ref }) => <img ref={ref} src={image} alt={`Gallery ${index + 1}`} />}
            </Item>
          ))}
        </div>
      </Gallery>
    </div>
  );
};
