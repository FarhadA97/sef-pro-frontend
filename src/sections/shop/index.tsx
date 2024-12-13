"use client";

import { useQuery } from "@tanstack/react-query";
import CatalogSlider from "./catalogSlider";
import api from "@/lib/api";
import Link from "next/link";
import { SkeletonCatalog } from "@/components/skeletons";
import { Loader } from "@/components/loader/loader";

interface SubCategory {
  id: number,
  name: string,
  picture: string,
  status: string
}

interface Product {
  id: string,
  title: string,
  images: string[],
  price: number,
}


export const ProductCard = ({ product }: { product: { id: string, images: string[], title: string, price: number } }) => {
  return (
    <Link href={`/product/${product.id}`} className="relative group border overflow-hidden cursor-pointer">
      {/* Image and Content Container */}
      <div className="h-full transform group-hover:-translate-y-12 transition-transform duration-300">
        {/* Product Image */}
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-[400px] object-fit"
        />

        {/* Title and Price */}
        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-gray-500">${product.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Hover Effect: Customize */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-[#111710] bg-opacity-80 text-white text-center flex items-center justify-center translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
        <span className="text-lg font-semibold">Customize</span>
      </div>
    </Link>
  );
};

export const Shop = ({ categoryId }: { categoryId: string }) => {
  const {
    data: subCategories,
    isLoading,
    isError
  } = useQuery({
    queryKey: [`subCategories-category-${categoryId}`],
    queryFn: async () => {
      const data = await api(`api/v2/subCategory/getSubCategory?categoryId=${categoryId}`, {
        method: 'GET'
      });

      return data.subCategories as SubCategory[];
    }
  })

  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts
  } = useQuery({
    queryKey: [`products-category-${categoryId}`],
    queryFn: async () => {
      const data = await api(`api/v2/products/getProduct?categoryId=${categoryId}`, {
        method: 'GET'
      });

      return data.products as Product[];
    }
  })

  return (
    <div className="mt-5 px-8">
      <div className="py-5">
        <h1 className="text-3xl font-medium">Categories</h1>
        {isLoading || isError || !subCategories
          ? <div className="p-5"><SkeletonCatalog height="h-[300px]" /></div>
          : subCategories.length > 0
          && <CatalogSlider categories={subCategories!} categoryId={categoryId} />
        }
      </div>
      <div className="mb-5">
        <h1 className="mt-5 text-3xl font-medium">All Products</h1>
        {
          isLoadingProducts
          ? <div className="my-8"><Loader /></div>
          : isErrorProducts
          ? <h1>Something went wrong</h1>
          : products && products.length > 0
          && <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {products.map((item, index) => (
                <ProductCard key={index} product={item} />
              ))}
            </div>
        }
      </div>
    </div>
  );
};
