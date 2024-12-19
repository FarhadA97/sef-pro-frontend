"use-client";

import { AboutUs } from "./aboutUs";
import { Catalog } from "./catalogSection";
import { HeroSection } from "./heroSection";
import { Services } from "./services";

export const Home = () => {
  return (
	<div className="overflow-hidden flex flex-col">
        <HeroSection />
        <div className="pb-2 flex flex-col gap-8">
        {/* <div className="py-2 px-5 md:px-12 xl:px-20 flex flex-col gap-20"> */}
          <Catalog />
          <AboutUs />
          <Services />
        </div>
	</div>
  );
};
