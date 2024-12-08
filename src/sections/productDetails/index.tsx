import React from "react";
import { ProductImages } from "./productImages";
import { ProductSpecsForm } from "./productSpecsForm";

interface ProductPage {
    id: string;
  }

export const ProductPage: React.FC<ProductPage> = ({ id }) => {
  const productImages = [
    "https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg",
    "https://farm6.staticflickr.com/5584/14985868676_b51baa4071_h.jpg",
    "https://farm4.staticflickr.com/3920/15008465772_d50c8f0531_h.jpg",
  ];
  console.log(id);
  return (
    <div className="container mx-auto px-5 md:px-20 py-8">
        <h1 className="text-3xl">Product Title</h1>
        <div className="mt-5 flex flex-col md:flex-row gap-[5rem]">
        <ProductImages images={productImages} />
        <div className="mx-auto pr-20">
            <p className="text-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores quas natus praesentium quibusdam magnam error provident beatae! Ab labore numquam</p>
            <ProductSpecsForm sizes={['1','2','3']} />
        </div>
        </div>
    </div>
  );
};