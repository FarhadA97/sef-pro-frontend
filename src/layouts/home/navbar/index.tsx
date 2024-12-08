/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import React from "react";

const productCategories = [
  {
    name: "Category 1",
    products: ["product 1", "product 2", "product 3"],
  },
  {
    name: "Category 2",
    products: ["product 1", "product 2", "product 3"],
  },
  {
    name: "Category 3",
    products: ["product 1", "product 2", "product 3"],
  },
];

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-[1000] bg-gray-800 text-black">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="logo">
          <Link href="/">
            <img className="w-[150x] h-[150px]" src="/logo-primary.png"/>
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white">Products</NavigationMenuTrigger>
                <NavigationMenuContent className="absolute left-0 w-screen bg-white shadow-md">
                  <div className="p-8 flex gap-[5rem]">
                    {productCategories.map((data, index) => (
                      <div key={index}>
                        <h5 className="font-semibold mb-2">{data.name}</h5>
                        <ul>
                          {data.products.map((product) => (
                            <li key={product}>
                              <p className="font-light">{product}</p>
                            </li>
                          ))}
                          <li>
                            <p className="font-medium mt-2">View All</p>
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
              <Link href="/about-us" legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent text-white`}>
                  About Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="md:hidden text-white">
          <button className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};
