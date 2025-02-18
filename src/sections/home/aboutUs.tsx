export const AboutUs = () => {
    return (
        <section>
        <div className="mt-8 px-5 md:px-14 flex flex-col lg:flex-row items-center">
          {/* Left Side - Text */}
          <div className="flex flex-col gap-5 lg:w-1/2 mb-8 lg:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Customized Excellence for Active Lifestyles</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
            <strong>SEF PRO PTY LTD</strong> is your trusted partner for premium sportswear, activewear,
            teamwear, caps, bags, and workwear, tailored to your designs and logos.
            Whether you&apos;re a business, team, or individual, we specialize in
            crafting products that reflect your unique vision.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
                With over seven years of expertise, we have earned a reputation for
                delivering top-quality uniforms and fitness accessories to leading
                brands worldwide. Our mission has always been to provide outstanding
                custom gear that meets the higheststandards of performance and style.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed">
            Explore our customizable fabrics and elevate your wardrobe with eco-friendly choices.<br/>
            Your journey to superior quality starts with us!
            </p>

          </div>
  
          {/* Right Side - Logo */}
          <div className="md:w-1/2 order-first lg:order-last flex justify-center">
            <img
              src="/logo.png" // Replace with the actual logo image path
              alt="Logo"
              className="object-contain"
            />
          </div>
        </div>
      </section>
    )
}
