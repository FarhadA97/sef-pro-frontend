"use client";

import React, { useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

interface ProductImagesProps {
  images: string[];
}

export const ProductImages: React.FC<ProductImagesProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex gap-2">
      {/* Thumbnails */}
      <div className="flex flex-col gap-3 border">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`relative w-20 h-20 overflow-hidden ${
              selectedImage === image ? "border-blue-500" : "border-gray-300"
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
        <div className="relative w-[550px] h-[500px] cursor-pointer">
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
