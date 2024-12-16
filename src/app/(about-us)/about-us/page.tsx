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
            of Sports Wears, Active Wears, Team Wears, CAPS, Bags & work wears.
            We produce a wide range of excellent quality customized Products as
            per your Design & Logos.
          </p>
          <p className="text-lg">
            With over 7 years of manufacturing experience and knowledge, we have
            built a strong reputation as a top quality manufacturing company.
            Our objective, from the very beginning, has been to provide top
            quality uniforms & Fitness Accessories for the Top Brands.
          </p>
          <p className="text-lg">
            We have DEDICATED production arrangements for all Kinds of Sports
            Wears & Fitness Products and we are proud to offer products in every
            customized fabric even in organic, recycled and sustainable
            materials.
          </p>
        </div>
      </div>
      <div>
        <h1 className="underline mb-2 font-medium">Contact Us</h1>
        <div className="flex gap-5 mt-2">
          <div>
            <p className="underline">Phone/Whatsapp:</p>
            <p>+61 412 131 460</p>
          </div>
          <div>
            <p className="underline">Fax:</p>
            <p>08123456789</p>
          </div>
          {/* <div>
            <p className="underline">Whatsapp:</p>
            <p>+61 412 131 460</p>
          </div> */}
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
