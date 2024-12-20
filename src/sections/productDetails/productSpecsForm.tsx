"use client";

import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { colors, Product } from ".";

interface ProductSpecsFormProps {
  product: Product;
  onAddToCart?: (size: string, quantity: number) => void;
}

const ColorBox = ({ trigger, tooltipText }: { trigger: JSX.Element, tooltipText: string }) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild onClick={() => {console.log("CLICKED")}}>{trigger}</TooltipTrigger>
        <TooltipContent className="bg-[#1F2937] text-white">
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const ColorDisplay = ({ colors }: { colors: colors[] }) => {
  // Function to split ID and pad the first part with zero (for 3-digit IDs)
  // const formatId = (id: number) => {
  //   const idStr = id.toString();

  //   // If the ID is 3 digits, pad the first part with zero
  //   if (idStr.length === 3) {
  //     const paddedId = idStr.padStart(4, "0");
  //     const firstPart = paddedId.slice(0, 2); // Get the first two digits
  //     const secondPart = paddedId.slice(2);  // Get the remaining part
  //     return [firstPart, secondPart];
  //   }

  //   // If the ID is 4 digits, simply split into two parts
  //   if (idStr.length === 4) {
  //     const firstPart = idStr.slice(0, 2);
  //     const secondPart = idStr.slice(2);
  //     return [firstPart, secondPart];
  //   }

  //   return [idStr, ""]; // For other IDs (not 3 or 4 digits)
  // };

  return (
    <div className="flex flex-wrap w-full gap-5">
      {colors.map((color) => {
        // const [firstPart, secondPart] = formatId(color.id);
        const hexValues = color.hexValue.split(", ");

        return (
          <div key={color.id}>
            {/* Diagonal or Solid Color Display */}
            {hexValues.length === 1 ? (
              // Single color div
              <ColorBox
                trigger={<div
                  className="rounded mt-2 w-12 h-8"
                  style={{
                    backgroundColor: hexValues[0],
                  }}
                ></div>}
                tooltipText={color.name}
              />

            ) : (
              // Diagonal color split
              <ColorBox
                trigger={<div
                  className="rounded relative mt-2 w-12 h-8"
                  style={{
                    background: `linear-gradient(135deg, ${hexValues[0]} 50%, ${hexValues[1]} 50%)`,
                  }}
                >
                  {/* <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 flex justify-center items-center">
                  <span className="absolute left-[25%] text-white text-lg font-semibold">{firstPart}</span>
                  <span className="text-white absolute right-[25%] text-lg font-semibold">{secondPart}</span>
                </div> */}
                </div>}
                tooltipText={color.name}
              />

            )}
          </div>
        );
      })}
    </div>
  );
};

export const ProductSpecsForm: React.FC<ProductSpecsFormProps> = ({
  product,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  // const [quantity, setQuantity] = useState(1);

  // const handleQuantityChange = (value: number) => {
  //   if (value > 0) setQuantity(value);
  // };

  // const handleAddToCart = () => {
  //   // onAddToCart(selectedSize, quantity);
  // };

  return (
    <form className="flex flex-col gap-8 my-8 p-5 border rounded-md">
      {/* Size Selector */}
      <div>
        {/* <p className="text-2xl mb-5">${product.price.toFixed(2)}</p> */}
        <label
          htmlFor="size"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Select Size
        </label>
        <select
          id="size"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="block w-[250px] p-2 border border-gray-300 rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option defaultChecked>Choose an option</option>
          {product.sizes.split('/').map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <div className="mt-5">
          <p className="text-sm font-semibold">Colors</p>
          <ColorDisplay colors={product.colors} />
        </div>
      </div>

      {/* Quantity Selector */}
      {/* <div className="flex gap-5">
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Qty
          </label>
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-3 py-2 bg-gray-200 text-gray-700 rounded-l hover:bg-gray-300 focus:outline-none"
            >
              -
            </button>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-16 py-[6.8px] text-center border-t border-b focus:outline-none"
              min={1}
            />
            <button
              type="button"
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-3 py-2 bg-gray-200 text-gray-700 rounded-r hover:bg-gray-300 focus:outline-none"
            >
              +
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="p-4 self-end text-white font-medium bg-blue-600 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add to Cart
        </button>
      </div> */}

      {/* Add to Cart Button */}
    </form>
  );
};
