"use client";

import React from "react";
import { ProductImages } from "./productImages";
import { ProductSpecsForm } from "./productSpecsForm";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

interface ProductPage {
  id: string;
}

export interface Product {
  id: string;
  title: string;
  images: string[];
  price: number;
  sizes: string;
  description: string[];
}

export const ProductPage: React.FC<ProductPage> = ({ id }) => {
  console.log("ID", id);
  const { data: product } = useQuery({
    queryKey: ["product-details"],
    queryFn: async () => {
      const data = await api(`api/v2/products/getProduct?id=${id}`, {
        method: "GET",
      });

      return data.products as Product;
    },
  });
  console.log(product);
  return (
    <div className="container mx-auto px-5 md:px-20 py-8">
      {product && (
        <>
          <h1 className="text-3xl">{product.title}</h1>
          <div className="mt-5 flex flex-col lg:flex-row gap-[5rem]">
            <ProductImages images={product.images} />
            <div className="pl-0 lg:pl-20 w-full lg:w-[40%]">
              <ol>
                {product.description.map((desc, index) => (
                  <li key={index}>
                    <p className="text-lg">
                      {desc}
                    </p>
                  </li>
                ))}
              </ol>
              <ProductSpecsForm product={product} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
