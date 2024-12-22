"use client";

import React, { useEffect, useState } from "react";
import { ProductImages } from "./productImages";
import { ProductSpecsForm } from "./productSpecsForm";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleDot, SearchXIcon } from "lucide-react";
import api from "@/lib/api";
import { ProductDetailsSkeleton } from "@/components/skeletons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Category } from "@/layouts/home/navbar";
import Link from "next/link";

interface ProductPage {
  id: string;
}

export interface colors {
  id: number;
  hexValue: string;
  name: string;
}

export interface Product {
  id: string;
  title: string;
  images: string[];
  price: number;
  sizes: string;
  description: string[];
  colors: colors[];
}

export const ProductPage: React.FC<ProductPage> = ({ id }) => {
  const queryClient = useQueryClient();
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null)

  const localState = JSON.parse(localStorage?.getItem('state') as string) as {categoryId: string; productId: string} | null;

  const allCategories = queryClient.getQueryData(['all-categories']) as Category[];
  const isSameProduct = id === localState?.productId;

  useEffect(() => {
    if(localState){
      const currentCategory = allCategories?.find(category => category.id === Number(localState?.categoryId))
      setCurrentCategory(currentCategory ? currentCategory : null)
    }
  },[localState,allCategories])

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`product-details-${id}`],
    queryFn: async () => {
      const data = await api(`api/v2/products/getAllProducts?id=${id}`, {
        method: "GET",
      });

      return data.product as Product;
    },
  });

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (isError) {
    return (
      <div className="h-[600px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <SearchXIcon width={100} height={100} />
          <h1>Something went wrong! Couldn&apos;t load product details</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-5 md:px-12 xl:px-20">
      {product && (
        <>
          {isSameProduct && (
            <div className="flex gap-1 md:gap-2 mb-5">
              <Link href='/' className="group">
                <p className="text-xs md:text-sm">Home</p>
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"></span>
              </Link>/
              {currentCategory && (
                <>
                <Link href={`/shop/${currentCategory.id}`} className="group">
                  <p className="text-xs md:text-sm">{currentCategory?.name}</p>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"></span>
                </Link>
                /
                </>
              )}
              <p className="text-gray-400 text-xs md:text-sm">{product.title}</p>
            </div>
          )}
          <h1 className="text-3xl">{product.title}</h1>
          <div className="mt-8 flex flex-col md:flex-row gap-8 lg:gap-[5rem]">
            <ProductImages images={product.images} />
            <div className="pl-0 lg:pl-18 w-full lg:w-[70%]">
              <ul>
                {product.description.map((desc, index) => (
                  <li key={index} className="flex items-center gap-2 mb-1">
                    <CircleDot size={12} strokeWidth={3} />
                    <p className="text-lg">{desc}</p>
                  </li>
                ))}
              </ul>
              <ProductSpecsForm product={product} />
            </div>
          </div>
          <Accordion type="single" collapsible className="mt-5 w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent className="p-2 border border-b-0 rounded-tr-md rounded-tl-md">
                <p className="mb-2">{product.title}</p>
                <ul>
                  {product.description.map((desc, index) => (
                    <li key={index} className="flex items-center gap-2 mb-1">
                      <CircleDot size={12} strokeWidth={3} />
                      <p>{desc}</p>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Sizes/Colors</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <p className="font-medium">Colors:</p>
                  {product.colors.map((color) => color.name).join(", ")}
                </div>
                <div></div>
                <div className="flex gap-2">
                  <p className="font-medium">Sizes:</p>
                  {product.sizes
                    .split("/")
                    .map((size) => size)
                    .join(", ")}
                </div>
                <div></div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      )}
    </div>
  );
};
