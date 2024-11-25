"use-client";

import { AboutUs } from "./aboutUs";
import { Catalog } from "./catalogSection";
import { HeroSection } from "./heroSection";
import { Services } from "./services";

export const Home = () => {
  return (
	<div className="overflow-hidden flex flex-col gap-10">
        <HeroSection />
        <div className="py-2 px-5 md:px-12 xl:px-20 flex flex-col gap-5">
          <h3 className="inline text-[35px] font-semibold">Products</h3>
          <Catalog />
          <AboutUs />
          <Services />
        </div>
	</div>
  );
};