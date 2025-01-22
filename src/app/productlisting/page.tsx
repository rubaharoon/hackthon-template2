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
import { ToastContainer, toast } from "react-toastify";
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
  features: string[];
  rating: number;
  tags: string[];
  inStock: boolean;
  category: { _id: string; name: string };
};

type Category = {
  _id: string;
  name: string;
};

const ProductCard = ({ product, onSelect }: { product: Product; onSelect: (product: Product) => void }) => (
  <Link href={`/productlisting/${product.slug.current}`} passHref>
    <motion.div
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-white"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.3 }}
    >
      <div
        className="w-full h-64 overflow-hidden relative group"
        onClick={(e) => {
          e.preventDefault();
          onSelect(product);
        }}
      >
        <Image
          src={product.imageUrl || "/placeholder.png"}
          alt={product.name}
          width={300}
          height={300}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg text-gray-800">{product.name}</h3>
        <p className="text-gray-600">£{product.price}</p>
      </div>
    </motion.div>
  </Link>
);

const ComparisonPopup = ({ products, onClose }: { products: Product[]; onClose: () => void }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-4">Product Comparison</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg">
            <Image
              src={product.imageUrl || "/placeholder.png"}
              alt={product.name}
              width={200}
              height={200}
              className="object-cover w-full h-48"
            />
            <h3 className="font-medium text-lg text-gray-800 mt-2">{product.name}</h3>
            <p className="text-gray-600">Price: £{product.price}</p>
            <p className="text-gray-600">Rating: {product.rating}/5</p>
            <p className="text-gray-600">Features: {product.features.join(", ")}</p>
          </div>
        ))}
      </div>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Close
      </button>
    </div>
  </div>
);

export default function ProductListing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [comparisonProducts, setComparisonProducts] = useState<Product[]>([]);
  const [showComparisonPopup, setShowComparisonPopup] = useState<boolean>(false);
  const [showViewButton, setShowViewButton] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsQuery = `*[_type == "product"]{
          _id,
          name,
          slug,
          "imageUrl": image.asset->url,
          price,
          features,
          rating,
          tags,
          inStock,
          category->{_id, name}
        }`;
        const productsData = await client.fetch(productsQuery);
        setProducts(productsData);
        setFilteredProducts(productsData);

        const categoriesQuery = `*[_type == "category"]{
          _id,
          name,
        }`;
        const categoriesData = await client.fetch(categoriesQuery);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category._id);
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesAvailability = !inStockOnly || product.inStock;

      return (
        matchesSearch && matchesCategory && matchesPrice && matchesAvailability
      );
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchQuery, selectedCategories, priceRange, inStockOnly, products]);

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

  const handleProductSelect = (product: Product) => {
    if (comparisonProducts.some((p) => p._id === product._id)) {
      toast.warning("This product is already selected for comparison.");
      return;
    }
    if (comparisonProducts.length >= 2) {
      toast.error("You can compare only 2 products at a time.");
      return;
    }
    setComparisonProducts([...comparisonProducts, product]);

    if (comparisonProducts.length === 0) {
      toast.info("Add one more product to compare.");
    } else if (comparisonProducts.length === 1) {
      toast.success("Products compared successfully. Click 'View' to see details.");
      setShowViewButton(true);
    }
  };

  const handleCompareButtonClick = () => {
    if (comparisonProducts.length < 2) {
      toast.error("Please add 2 products to compare.");
      return;
    }
    setShowComparisonPopup(true);
  };

  const handleCloseComparisonPopup = () => {
    setShowComparisonPopup(false);
    setShowViewButton(false); // Hide the "View" button when the popup is closed
    setComparisonProducts([]); // Clear the comparison list
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const goToPreviousPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

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
        <div className="flex flex-wrap items-center gap-4">
          {/* Search Bar */}
          <div className="flex-grow sm:flex-grow-0">
            <input
              type="text"
              placeholder="Search by name or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter Dropdown */}
          <div className="flex-grow sm:flex-grow-0">
            <CategoryFilterBar
              categories={categories}
              selectedCategories={selectedCategories}
              handleCategoryChange={handleCategoryChange}
            />
          </div>

          {/* Other Filter Options */}
          <div className="flex flex-wrap gap-4">
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
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto mt-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {currentProducts.map((product) => (
              <ProductCard key={product._id} product={product} onSelect={handleProductSelect} />
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

        {/* Compare Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleCompareButtonClick}
            className="px-4 py-2 bg-[#2A254B] text-white rounded hover:bg-gray-600"
          >
            Compare Products
          </button>
        </div>

        {/* View Button */}
        {showViewButton && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowComparisonPopup(true)}
              className="px-4 py-2 bg-[#2A254B] text-white rounded hover:bg-gray-600"
            >
              View Comparison
            </button>
          </div>
        )}
      </div>

      {/* Comparison Popup */}
      {showComparisonPopup && (
        <ComparisonPopup
          products={comparisonProducts}
          onClose={handleCloseComparisonPopup}
        />
      )}
    </div>
  );
}