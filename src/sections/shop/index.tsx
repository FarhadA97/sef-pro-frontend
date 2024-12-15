"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import { ChevronRight, MoveLeftIcon, MoveRightIcon } from "lucide-react";

import api from "@/lib/api";
import { SkeletonCatalog } from "@/components/skeletons";
import { Loader } from "@/components/loader/loader";
import CatalogSlider from "./catalogSlider";

interface SubCategory {
  id: number;
  name: string;
  picture: string;
  status: string;
}

interface Product {
  id: string;
  title: string;
  images: string[];
  price: number;
}

export const ProductCard = ({ product }: { product: Product }) => (
  <Link
    href={`/product/${product.id}`}
    className="relative group border overflow-hidden cursor-pointer"
  >
    {/* Image and Content */}
    <div className="h-full transform group-hover:-translate-y-12 transition-transform duration-300">
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-full h-[400px] object-fit"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-gray-500">${product.price.toFixed(2)}</p>
      </div>
    </div>

    {/* Hover Effect */}
    <div className="absolute bottom-0 left-0 w-full h-12 bg-[#111710] bg-opacity-80 text-white text-center flex items-center justify-center translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
      <span className="flex items-center">
        <p className="text-xl font-semibold ">Customize</p>
        <ChevronRight strokeWidth={3} />
      </span>
    </div>
  </Link>
);

const CategorySection = ({
  isLoading,
  isError,
  subCategories,
  categoryId,
}: {
  isLoading: boolean;
  isError: boolean;
  subCategories: SubCategory[] | undefined;
  categoryId: string;
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
      <CatalogSlider categories={subCategories} categoryId={categoryId} />
    )
  );
};

const ProductSection = ({
  isLoadingProducts,
  isErrorProducts,
  products,
  productsQueryData,
  handlePageChange,
  page,
}: {
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
            <ProductCard key={item.id} product={item} />
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

export const Shop = ({ categoryId }: { categoryId: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(currentPage);

  const { data: subCategories, isLoading, isError } = useQuery({
    queryKey: [`subCategories-category-${categoryId}`],
    queryFn: async () => {
      const data = await api(
        `api/v2/subCategory/getSubCategory?categoryId=${categoryId}`,
        { method: "GET" }
      );
      return data.subCategories as SubCategory[];
    },
  });

  const { data: productsQueryData, isLoading: isLoadingProducts, isError: isErrorProducts } = useQuery({
    queryKey: [`products-category-${categoryId}-${page}`],
    queryFn: async () => {
      const res = await api(
        `api/v2/products/getAllProducts?categoryId=${categoryId}&page=${page}`,
        { method: "GET" }
      );
      return res.data as { page: number; pages: number; products: Product[] };
    },
  });

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
        <h1 className="text-3xl font-medium">Categories</h1>
        <CategorySection
          isLoading={isLoading}
          isError={isError}
          subCategories={subCategories}
          categoryId={categoryId}
        />
      </div>
      <div id='products' className="mb-5">
        <h1 className="mt-5 text-3xl font-medium">All Products</h1>
        <ProductSection
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
