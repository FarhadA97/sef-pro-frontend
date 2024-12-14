"use client";

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Product } from "../productDetails";
import ReactPaginate from "react-paginate";
import { ProductCard } from "../shop";
import { Loader } from "@/components/loader/loader";
import { MoveLeftIcon, MoveRightIcon, SearchIcon, SearchXIcon } from "lucide-react";
import { ProductCardSkeleton } from "@/components/skeletons/productCard";

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

export const Search = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchKey = searchParams.get('query')
    const [page, setPage] = useState(1);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1) return;

        setPage(newPage);
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`?${params.toString()}`);
        if (document.getElementById("products")) {
            setTimeout(() => {
                document.getElementById("products")?.scrollIntoView({
                    behavior: 'smooth'
                });
            }, 200);
        }
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: [`search-${searchKey}`],
        queryFn: async () => {
            const res = await api(`api/v2/products/searchProducts?searchTerm=${searchKey}&page=${page}`, {
                method: 'GET'
            });

            return res.data as { page: number; pages: number; products: Product[] };
        }
    })

    if (isLoading) {
        return (
            <div className="p-5">
                <div className="flex items-center justify-center gap-2">
                <SearchIcon/>
                <h1 className="text-lg my-5"> Searching Results for {searchKey}</h1>
                </div>
                <ProductCardSkeleton />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="h-[500px] flex items-center justify-center">
                <div className="flex items-center justify-center gap-2">
                    <SearchXIcon size={50} />
                    <h2 className="text-xl">Something went wrong!</h2>
                </div>
            </div>
        )
    }

    if (!data?.products || data?.products.length === 0 ) {
        return (
            <div className="h-[500px] flex items-center justify-center">
            <div className="flex items-center justify-center gap-2">
                <SearchXIcon size={50} />
                <h2 className="text-xl">No products were found matching your selection.</h2>
            </div>
        </div>
        )
    }

    return (
        <div className="p-5">
            <ProductSection
                isLoadingProducts={isLoading}
                isErrorProducts={isError}
                products={data?.products}
                productsQueryData={data || { pages: 0 }}
                handlePageChange={handlePageChange}
                page={page}
            />
        </div>
    )
}
