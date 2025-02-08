"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "next-sanity";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Pagination from "@/components/pagination";
import CategoryFilterBar from "@/components/categoryfilterbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Sanity client setup
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: "2025-01-20",
});

type Product = {
  _id: string;
  name: string;
  slug: { current: string };
  imageUrl: string;
  price: number;
  discount?: number; // discount fetched from Sanity
  features: string[];
  brand: string;
  rating: number;
  tags: string[];
  inStock: boolean;
  category: { _id: string; name: string };
};

type Category = {
  _id: string;
  name: string;
};
const ProductCard = ({ product }: { product: Product }) => {
  const discount = product.discount; // Discount percentage (if available)
  const finalPrice = discount
    ? product.price - product.price * (discount / 100)
    : product.price;

  return (
    <motion.div className="relative border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 bg-white">
      {/* Display discount badge if discount exists */}
      {discount && (
        <motion.div
          className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 text-sm font-bold rounded-lg shadow-lg animate-bounce"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
        >
          -{discount}% OFF
        </motion.div>
      )}
      <Link href={`/productlisting/${product.slug.current}`} passHref>
        <div className="w-full h-64 overflow-hidden relative group cursor-pointer">
          <Image
            src={product.imageUrl || "/placeholder.png"}
            alt={product.name}
            width={1000}
            height={1000}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </Link>
      <div className="p-4">
        <h3 className="font-medium text-lg text-gray-800">{product.name}</h3>
        {discount ? (
          <p className="text-gray-600">
            <span className="line-through mr-2 text-gray-500">
              £{product.price}
            </span>
            <span className="text-red-600 font-semibold text-xl">
              £{finalPrice.toFixed(2)}
            </span>
          </p>
        ) : (
          <p className="text-gray-600 text-lg">£{product.price}</p>
        )}
      </div>
    </motion.div>
  );
};

export default function ProductListing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          client.fetch(`*[_type == "product"]{
            _id,
            name,
            slug,
            "imageUrl": image.asset->url,
            price,
            discount,
            features,
            rating,
            tags,
            inStock,
            category->{_id, name}
          }`),
          client.fetch(`*[_type == "category"]{ _id, name }`),
        ]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category._id);
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesAvailability = !inStockOnly || product.inStock;

      return matchesCategory && matchesPrice && matchesAvailability;
    });
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [selectedCategories, priceRange, inStockOnly, products]);

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Pagination handlers
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const goToPreviousPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  // Filter handlers
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  const handlePriceChange = (value: number | number[]) =>
    setPriceRange(value as [number, number]);
  const handleAvailabilityChange = () => setInStockOnly((prev) => !prev);

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer position="bottom-right" autoClose={3000} />

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-64"
        style={{ backgroundImage: "url('../images/ourproduct.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white font-bold text-4xl">All Products</h1>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="container mx-auto mt-8 px-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Category Filter */}
          <div className="flex-grow sm:flex-grow-0">
            <CategoryFilterBar
              categories={categories}
              selectedCategories={selectedCategories}
              handleCategoryChange={handleCategoryChange}
            />
          </div>

          {/* In Stock Only */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">
              In Stock Only
            </label>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={handleAvailabilityChange}
              className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          {/* Price Range Slider */}
          <div className="w-64">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <Slider
              min={0}
              max={1000}
              value={priceRange}
              onChange={handlePriceChange}
              range
            />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto mt-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {currentProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          goToPreviousPage={goToPreviousPage}
          goToNextPage={goToNextPage}
        />
      </div>
    </div>
  );
}
