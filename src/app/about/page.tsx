import React from "react";
import FeaturesSection from "@/components/feature";
import NewsletterSignup from "@/components/newslettersignup";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <div>
      <div className="w-full h-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-16 py-8">
        <div className="md:w-2/4 text-xl md:text-2xl text-center md:text-left text-custom-purple">
          A brand built on the love of craftsmanship, quality, and outstanding customer service
        </div>
        <div className="mt-6 md:mt-0">
          <Link href="/productlisting">
          <button className="bg-gray-200 h-12 w-40 rounded-sm text-custom-purple">
            View our products
          </button>
          </Link>
        </div>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center h-auto md:h-[478px] mx-4 mb-4">
      {/* Left Section */}
      <div className="bg-[#2A254B] h-[400px] text-white flex flex-col justify-center p-6 md:pl-10  mt-[-80px]">
        <h2 className="font-clash text-lg md:text-2xl leading-6 md:leading-8 mb-4">
          It started with a small idea
        </h2>
        <p className="font-satoshi text-sm md:text-base leading-5 md:leading-6 mb-6">
          A global brand with local beginnings, our story began in a small studio in South London in early 2014.
        </p>
        <Link
          href="/productlisting"
          className="bg-[#F9F9F926] text-white text-center font-medium text-sm md:text-base hover:bg-slate-400 hover:text-black
          max-w-max py-3 px-6 rounded-lg transition-all duration-300"
        >
          View Collection
        </Link>
      </div>

      {/* Right Section */}
      <div className="relative h-full">
        <Image
          src="/images/about.png"
          alt="chair"
   
          width={700}
          height={600}
          className="h-[400px]  object-cover"
        />
      </div>
      </div>

      {/* Service Section */}
      <div className="flex flex-col md:flex-row w-full h-auto items-center px-4 py-16 space-y-8 md:space-y-0">
        <Image 
          src="/images/service.png"
          alt="Service"
          width={720}
          height={603}
          className="w-full md:w-2/5 transition-transform duration-300 ease-in-out hover:scale-105 hover:translate-y-1"
        />
        <div className="border-2 bg-slate-200 w-full md:w-3/5 p-8 md:p-20">
          <h1 className="text-xl md:text-2xl text-custom-purple">
            Our service isn&lsquo;t just personal, it&lsquo;s actually hyper-personally exquisite
          </h1>
          <p className="text-custom-purple mt-6">
            When we started Avion, the idea was simple. Make high-quality furniture affordable and available for the
            mass market. Handmade, and lovingly crafted furniture and homeware is what we live, breathe, and design so
            our Chelsea boutique became the hotbed for the London interior design community.
          </p>
          <button className="bg-white h-12 w-40 rounded-sm mt-10 text-custom-purple">Get in Touch</button>
        </div>
      </div>
      <FeaturesSection />
      <NewsletterSignup />
</div>
  );
}

export default About;