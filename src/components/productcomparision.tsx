"use client";
import Image from "next/image";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Product = {
  _id: string;
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
  tags: string[];
  brand: string;
  inStock: boolean;
  features: string[];
  rating?: number;
  dateAdded?: string;
  category: object;
};

type ProductComparisonProps = {
  products: Product[];
};

export default function ProductComparison({ products }: ProductComparisonProps) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  // Function to toggle product selection
  const toggleProductSelection = (product: Product) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.some((p) => p._id === product._id)) {
        toast.info(`${product.name} removed from comparison.`, {
          position: "bottom-right",
          autoClose: 2000,
        });
        return prevSelected.filter((p) => p._id !== product._id);
      } else {
        if (prevSelected.length >= 4) {
          toast.warn("You can compare up to 4 products at a time.", {
            position: "bottom-right",
            autoClose: 2000,
          });
          return prevSelected;
        }
        toast.success(`${product.name} added to comparison.`, {
          position: "bottom-right",
          autoClose: 2000,
        });
        return [...prevSelected, product];
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Product Comparison</h2>

      {/* Product Selection Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {products.map((product) => (
          <div
            key={product._id}
            className={`border p-4 rounded-lg cursor-pointer transition-all ${
              selectedProducts.some((p) => p._id === product._id)
                ? "border-[#2A254B] shadow-lg"
                : "border-gray-200 hover:shadow-md"
            }`}
            onClick={() => toggleProductSelection(product)}
          >
            <div className="w-full h-32 overflow-hidden relative">
              <Image
                src={product.imageUrl}
                alt={product.name}
                className="object-cover w-full h-full"
                width={320}
                height={128}
                onClick={(e) => e.stopPropagation()} // Prevent image click from triggering product selection
              />
            </div>
            <h3 className="font-semibold text-lg mt-2">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-yellow-500">{"★".repeat(product.rating ?? 0)}</p>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      {selectedProducts.length > 1 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Product</th>
                {selectedProducts.map((product) => (
                  <th key={product._id} className="px-4 py-2 border">
                    {product.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Price Row */}
              <tr>
                <td className="px-4 py-2 border font-semibold">Price</td>
                {selectedProducts.map((product) => (
                  <td key={product._id} className="px-4 py-2 border">
                    ${product.price}
                  </td>
                ))}
              </tr>

              {/* Features Row */}
              <tr>
                <td className="px-4 py-2 border font-semibold">Features</td>
                {selectedProducts.map((product) => (
                  <td key={product._id} className="px-4 py-2 border">
                    <ul className="list-disc list-inside">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Rating Row */}
              <tr>
                <td className="px-4 py-2 border font-semibold">Rating</td>
                {selectedProducts.map((product) => (
                  <td key={product._id} className="px-4 py-2 border">
                    {"★".repeat(product.rating ?? 0)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Message if no products are selected */}
      {selectedProducts.length <= 1 && (
        <p className="text-gray-500 text-center">
          Select at least 2 products to compare.
        </p>
      )}

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}