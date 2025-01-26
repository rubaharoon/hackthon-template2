"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@sanity/client";
import { useDispatch } from "react-redux";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { addToCart } from "@/app/cart/features/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FavoriteFilled } from "@carbon/icons-react";
import NewsletterSignup from "@/components/newslettersignup";

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
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface Dimensions {
  height?: string;
  width?: string;
  depth?: string;
  length?: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: SanityImageSource;
  features?: string[];
  dimensions?: Dimensions;
  quantity?: number;
  price_id: string;
  inStock: boolean;
  stock: number;
}

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  price_id: string;
  dimensions: Dimensions;
}

const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
  isDisabled,
}: {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  isDisabled: boolean;
}) => (
  <div className="flex items-center border rounded-md px-3 py-1 bg-[#F9F9F9]">
    <button
      onClick={onDecrease}
      className="text-[#CAC6DA] hover:text-[#2A254B]"
      disabled={isDisabled || quantity === 1}
      aria-label="Decrease quantity"
    >
      -
    </button>
    <span className="mx-4 text-[#2A254B]">{quantity}</span>
    <button
      onClick={onIncrease}
      className="text-[#CAC6DA] hover:text-[#2A254B]"
      disabled={isDisabled}
      aria-label="Increase quantity"
    >
      +
    </button>
  </div>
);

const PopularProductDetail = () => {
  const { slug } = useParams();
  const [productData, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const dispatch = useDispatch();

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(savedWishlist);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        const query = `*[_type == "product" && slug.current == $slug && "popular products" in tags][0] {
          _id,
          name,
          price,
          description,
          image,
          features,
          inStock,
          stock,
          dimensions {
            height,
            width,
            depth
          },
          price_id
        }`;
        const product = await client.fetch(query, { slug });

        if (!product) {
          throw new Error("Product not found");
        }

        if (isMounted) {
          setProduct(product);
          setTotalPrice(product.price);
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

  useEffect(() => {
    if (productData) {
      setTotalPrice(productData.price * quantity);
    }
  }, [quantity, productData]);

  const increaseQuantity = () => {
    if (productData && quantity < productData.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (productData && productData.inStock && quantity <= productData.stock) {
      const cartItem: CartItem = {
        _id: productData._id,
        name: productData.name,
        price: productData.price,
        quantity: quantity,
        image: urlFor(productData.image).url(),
        description: productData.description,
        price_id: productData.price_id,
        dimensions: productData.dimensions || { height: '', width: '', depth: '', length: '' },
      };

      dispatch(addToCart(cartItem));

      // Retrieve existing cart from localStorage
      const existingCart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

      // Check if the item already exists in the cart
      const existingItemIndex = existingCart.findIndex(
        (item: CartItem) => item._id === cartItem._id
      );

      if (existingItemIndex >= 0) {
        // Update quantity if the item already exists
        existingCart[existingItemIndex].quantity += cartItem.quantity;
      } else {
        // Add new item to the cart
        existingCart.push(cartItem);
      }

      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(existingCart));

      toast.success(`${productData.name} added to cart!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.error("Not enough stock available.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleAddToWishlist = () => {
    if (productData) {
      // Check if the product is already in the wishlist
      const isProductInWishlist = wishlist.some((item) => item._id === productData._id);

      if (!isProductInWishlist) {
        const updatedWishlist = [...wishlist, productData];
        setWishlist(updatedWishlist);

        // Save updated wishlist to localStorage
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

        toast.success(`${productData.name} added to wishlist!`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.info(`${productData.name} is already in your wishlist!`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

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
        <button
          onClick={() => {
            setError(null);
            setLoading(true);
            setProduct(null);
          }}
          className="bg-[#2A254B] text-white px-6 py-3 rounded-md hover:bg-[#3a345b] transition-colors duration-200 mt-4"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="text-center py-8 text-red-500">Product not found.</div>
    );
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row w-full min-h-screen text-[#ffffff]">
        <div className="w-full lg:w-1/2 h-[600px] lg:h-[700px] flex items-center justify-center bg-gray-100">
          <Image
            className="object-cover w-[800px] h-[600px] transition-transform duration-300 ease-in-out hover:scale-105 hover:translate-y-1"
            src={urlFor(productData.image).url()}
            width={1000}
            height={1000}
            alt={productData.name}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85}
          />
        </div>

        <div className="w-full lg:w-1/2 bg-white p-6 sm:p-10 text-[#2A254B] h-[600px] lg:h-[700px] overflow-y-auto">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl sm:text-3xl font-semibold font-[Clash Display]">
                {productData.name}
              </h1>
              <button
                onClick={handleAddToWishlist}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                aria-label="Add to wishlist"
              >
                <FavoriteFilled size={24} className="text-[#2A254B] hover:text-red-500" />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-lg sm:text-xl font-normal font-[Satoshi] text-[#12131A]">
                £{totalPrice.toFixed(2)}
              </p>
              <p className="text-sm font-[Satoshi] text-[#505977]">
                {productData.inStock
                  ? `In Stock (${productData.stock} available)`
                  : "Out of Stock"}
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-lg font-medium font-[Clash Display]">
                Description
              </h2>
              <p className="text-sm sm:text-base font-[Satoshi] text-[#505977]">
                {productData.description || "Product description goes here."}
              </p>
            </div>
            {productData.features && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium font-[Clash Display]">
                  Features
                </h2>
                <ul className="list-disc pl-5 text-sm sm:text-base font-[Satoshi] text-[#505977]">
                  {productData.features.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            {productData.dimensions && (
              <div className="mb-6">
                <h2 className="text-lg font-medium font-[Clash Display]">
                  Dimensions
                </h2>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div>
                    <p className="text-sm font-[Clash Display]">Height</p>
                    <p className="text-sm font-[Clash Display]">
                      {productData.dimensions.height}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-[Clash Display]">Width</p>
                    <p className="text-sm font-[Clash Display]">
                      {productData.dimensions.width}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-[Clash Display]">Depth</p>
                    <p className="text-sm font-[Clash Display]">
                      {productData.dimensions.depth}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium">Quantity:</span>
              <QuantitySelector
                quantity={quantity}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                isDisabled={!productData.inStock}
              />
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!productData.inStock || quantity > productData.stock}
              className={`bg-[#2A254B] text-white px-6 py-3 rounded-md ${
                !productData.inStock || quantity > productData.stock
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#3a345b] transition-colors duration-200"
              }`}
              aria-label="Add to cart"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <NewsletterSignup />
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

export default PopularProductDetail;