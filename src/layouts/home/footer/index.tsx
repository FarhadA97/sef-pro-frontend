"use client";

import { InputField } from "@/components/input/input";
import { ArrowRight, MailIcon } from "lucide-react";
import Link from "next/link";
import { Facebook, Instagram } from "./socialSvgs";
import { Category } from "../navbar";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const UnderLine = () => {
  return (
    <div className="relative flex items-center justify-end pr-2 h-1 bg-white rounded-lg">
      <div className="right-2 w-4 h-[5px] bg-[#6DAB5B] rounded-xl" />
    </div>
  );
};

const socials = [
  {
    name: 'facebook',
    link: 'https://www.facebook.com/sefproptyltd',
    icon: <Facebook />,
  },
  {
    name: 'instagram',
    link: 'https://www.instagram.com/sefproptyltd',
    icon: <Instagram />
  }
]
export const Footer = () => {
  const { data: productCategories, isLoading, isError } = useQuery({
    queryKey: ['all-categories'],
    queryFn: async () => {
      const data = await api('api/v2/category/getCategory', {
        method: 'GET'
      });

      return data.categories as Category[];
    }
  })

  const combinedSubCategories = productCategories?.flatMap((category) =>
    category.SubCategories.map((subCategory) => ({
      ...subCategory,
      categoryId: category.id,
    }))
  );

  return (
    <footer className="bg-black p-8 md:p-10 pb-5 footer">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-0 text-white">
        <div className="flex flex-col items-center justify-center mb-5 mt-[-30px] md:justify-start md:items-start md:text-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-1/2 h-[200px] object-contain"
          />
          <div className="flex w-1/2 items-center justify-center gap-2 relative mt-[-30px]">
          {socials.map((s) => (
            <Link key={s.name} href={s.link} target="_blank">
              {s.icon}
            </Link>
          ))}
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div>
            <span className="block w-fit">
              <h3 className="text-lg font-medium">Products</h3>
              <UnderLine />
            </span>
            <ul className="mt-5 flex flex-col gap-2">
              {
                isLoading || isError
                ? Array(3).fill(0).map((_, index) => (
                  <div key={index} className="mb-2 w-20 h-3 bg-gray-300 rounded-md animate-pulse" />
                ))
                : combinedSubCategories?.slice(0,4).map((c) => (
                  <Link key={c.name} href={`/shop/${c.categoryId}/category/${c.id}`} className="group block w-fit">
                  <li>{c.name}</li>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
                  </Link>
                ))
              }
            </ul>
          </div>
          <div>
            <span className="block w-fit">
              <h3 className="text-lg font-medium">Links</h3>
              <UnderLine />
            </span>
            <ul className="mt-5 flex flex-col gap-2">
              <Link href='/about-us' className="group block w-fit">
                <li>About</li>
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
              </Link>
              <Link href='/contact-us' className="group block w-fit">
                <li>Contact</li>
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
              </Link>
            </ul>
          </div>
        </div>
          <div>
            <span className="block w-fit mt-5 lg:mt-0">
              <h3 className="text-lg font-medium">Newsletter</h3>
              <UnderLine />
            </span>
            <InputField
              className="mt-5 mr-0 lg:mr-20"
              placeholder="Enter your email address"
              leftIcon={<MailIcon />}
              rightIcon={<ArrowRight />}/>
          </div>
      </div>
      <hr className="my-5 "/>
      <div className="flex flex-col gap-4 md:flex-row items-center justify-between">
      <div className="w-20"></div>
      <p className="mb-0 text-center text-white text-sm">SEF PRO PTY LTD &copy;. All rights reserved </p>
      <img className="" width={350} height={350} src="/footerWatermarks.jpeg"/>
      </div>
    </footer>
  );
};
