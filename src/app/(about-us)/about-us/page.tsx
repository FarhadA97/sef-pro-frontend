import { Mail, Phone } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="flex flex-col gap-5 p-5 md:p-12 lg:px-[8rem]">
      <div className="flex flex-col items-center justify-center gap-5">
        <img className="w-[350px] h-[250px] mt-[-40px]" src="/logo.png" />
        <h1 className="text-3xl font-medium underline mt-[-40px] mb-10">
          COMPANY INTRODUCTION
        </h1>
        <div className="flex flex-col gap-8">
          <p className="text-lg">
            <strong>SEF PRO PTY LTD</strong> is a well-established Manufacturer
            of workwear, caps, and bags tailored to your designs and logos.
            Whether you&apos;re a business, team, or individual, we specialize
            in crafting products that reflect your unique vision.
          </p>
          <p className="text-lg">
            With over seven years of expertise, we have earned a reputation for
            delivering top-quality workwear. Our mission has always been to
            provide outstanding custom gear that meets the highest standards of
            performance and style.
          </p>
          <p className="text-lg">
            Explore our customizable fabrics and elevate your wardrobe with
            eco-friendly choices. Your journey to superior quality starts with
            us!
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-5 mt-2 mb-5">
          <div>
            <p className="underline">Phone/Whatsapp:</p>
            <p className="flex items-center mt-1 gap-2"><Phone size={18} /> +61 412 131 460</p>
          </div>
          <div>
            <p className="underline">Email:</p>
            <a href="mailto:sales@sefpro.com.au">
              <p className="flex items-center mt-1 gap-2"><Mail size={18}/>sales@sefpro.com.au</p>
            </a>
            <a href="mailto:kalas@sefpro.com.au">
              <p className="flex items-center mt-1 gap-2"><Mail size={18}/>kalas@sefpro.com.au</p>
            </a>
            <a href="mailto:info@sefpro.com.au">
              <p className="flex items-center mt-1 gap-2"><Mail size={18}/>info@sefpro.com.au</p>
            </a>
          </div>
        </div>
        <p className="underline font-medium mt-2 mb-2">Sales Office Address:</p>
        <p>SEF PRO PTY LTD</p>
        <p>18 Carnegie street Auburn NSW 2144, Australia.</p>
        <p className="underline font-medium mt-2 mb-2">
          Production Factory Address:
        </p>
        <p>SEF PRO PTY LTD</p>
        <p>S.I.E Factory Area, Sialkot 51310, Pakistan</p>
      </div>
    </div>
  );
}
