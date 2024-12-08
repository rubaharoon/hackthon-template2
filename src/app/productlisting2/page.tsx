import React from "react";
import Banner from "@/components/banner";
import Header from "@/components/header";
import Image from "next/image";
import FeaturesSection from "@/components/feature";
import NewsletterSignup from "@/components/newslettersignup";
import Footer from "@/components/productlistingfooter";
export default function ProductListing() {

    const items = [
        {
          title: "The Dandy Chair",
          price: "£250",
          image: "/images/dandychair.png",
        },
        {
          title: "Rustic Vase Set",
          price: "£155",
          image: "/images/rusticvaseset.png",
        },
        {
          title: "The Silky Vase",
          price: "£125",
          image: "/images/thesilkyvase.png",
        },
        {
          title: "The Lucy Lamp",
          price: "£399",
          image: "/images/thelucylamp.png",
        },
      ];
    
    return (
        <>
        <div>
            <Banner />
            <Header />
            <section>
        <div className="px-4 md:px-8 lg:px-12 py-8 md:py-12">
          {/* Main Product Section */}
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 h-auto">
              <Image
                src={'/images/productdandychair.png'}
                height={800}
                width={800}
                alt="chair"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 md:px-10 py-6 flex flex-col justify-center">
              <div>
                <p className="text-xl md:text-2xl font-semibold">The Dandy Chair</p>
                <p className="py-2 text-lg md:text-xl">$250</p>
              </div>
              <div className="text-[#505977] text-sm md:text-base">
                <h1 className="font-semibold">Description</h1>
                <div className="my-4 md:my-6">
                  <p>
                    A timeless design, with premium materials features as one of our most popular
                    and iconic pieces. The dandy chair is perfect for any stylish living space with
                    beech legs and lambskin leather upholstery.
                  </p>
                </div>
                <div className="ml-4">
                  <ul className="list-disc space-y-1">
                    <li>Premium material</li>
                    <li>Handmade upholstery</li>
                    <li>Quality timeless classic</li>
                  </ul>
                </div>
                <div>
                  <div className="my-8">
                    <h1 className="font-semibold">Dimensions</h1>
                  </div>
                  <div className="flex gap-12 md:gap-20 text-sm md:text-base">
                    <div>
                      <h1>Height</h1>
                      <p>110cm</p>
                    </div>
                    <div>
                      <h1>Width</h1>
                      <p>75cm</p>
                    </div>
                    <div>
                      <h1>Depth</h1>
                      <p>50cm</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-between items-center mt-8">
                    <div className="flex items-center gap-4">
                      <h1>Amount:</h1>
                      <button className="flex gap-4 bg-[#F5F5F5] rounded-md px-4 py-2">
                        <span>+</span> 1 <span>-</span>
                      </button>
                    </div>
                    <button className="w-full md:w-[146px] h-[56px] bg-[#2A254B] text-white mt-4 md:mt-0">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>


<section className="py-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-2xl md:text-3xl lg:text-4xl  text-[#2A254B] mb-8">
        You might also like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-4"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={305}
              height={375}
              className="object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold text-[#2A254B]">
              {item.title}
            </h3>
            <p className="text-[#2A254B]">{item.price}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button className="mt-4 mb-4 ml-8 mr-8 gap-3 text-[#2A254B] bg-[#F9F9F9] hover:bg-[#F9F9F9]">
          View collection
        </button>
      </div>
    </section>
    <FeaturesSection />
    <NewsletterSignup />
    <Footer />
        </>
    );
};

