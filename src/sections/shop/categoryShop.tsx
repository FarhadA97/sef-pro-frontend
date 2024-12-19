"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import CatalogSlider from "./catalogSlider";
import api from "@/lib/api";
import { SkeletonCatalog } from "@/components/skeletons";
import { Loader } from "@/components/loader/loader";
import { ProductCard } from "./index";
import ReactPaginate from "react-paginate";
import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Category } from "@/layouts/home/navbar";

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

const CategorySection = ({
  isLoading,
  isError,
  subCategories,
  categoryId,
  subCategoryId,
}: {
  isLoading: boolean;
  isError: boolean;
  subCategories: SubCategory[] | undefined;
  categoryId: string;
  subCategoryId: number;
}) => {
  if (isLoading || isError || !subCategories) {
    return (
      <div className="p-5">
        <SkeletonCatalog height="h-[300px]" />
      </div>
    );
  }

  return (
    subCategories.length > 0 && (
      <CatalogSlider categories={subCategories} categoryId={categoryId} subCategoryId={subCategoryId} />
    )
  );
};

const ProductSection = ({
  categoryId,
  isLoadingProducts,
  isErrorProducts,
  products,
  productsQueryData,
  handlePageChange,
  page,
}: {
  categoryId: string;
  isLoadingProducts: boolean;
  isErrorProducts: boolean;
  products: Product[] | undefined;
  productsQueryData: { pages: number };
  handlePageChange: (newPage: number) => void;
  page: number;
}) => {
  if (isLoadingProducts) return <Loader className="my-8" />;
  if (isErrorProducts) return <h1>Something went wrong</h1>;

  return (
    products && (
      <div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((item) => (
            <ProductCard categoryId={categoryId} containerStyle="border relative" key={item.id} product={item} />
          ))}
        </div>
        <ReactPaginate
          containerClassName="my-5 flex justify-center md:justify-end text-md"
          pageClassName="w-10 h-10 rounded-md"
          previousClassName="flex items-center justify-center mr-2"
          nextClassName="flex items-center justify-center ml-2"
          pageLinkClassName="flex items-center justify-center w-full h-full"
          activeClassName="bg-gray-800 text-white"
          breakClassName="p-[5.75px] text-sm"
          breakLabel="..."
          nextLabel={<MoveRightIcon />}
          onPageChange={(selected) => handlePageChange(selected.selected + 1)}
          pageCount={productsQueryData.pages}
          forcePage={page - 1}
          previousLabel={<MoveLeftIcon />}
        />
      </div>
    )
  );
};

export const CategoryShop = ({ categoryId, subCategoryId }: { categoryId: string, subCategoryId: string }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(currentPage);

  const allCategories = queryClient.getQueryData(['all-categories']) as Category[];
  const currentCategory = allCategories?.find(category => category.id === Number(categoryId))
  
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
    data: productsQueryData,
    isLoading: isLoadingProducts,
    isError: isErrorProducts
  } = useQuery({
    queryKey: [`products-subCategory-${subCategoryId}-${page}`],
    queryFn: async () => {
      const res = await api(`api/v2/products/getAllProducts?subCategoryId=${subCategoryId}&page=${page}`, {
        method: 'GET'
      });

      return res.data as { page: number; pages: number; products: Product[] }
    }
  })

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return;

    setPage(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
    if(document.getElementById("products")) {
      setTimeout(() => {
        document.getElementById("products")?.scrollIntoView({
          behavior: 'smooth'
        });
      },200);
    }
  };

  const products = productsQueryData?.products;

  return (
    <div className="mt-5 py-2 px-5 md:px-12 xl:px-20">
      <div className="py-5">
      <h1 className="text-center text-3xl mb-5">{currentCategory?.name}</h1>
        <h1 className="text-2xl font-medium">Categories</h1>
        <CategorySection
          isLoading={isLoading}
          isError={isError}
          subCategories={subCategories}
          categoryId={categoryId}
          subCategoryId={Number(subCategoryId)}
        />
      </div>
      <div className="mb-5">
        <h1 className="mt-5 text-2xl font-medium">{subCategories?.find(sub => sub.id === Number(subCategoryId))?.name || "Products"}</h1>
        <ProductSection
          categoryId={categoryId}
          isLoadingProducts={isLoadingProducts}
          isErrorProducts={isErrorProducts}
          products={products}
          productsQueryData={productsQueryData || { pages: 0 }}
          handlePageChange={handlePageChange}
          page={page}
        />
      </div>
    </div>
  );
};
