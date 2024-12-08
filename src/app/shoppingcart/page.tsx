import React from "react";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
const ShoppingCart = () => {
  return (
    <>
      <Header />
      <div className="bg-[#EBE8F4] w-full px-4 sm:px-10 lg:px-40 pt-10 pb-16 h-auto text-[#2A254B]">
        <h1 className="text-2xl sm:text-3xl text-center lg:text-left">
          Your Shopping Cart
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-10">
          {/* Product Section */}
          <div className="border-2 p-4">
            <h1 className="text-lg font-semibold text-[#2A254B]">Product</h1>
            <div className="flex items-start justify-between mt-8">
              <div className="flex">
                <Image
                  src="/images/graystonevase.png"
                  alt="Product 1"
                  width={109}
                  height={134}
                  className="w-20 h-20 sm:w-28 sm:h-28 transition-transform duration-300 ease-in-out hover:scale-105 hover:translate-y-1"
                />
                <div className="ml-6">
                  <h1 className="text-[#2A254B] sm:text-lg font-medium">
                    Graystone vase
                  </h1>
                  <p className="text-sm text-[#2A254B] mt-2">
                    A timeless ceramic vase with a tri-color grey glaze.
                  </p>
                  <p className="mt-2 text-[#2A254B] font-semibold">£85</p>
                </div>
              </div>
              {/* Quantity Section */}
              <div className="flex flex-col items-center">
                <h1 className="text-sm text-[#2A254B] font-semibold sm:hidden lg:block">
                  Quantity
                </h1>
                <p className="mt-2 text-lg text-[#2A254B] font-medium">1</p>
              </div>
            </div>
            <div className="flex items-start justify-between mt-8">
              <div className="flex">
                <Image
                  src="/images/basicwhitevase.png"
                  alt="Product 2"
                  width={109}
                  height={134}
                  className="w-20 h-20 sm:w-28 sm:h-28 transition-transform duration-300 ease-in-out hover:scale-105 hover:translate-y-1"
                />
                <div className="ml-6">
                  <h1 className="text-[#2A254B] sm:text-lg font-medium">
                    Basic white vase
                  </h1>
                  <p className="text-sm text-[#2A254B] mt-2">
                    Beautiful and simple, this is one for the classics.
                  </p>
                  <p className="mt-2 text-[#2A254B] font-semibold">£85</p>
                </div>
              </div>
              {/* Quantity Section */}
              <div className="flex flex-col items-center">
                <h1 className="text-sm text-[#2A254B] font-semibold sm:hidden lg:block">
                  Quantity
                </h1>
                <p className="mt-2 text-lg text-[#2A254B] font-medium">1</p>
              </div>
            </div>
          </div>

          {/* Total Section (Hidden on Small Screens) */}
          <div className="border-2 p-4 sm:hidden lg:block">
            <h1 className="text-lg text-[#2A254B] font-semibold ml-96">
              Total
            </h1>
            <p className="mt-10 text-lg text-[#2A254B] font-medium ml-96">
              £85
            </p>
            <p className="mt-40 text-lg text-[#2A254B] font-medium ml-96">
              £85
            </p>
          </div>
        </div>
        {/* Subtotal Section */}
        <div className="mt-10 text-center lg:text-right">
          <h1 className="inline text-lg sm:text-xl font-medium mr-4 text-[#4E4D93]">
            Subtotal
          </h1>
          <h1 className="inline text-xl sm:text-2xl font-semibold text-[#2A254B]">
            £210
          </h1>
          <p className="text-sm mt-4 text-[#4E4D93]">
            Taxes and shipping are calculated at checkout
          </p>
          <button className="bg-[#2A254B] h-12 sm:h-14 mt-6 w-full sm:w-56 rounded-sm text-white">
            Go to checkout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShoppingCart;
