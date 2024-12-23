"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { NavbarSkeleton } from "@/components/skeletons/navbarItems";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ChevronRight, XIcon } from "lucide-react";
import { SearchBar } from "@/components/searchInput/searchInput";

export interface Category {
  id: number;
  name: string;
  SubCategories: { id: number; name: string }[];
  picture: string;
  status: string;
}

const Sidebar = ({
  open,
  onClose,
}: {
  categories: Category[];
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer open={open} direction="left">
      <DrawerContent className="z-[10000]">
        <div className="h-screen pt-12">
          <DrawerHeader>
            <DrawerTitle className="flex items-center justify-center">
              <img className="h-[120px]" src="/logo-primary.png" />
            </DrawerTitle>
            <DrawerClose className="absolute right-[1.5rem]">
              <button onClick={onClose}>
                <XIcon />
              </button>
            </DrawerClose>
          </DrawerHeader>
          <div className="pl-0 pr-6 pb-0">
            <div className="flex flex-col space-x-2 gap-4">
            <SearchBar expanded={true} onSubmit={onClose} />
              {/* {categories?.map((c) => (
                <span
                  key={c.id}
                  className="flex justify-between border-b w-full"
                >
                  <Link onClick={onClose} href={`/shop/${c.id}`} className="text-2xl">
                    {c.name}
                  </Link>
                  <ChevronRight />
                </span>
              ))} */}
              <span className="flex justify-between border-b w-full mt-5">
                  <Link onClick={onClose} href="/" className="text-2xl">
                    Home
                  </Link>
                  <ChevronRight />
              </span>
              <span className="flex justify-between border-b w-full mt-5">
                  <Link onClick={onClose} href="/about-us" className="text-2xl">
                    About Us
                  </Link>
                  <ChevronRight />
                </span>
                <span className="flex justify-between border-b w-full mt-5">
                  <Link onClick={onClose} href="/contact-us" className="text-2xl">
                    Contact Us
                  </Link>
                  <ChevronRight />
              </span>
            </div>
          </div>
          <DrawerFooter></DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {
    data: productCategories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-categories"],
    queryFn: async () => {
      const data = await api("api/v2/category/getCategory", {
        method: "GET",
      });

      return data.categories as Category[];
    },
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false); // Close the menu drawer
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize initially to ensure correct state on load
    handleResize();

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-[1000] bg-gray-800 text-black">
        <div className="px-4 flex items-center justify-between h-16">
            <Link className="logo h-[64px] flex items-center justify-center overflow-hidden" href="/">
              <img className="h-[150px]" src="/logo-primary.png" />
            </Link>
          <div className="hidden md:flex space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <SearchBar />
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute left-0 w-screen bg-white shadow-md">
                    {isLoading || isError ? (
                      <NavbarSkeleton />
                    ) : (
                      <div className="p-8 flex gap-[5rem]">
                        {productCategories
                          ?.sort((a, b) => a.id - b.id)
                          .map((category, index) => (
                            <div key={index}>
                              <h5 className="font-semibold mb-2">
                                {category.name}
                              </h5>
                              <ul>
                                {category.SubCategories.sort(
                                  (a, b) => a.id - b.id
                                )
                                  .slice(0, 5) // Limit to the first 6 items
                                  .map((s) => (
                                    <li key={s.name}>
                                      <Link
                                        className="group w-fit block mb-1"
                                        href={`/shop/${category.id}/category/${s.id}`}
                                      >
                                        <p className="font-light">{s.name}</p>
                                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-gray-800"></span>
                                      </Link>
                                    </li>
                                  ))}
                                <li>
                                  <Link
                                    className="group w-fit block"
                                    href={`/shop/${category.id}`}
                                  >
                                    <p className="font-medium mt-2">View All</p>
                                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-gray-800"></span>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          ))}
                      </div>
                    )}
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about-us" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} bg-transparent text-white`}
                    >
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contact-us" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} bg-transparent text-white`}
                    >
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="md:hidden relative text-white">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="focus:outline-none"
            >
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
      <Sidebar
        categories={productCategories!}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
