"use client";
import Image from "next/image";
import { Product } from "@/app/utils/types"; // Import the shared Product type

type ProductComparisonProps = {
  products: Product[];
};

export default function ProductComparison({ products }: ProductComparisonProps) {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Product Comparison</h2>

      {/* Display All Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg">
            <div className="w-full h-32 overflow-hidden relative">
              <Image
                src={product.imageUrl}
                alt={product.name}
                className="object-cover w-full h-full"
                width={320}
                height={128}
              />
            </div>
            <h3 className="font-semibold text-lg mt-2">{product.name}</h3>
            <p className="text-gray-600">£{product.price}</p>
            <p className="text-yellow-500">{"★".repeat(product.rating ?? 0)}</p>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      {products.length > 1 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Product</th>
                {products.map((product) => (
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
                {products.map((product) => (
                  <td key={product._id} className="px-4 py-2 border">
                    £{product.price}
                  </td>
                ))}
              </tr>

              {/* Features Row */}
              <tr>
                <td className="px-4 py-2 border font-semibold">Features</td>
                {products.map((product) => (
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
                {products.map((product) => (
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
      {products.length <= 1 && (
        <p className="text-gray-500 text-center">
          Select at least 2 products to compare.
        </p>
      )}
    </div>
  );
}