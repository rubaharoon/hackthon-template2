"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";

interface Product {
  name: string;
  price: number;
  image: string;
  slug: string;
}

const LoadingSkeleton = () => (
  <div className="px-8 py-12 text-[#2A254B] mt-10">
    <h1 className="text-2xl">Our Popular Products</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="w-full h-[400px] bg-gray-100 rounded-lg animate-pulse"
        ></div>
      ))}
    </div>
  </div>
);

const ProductCard = ({ product, index }: { product: Product; index: number }) => (
  <Link
    href={`/popularproduct/${product.slug}`}
    className="group transition-transform duration-300 ease-in-out hover:scale-105"
  >
    <div className="relative overflow-hidden rounded-lg aspect-square">
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        priority={index < 2}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={85}
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
    </div>
    <div className="mt-4 text-[#2A254B]">
      <p className="py-2 font-semibold">{product.name}</p>
      <p className="text-lg font-bold">${product.price}</p>
    </div>
  </Link>
);

const PopularProduct: React.FC = () => {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPopularProducts = async () => {
    try {
      const query = `*[_type == "product" && "popular products" in tags]{
        name,
        price,
        "image": image.asset->url,
        "slug": slug.current
      }`;
      const products: Product[] = await client.fetch(query);
      setPopularProducts(products);
    } catch (err) {
      setError("Failed to fetch popular products.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularProducts();
  }, []);

  if (loading) return <LoadingSkeleton />;

  if (error) {
    return (
      <div className="px-8 py-12 text-[#2A254B] mt-10">
        <h1 className="text-2xl">Our Popular Products</h1>
        <div className="text-center py-8 text-red-500">{error}</div>
        <button
          onClick={() => {
            setError(null);
            setLoading(true);
            fetchPopularProducts();
          }}
          className="bg-[#2A254B] text-white px-6 py-3 rounded-md hover:bg-[#3a345b] transition-colors duration-200"
          aria-label="Retry fetching popular products"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section>
      <div className="px-8 py-12 text-[#2A254B] mt-10">
        <h1 className="text-2xl">Our Popular Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {popularProducts.map((product, index) => (
            <ProductCard key={index} product={product} index={index} />
          ))}
        </div>
        <div className="my-6 flex justify-center items-center">
          <Link href="/productlisting">
            <button className="bg-[#F9F9F9] py-4 px-6 rounded-[5px] text-[#2A254B] hover:bg-[#2A254B] hover:text-[#F9F9F9] transition-colors duration-300">
              View Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularProduct;