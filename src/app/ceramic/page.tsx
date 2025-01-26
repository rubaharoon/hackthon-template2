"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@sanity/client";
import Link from "next/link";

// Initialize the Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-01-20",
  useCdn: true,
});

// Define the type for products
type Product = {
  name: string;
  price: number;
  image: string;
  slug: string;
};

// Fetch products with the "new ceramics" tag
async function fetchNewCeramics() {
  const query = `*[_type == "product" && "new ceramics" in tags]{
    name,
    price,
    "image": image.asset->url,
    "slug": slug.current
  }`;
  const products = await client.fetch(query);
  return products;
}

export default function CeramicsSection() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await fetchNewCeramics();
        setItems(products);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2A254B]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2A254B] mb-8">
        New ceramics
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {items.map((item, index) => (
          <Link key={index} href={`/ceramic/${item.slug}`} passHref>
            <div className="flex flex-col items-center text-center space-y-4 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={305}
                  height={375}
                  className="object-cover w-full h-full"
                  priority={index < 4} // Prioritize loading for the first four images
                />
              </div>
              <h3 className="text-lg font-semibold text-[#2A254B]">
                {item.name}
              </h3>
              <p className="text-[#2A254B]">£{item.price}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/productlisting">
          <button className="mt-4 mb-4 ml-8 mr-8 gap-3 text-[#2A254B] bg-[#F9F9F9] hover:bg-[#2A254B] hover:text-[#F9F9F9] font-bold py-2 px-4 rounded transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95">
            View collection
          </button>
        </Link>
      </div>
    </section>
  );
}
