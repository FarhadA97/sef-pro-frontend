"use client";

import React, { useState } from "react";

interface ProductSpecsFormProps {
  sizes: string[];
  onAddToCart?: (size: string, quantity: number) => void;
}

export const ProductSpecsForm: React.FC<ProductSpecsFormProps> = ({
  sizes,
}) => {
  const [selectedSize, setSelectedSize] = useState<null | string>(null);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value: number) => {
    if (value > 0) setQuantity(value);
  };

  const handleAddToCart = () => {
    // onAddToCart(selectedSize, quantity);
  };

  return (
    <form className="flex flex-col gap-8 my-8 p-5 border rounded-md">
      {/* Size Selector */}
      <div>
        <p className="text-2xl mb-5">$24.00</p>
        <label
          htmlFor="size"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Select Size
        </label>
        <select
          id="size"
          value={selectedSize!}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="block w-[250px] p-2 border border-gray-300 rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option defaultChecked>Choose an option</option>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Quantity Selector */}
      <div className="flex gap-5">
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
      </div>

      {/* Add to Cart Button */}
    </form>
  );
};
