"use client";

import { useSpring, animated, useInView } from "@react-spring/web";
import { Check } from "lucide-react";

export const Services= () => {
    const [ref] = useInView({
        once: true,
    });
    
      const slideInTop = useSpring({
        from: { opacity: 0, transform: "translateY(50px)" },
        to: { opacity: 1, transform: "translateY(0px)" },
        delay: 300,
      });
    
      const slideInBottom = useSpring({
        from: { opacity: 0, transform: "translateY(-50px)" },
        to: { opacity: 1, transform: "translateY(0px)" },
        delay: 500,
      });

      const slideInLeft = useSpring({
        from: { opacity: 0, transform: "translateX(-50px)" },
        to: { opacity: 1, transform: "translateY(0px)" },
        delay: 500,
      })

  return (
    <section ref={ref} className="bg-gray-100 p-5 lg:p-16 rounded-lg">
      <div className="grid grid-cols-1 lg:grid-cols-[calc(50%-4em)_calc(50%-2em)] gap-8 lg:gap-0">
        <div className="flex flex-col gap-5 mb-8 md:mb-0 order-last lg:order-first">
          <h2 className="mb-0 lg:mb-4 text-2xl lg:text-4xl font-bold text-gray-800">
            lorem ipsum dolor est.
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero at
            voluptates sapiente doloremque sint eaque optio blanditiis
            reiciendis
          </p>
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero at
            voluptates sapiente doloremque sint eaque optio blanditiis
            reiciendis
          </p>
          <ul className="flex flex-col gap-5">
            <animated.li style={slideInLeft} className="flex gap-2 items-center">
              <Check />
              <p className="text-xl lg:text-2xl font-semibold">Service 1</p>
            </animated.li>
            <animated.li style={slideInLeft} className="flex gap-2 items-center">
              <Check />
              <p className="text-xl lg:text-2xl font-semibold">Service 1</p>
            </animated.li>
            <animated.li style={slideInLeft} className="flex gap-2 items-center">
              <Check />
              <p className="text-xl lg:text-2xl font-semibold">Service 1</p>

            </animated.li>
          </ul>
        </div>
        <div className="flex skew-x-[-5deg]">
            <animated.img style={slideInBottom} className="relative w-[33%] object-cover" src="https://www.infinitudefight.com/wp-content/themes/infinitude/img/sections/production/sewing.webp" alt="" />
            <animated.img style={slideInTop} className="relative w-[33%] top-4 object-cover" src="https://www.infinitudefight.com/wp-content/themes/infinitude/img/sections/production/embroidery.webp" alt="" />
            <animated.img style={slideInBottom} className="relative w-[33%] object-cover" src="https://www.infinitudefight.com/wp-content/themes/infinitude/img/sections/production/screenprinting.webp" alt="" />
        </div>
      </div>
    </section>
  );
};
