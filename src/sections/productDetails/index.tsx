"use client";

import React from "react";
import { ProductImages } from "./productImages";
import { ProductSpecsForm } from "./productSpecsForm";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { ProductDetailsSkeleton } from "@/components/skeletons";
import { SearchXIcon } from "lucide-react";

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
  const {
    data: product,
    isLoading,
    isError
  } = useQuery({
    queryKey: [`product-details-${id}`],
    queryFn: async () => {
      const data = await api(`api/v2/products/getProduct?id=${id}`, {
        method: "GET",
      });

      return data.products as Product;
    },
  });

  if (isLoading) {
    return <ProductDetailsSkeleton />
  }

  if (isError) {
    return <div className="h-[600px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <SearchXIcon width={100} height={100} />
        <h1>Something went wrong! Couldn&apos;t load product details</h1>
      </div>
    </div>
  }

  return (
    <div className="container mx-auto px-5 lg:px-20 py-8">
      {product && (
        <>
          <h1 className="text-3xl">{product.title}</h1>
          <div className="mt-8 flex flex-col md:flex-row gap-8 lg:gap-[5rem]">
            <ProductImages images={product.images} />
            <div className="pl-0 lg:pl-18 w-full lg:w-[40%]">
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
