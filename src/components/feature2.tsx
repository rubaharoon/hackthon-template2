import Image from "next/image";

export default function FeatureSection() {
  return (
    <section className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between px-6 md:px-12 lg:px-20 py-10 lg:py-16 bg-white">
      {/* Left Content */}
      <div className="lg:w-1/2 text-center lg:text-left mb-6 lg:mb-0">
        <h2 className="text-2xl md:text-2xl font-semibold text-[#2A254B] leading-snug mb-4 mt-8">
          From a studio in London to a global brand with <br /> over 400 outlets
        </h2>
        <p className="text-[#505977] mb-6 leading-relaxed mt-6">
          When we started Avion, the idea was simple. Make high quality
          furniture <br /> affordable and available for the mass market.
        </p>
        <p className="text-[#505977] mb-8 leading-relaxed">
          Handmade, and lovingly crafted furniture and homeware is what we live,{" "}
          <br /> breathe and design so our Chelsea boutique became the hotbed
          for the <br /> London interior design community.
        </p>
        <div className="mt-32">
          <button className="bg-[#F9F9F9] py-4 px-4 rounded-[5px] text-[#2A254B]">
            Get in touch
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="lg:w-1/2">
        <Image
          src="/images/furniture.png"
          alt="Furniture"
          width={720}
          height={603}
          className="rounded-md object-cover"
        />
      </div>
    </section>
  );
}
