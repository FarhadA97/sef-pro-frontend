import { InputField } from "@/components/input/input";
import { ArrowRight, MailIcon } from "lucide-react";

const UnderLine = () => {
  return (
    <div className="relative flex items-center justify-end pr-2 h-1 bg-white rounded-lg">
      <div className="right-2 w-4 h-[5px] bg-[#6DAB5B] rounded-xl" />
    </div>
  );
};
export const Footer = () => {
  return (
    <footer className="bg-black p-8 md:p-16 pb-5 footer">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-0 text-white">
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/logo.png" // Replace with the actual logo image path
            alt="Logo"
            className="object-contain"
          />
        </div>
        <div className="grid grid-cols-2">
          <div>
            <span className="block w-fit">
              <h3 className="text-lg font-medium">Products</h3>
              <UnderLine />
            </span>
            <ul className="mt-5 flex flex-col gap-2">
              <li>Sportswear</li>
              <li>Activewear</li>
              <li>Teamwear</li>
              <li>Caps</li>
              <li>Bags</li>
            </ul>
          </div>
          <div>
            <span className="block w-fit">
              <h3 className="text-lg font-medium">Links</h3>
              <UnderLine />
            </span>
            <ul className="mt-5 flex flex-col gap-2">
              <li>About Us</li>
              <li>Contact</li>
              <li>FAQs</li>
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
      <p className="mb-0 text-center text-white text-sm">SEF PRO PTY LTD &copy;. All rights reserved </p>
    </footer>
  );
};
