import React from "react";
import Image from "next/image";
import { ChevronDown } from "@carbon/icons-react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
export default function ProductListing() {
  const filters = ["Category", "Product type", "Price", "Brand"];
  const sortingOptions = "Date added";

  const products = [
    { name: "The Dandy Chair", price: "£250", image: "/images/dandychair.png" },
    { name: "Rustic Vase Set", price: "£155", image: "/images/rusticvaseset.png" },
    { name: "The Silky Vase", price: "£125", image: "/images/thesilkyvase.png" },
    { name: "The Lucy Lamp", price: "£399", image: "/images/thelucylamp.png" },
    { name: "The Dandy Chair", price: "£250", image: "/images/dandychair2.png" },
    { name: "Rustic Vase Set", price: "£155", image: "/images/rusticvaseset2.png" },
    { name: "The Silky Vase", price: "£125", image: "/images/thesilkyvase2.png" },
    { name: "The Lucy Lamp", price: "£399", image: "/images/thelucylamp2.png" },
    { name: "The Dandy Chair", price: "£250", image: "/images/dandychair.png" },
    { name: "Rustic Vase Set", price: "£155", image: "/images/rusticvaseset.png" },
    { name: "The Silky Vase", price: "£125", image: "/images/thesilkyvase.png" },
    { name: "The Lucy Lamp", price: "£399", image: "/images/thelucylamp.png" },
  ];

  return (
    <div>
      <Header />
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-64"
        style={{ backgroundImage: "url('../images/ourproduct.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-[#FFFFFF] font-bold mt-[123px] mb-9 ml-20 mr-[1154px]">All Products</h1>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="container mx-auto mt-2 mb-2 ml-6 mr-6">
        <div className="flex flex-wrap justify-between items-center space-y-2 sm:space-y-0">
          {/* Filter Options */}
          <div className="flex flex-wrap space-x-4">
            {filters.map((filter, index) => (
              <div
                key={index}
                className="flex items-center text-[#2A254B] space-x-1 cursor-pointer"
              >
                <span>{filter}</span>
                <ChevronDown size={16} className="text-gray-500" />
              </div>
            ))}
          </div>

          {/* Sorting Options */}
          <div className="flex items-center text-gray-700 space-x-1">
            <span>Sorting by:</span>
            <span className="font-medium">{sortingOptions}</span>
            <ChevronDown size={16} className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto mt-7 mb-5 ml-20 mr-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="border rounded-md overflow-hidden shadow-sm"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={305}
                height={375}
                className="object-cover rounded-lg"
              />
              <div className="p-4">
                <h3 className="font-medium text-lg">{product.name}</h3>
                <p className="text-gray-500">{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View Collection Button */}
        <div className="text-center mt-8">
          <Link href="/productlisting2">
          <button className="mt-4 mb-4 ml-8 mr-8 gap-[10px]">
            View Collection
          </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}                                