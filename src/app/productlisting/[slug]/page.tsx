"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReviewSection from "@/components/reviewsection"; // Import the ReviewSection component

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-01-20",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Image URL Builder
const builder = imageUrlBuilder(client);

interface SanityImage {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
  alt?: string;
}

function urlFor(source: SanityImage): string {
  return builder.image(source).url();
}

interface Dimensions {
  height?: number;
  width?: number;
  depth?: number;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: SanityImage;
  features?: string[];
  dimensions?: Dimensions;
  quantity?: number;
}

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [productData, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        const query = `*[_type == "product" && slug.current == $slug][0] {
          _id,
          name,
          price,
          description,
          image,
          features,
          dimensions {
            height,
            width,
            depth
          }
        }`;
        const product = await client.fetch<Product>(query, { slug });

        if (!product) {
          throw new Error("Product not found");
        }

        if (isMounted) {
          setProduct(product);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load product");
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2A254B]"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!productData) {
    return <div className="text-center py-8 text-red-500">Product not found.</div>;
  }

  return (
    <div>
      {/* Product Details Section */}
      <div className="flex flex-col lg:flex-row w-full min-h-screen text-[#ffffff]">
        {/* Product Image */}
        <div className="w-full lg:w-1/2 h-[600px] lg:h-[700px] flex items-center justify-center bg-gray-100">
          <Image
            className="object-cover w-[800px] h-[600px] transition-transform duration-300 ease-in-out hover:scale-105 hover:translate-y-1"
            src={urlFor(productData.image)}
            width={1000}
            height={1000}
            alt={productData.name}
            priority
          />
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 bg-white p-6 sm:p-10 text-[#2A254B] h-[600px] lg:h-[700px] overflow-y-auto">
          <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-semibold font-[Clash Display]">
              {productData.name}
            </h1>
            <p className="text-lg sm:text-xl font-normal font-[Satoshi] text-[#12131A]">
              £{productData.price.toFixed(2)}
            </p>
            <div className="space-y-4">
              <h2 className="text-lg font-medium font-[Clash Display]">Description</h2>
              <p className="text-sm sm:text-base font-[Satoshi] text-[#505977]">
                {productData.description || "Product description goes here."}
              </p>
            </div>
            {productData.features && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium font-[Clash Display]">Features</h2>
                <ul className="list-disc pl-5 text-sm sm:text-base font-[Satoshi] text-[#505977]">
                  {productData.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            {productData.dimensions && (
              <div className="mb-6">
                <h2 className="text-lg font-medium font-[Clash Display]">Dimensions</h2>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div>
                    <p className="text-sm font-[Clash Display]">Height</p>
                    <p className="text-sm font-[Clash Display]">{productData.dimensions.height}</p>
                  </div>
                  <div>
                    <p className="text-sm font-[Clash Display]">Width</p>
                    <p className="text-sm font-[Clash Display]">{productData.dimensions.width}</p>
                  </div>
                  <div>
                    <p className="text-sm font-[Clash Display]">Depth</p>
                    <p className="text-sm font-[Clash Display]">{productData.dimensions.depth}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="container mx-auto px-4 py-8">
        <ReviewSection productId={productData._id} />
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ProductDetail;