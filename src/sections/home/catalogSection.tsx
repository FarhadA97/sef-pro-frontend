"use client";

import { SkeletonCatalog } from "@/components/skeletons";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ProductSlider } from "./productSlider";
import { Product } from "../shop";

interface Category {
  id: number,
  name: string,
  picture: string,
  status: string
}

const colorData = [
  {
    colorClass: 'bg-[#e1be69]',
  },
  {
    colorClass: 'bg-[#e62531]',
  },
]

const CatalogItem = ({id, image ,title ,color}: {id: number, image: string, title:string, color: string}) => {
  return (
    <Link href={`shop/${id}`} className="flex align-center group relative h-96 overflow-hidden rounded-lg bg-white shadow-lg cursor-pointer">
      {/* Image */}
      <img
        src={image}
        alt="Product"
        className="relative z-10 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:-translate-y-12 group-hover:scale-105"
      />
      {/* Overlay Text */}
      <div className={`absolute inset-0 flex justify-center bg-opacity-30 text-white text-lg font-semibold transition-opacity duration-1000 group-hover:bg-opacity-60 ${color}`}>
        <p className="p-2 w-full bg-gray-200 bg-opacity-[0.85] text-center absolute z-20 bottom-6 text-black text-[25px] font-semibold transition-all duration-500 group-hover:bottom-1 group-hover:text-[18px] group-hover:text-white group-hover:p-0 group-hover:bg-transparent">
          {title}
        </p>
      </div>
    </Link>
  );
}

export const Catalog = () => {
  const {
    data: categories,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['catalogs'],
    queryFn: async () => {
      const data = await api('api/v2/category/getCategory', {
        method: 'GET'
      });

      return data.categories as Category[];
    }
  })

  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError
  } = useQuery({
    queryKey: ['landing-products'],
    queryFn: async () => {
      const res = await api('api/v2/products/landingPageProducts', {
        method: 'GET'
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const allProducts = res.data.flatMap((category: any) => category.products) as Product[];
      console.log("products", allProducts)

      return allProducts;
    }
  })


    if ((isLoading || isError || isProductsLoading || isProductsError)) return <SkeletonCatalog height="h-[400px]" width="w-[350px]" showHeading={true} containerStyle="mt-10"/>

    return (
      <>
        <div className="flex flex-col gap-8 bg-gray-100 px-2 py-5 md:px-5 md:py-8">
          <h3 className="block w-fit text-[30px] self-center border-b-2 border-[#114EC7] text-center">Our Categories</h3>
          <div className="px-8 md:px-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {categories?.map((data,index) => (
              <CatalogItem key={index} id={data.id} title={data.name} image={data.picture} color={colorData[index].colorClass} />
            ))}
          </div>
        </div>
        {products && products.length > 0 && <div id='products'><ProductSlider products={products} /></div>}
      </>
      );
}
