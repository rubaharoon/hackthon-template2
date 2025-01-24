"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@sanity/client";
import Link from "next/link";
import { motion } from "framer-motion";

// Initialize the Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Replace with your Sanity project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // Replace with your dataset name
  apiVersion: "2025-01-20", // Use a recent API version
  useCdn: true, // Enable CDN for faster responses
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
    slug
  }`;
  const products = await client.fetch(query);
  return products;
}

export default function CeramicsSection() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      const products = await fetchNewCeramics();
      setItems(products);
    }
    fetchData();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="py-12 px-4 md:px-8 lg:px-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2A254B] mb-8">
        New ceramics
      </h2>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        variants={containerVariants}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center space-y-4"
            variants={itemVariants}
          >
            <div className="overflow-hidden rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
              <Image
                src={item.image}
                alt={item.name}
                width={305}
                height={375}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-lg font-semibold text-[#2A254B]">
              {item.name}
            </h3>
            <p className="text-[#2A254B]">£{item.price}</p>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="mt-8 text-center"
        variants={itemVariants}
      >
        <Link href="/productlisting">
          <motion.button
            className="mt-4 mb-4 ml-8 mr-8 gap-3 text-[#2A254B] bg-[#F9F9F9] hover:bg-[#2A254B] hover:text-[#F9F9F9] font-bold py-2 px-4 rounded transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View collection
          </motion.button>
        </Link>
      </motion.div>
    </motion.section>
  );
}