"use client";

import { useQuery } from "@tanstack/react-query";
import CatalogSlider from "./catalogSlider";
import api from "@/lib/api";
import Link from "next/link";
import { SkeletonCatalog } from "@/components/skeletons";
import { Loader } from "@/components/loader/loader";
import { ProductCard } from ".";

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

export const CategoryShop = ({ categoryId, subCategoryId }: { categoryId: string, subCategoryId: string }) => {
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
    queryKey: [`products-subCategory-${subCategoryId}`],
    queryFn: async () => {
      const data = await api(`api/v2/products/getProduct?subCategoryId=${subCategoryId}`, {
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
          && <CatalogSlider categories={subCategories!} subCategoryId={Number(subCategoryId)} categoryId={categoryId} />
        }
      </div>
      <div className="mb-5">
        <h1 className="mt-5 text-3xl font-medium">{subCategories?.find(sub => sub.id === Number(subCategoryId))?.name || "Products"}</h1>
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
