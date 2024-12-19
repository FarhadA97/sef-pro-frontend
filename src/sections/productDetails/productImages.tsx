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
        <div className="relative cursor-pointer lg:min-w-[500px] lg:max-h-[500px]">
          <Item
            original={selectedImage}
            thumbnail={selectedImage}
            width="1000"
            height="1000"
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
          {images.filter(i => i !== selectedImage).map((image, index) => (
            <Item
              key={index}
              original={image}
              thumbnail={image}
              width="1000"
              height="1000"
            >
              {({ ref }) => <img ref={ref} src={image} alt={`Gallery ${index + 1}`} />}
            </Item>
          ))}
        </div>
      </Gallery>
    </div>
  );
};
