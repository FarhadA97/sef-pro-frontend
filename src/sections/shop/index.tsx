"use client";

import { useQuery } from "@tanstack/react-query";
import CatalogSlider from "./catalogSlider";
import api from "@/lib/api";
import Link from "next/link";

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

// const categories = [
//     { image: 'https://media.istockphoto.com/id/466367844/photo/clothes-make-running.jpg?s=1024x1024&w=is&k=20&c=sHJhf4AhE-BoUwGWqcbDkiiiumyYBoTiioMb29EeVx8=', title: 'Category 1', color: 'bg-blue-600' },
//     { image: 'https://media.istockphoto.com/id/466367844/photo/clothes-make-running.jpg?s=1024x1024&w=is&k=20&c=sHJhf4AhE-BoUwGWqcbDkiiiumyYBoTiioMb29EeVx8=', title: 'Category 2', color: 'bg-red-600' },
//     { image: 'https://media.istockphoto.com/id/466367844/photo/clothes-make-running.jpg?s=1024x1024&w=is&k=20&c=sHJhf4AhE-BoUwGWqcbDkiiiumyYBoTiioMb29EeVx8=', title: 'Category 3', color: 'bg-green-600' },
//     { image: 'https://media.istockphoto.com/id/466367844/photo/clothes-make-running.jpg?s=1024x1024&w=is&k=20&c=sHJhf4AhE-BoUwGWqcbDkiiiumyYBoTiioMb29EeVx8=', title: 'Category 4', color: 'bg-yellow-600' },
// ];

// const ProductData = [
//     {
//       title: 'Tanktop',
//       image: 'https://www.infinitudefight.com/wp-content/uploads/2024/03/ves-01-black-250x250.webp',
//       colorClass: 'bg-[#e1be69]',
//     },
//     {
//       title: 'Tanktop',
//       image: 'https://www.infinitudefight.com/wp-content/uploads/2024/03/ves-01-black-250x250.webp',
//       colorClass: 'bg-[#e62531]',
//     },
//     {
//       title: 'Tanktop',
//       image: 'https://www.infinitudefight.com/wp-content/uploads/2024/03/ves-01-black-250x250.webp',
//       colorClass: 'bg-[#89bba8]',
//     },
//     {
//       title: 'Tanktop',
//       image: 'https://www.infinitudefight.com/wp-content/uploads/2024/03/ves-01-black-250x250.webp',
//       colorClass: 'bg-[#95d4e4]',
//     },
//     {
//       title: 'Tanktop',
//       image: 'https://www.infinitudefight.com/wp-content/uploads/2024/03/ves-01-black-250x250.webp',
//       colorClass: 'bg-[#ccbeb0]',
//     }
// ]

const ProductCard = ({ product }: {product: {id: string, images: string[], title: string, price: number}}) => {
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

export const Shop = ({categoryId}: { categoryId: string}) => {
  const {data: subCategories} = useQuery({
    queryKey: ['sub-categories'],
    queryFn: async () => {
      const data = await api(`api/v2/subCategory/getSubCategory?categoryId=${categoryId}`, {
        method: 'GET'
      });

      return data.subCategories as SubCategory[];
    }
  })

  const {data: products} = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const data = await api(`api/v2/products/getProduct?categoryId=${categoryId}`, {
        method: 'GET'
      });

      return data.products as Product[];
    }
  })

  console.log(products)

    return (
        <div className="p-5">
            {subCategories && subCategories.length > 0 && <CatalogSlider categories={subCategories!} />}
            {products && products.length > 0 && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {products.map((item, index) => (
                    <ProductCard key={index} product={item} />
                ))}
            </div>}
        </div>
    );
};
