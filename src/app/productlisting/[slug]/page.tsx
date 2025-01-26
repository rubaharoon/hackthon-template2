"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@sanity/client";
import { useDispatch } from "react-redux";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/app/cart/features/wishlistSlice";
import { addToCart } from "@/app/cart/features/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FeaturesSection from "@/components/feature";
import NewsletterSignup from "@/components/newslettersignup";
import PopularProduct from "@/components/popularproduct";
import { FavoriteFilled } from "@carbon/icons-react";
import { Star } from "@carbon/icons-react";

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

interface ProductDetailType {
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
  reviews?: ReviewType[];
}

interface ReviewType {
  date: string | number | Date;
  name: string;
  comment: string;
  rating: number;
}

const ProductDetail = () => {
  const [review, setReview] = useState<ReviewType>({
    name: "",
    comment: "",
    rating: 0,
    date: new Date(),
  });
  const { slug } = useParams();
  const [productData, setProduct] = useState<ProductDetailType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const dispatch = useDispatch();

  const handleWishlist = () => {
    if (productData) {
      if (isWishlisted) {
        dispatch(removeFromWishlist(productData._id));
        const updatedWishlist = JSON.parse(
          localStorage.getItem("wishlist") || "[]"
        ).filter((item: { _id: string }) => item._id !== productData._id);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      } else {
        dispatch(
          addToWishlist({
            _id: productData._id,
            name: productData.name,
            price: productData.price,
            image: urlFor(productData.image).url(),
            description: "",
          })
        );
        const updatedWishlist = [
          ...JSON.parse(localStorage.getItem("wishlist") || "[]"),
          {
            _id: productData._id,
            name: productData.name,
            price: productData.price,
            image: urlFor(productData.image).url(),
            description: "",
          },
        ];
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      }
      setIsWishlisted((prev) => !prev);
      toast.success(
        isWishlisted
          ? `${productData.name} removed from wishlist!`
          : `${productData.name} added to wishlist!`,
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  };

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
          inStock,
          stock,
          dimensions {
            height,
            width,
            depth
          },
          price_id,
          reviews[] {
            date,
            name,
            comment,
            rating
          }
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
          console.error("Error fetching product:", err);
          setError(
            err instanceof Error ? err.message : "Failed to load product"
          );
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
      const cartItem = {
        _id: productData._id,
        name: productData.name,
        price: productData.price,
        quantity: quantity,
        image: urlFor(productData.image).url(),
        description: productData.description,
        price_id: productData.price_id,
        dimensions: productData.dimensions || {
          height: "",
          width: "",
          depth: "",
          length: "",
        },
      };

      dispatch(addToCart(cartItem));

      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCart = [...existingCart, cartItem];
      localStorage.setItem("cart", JSON.stringify(updatedCart));

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
    return (
      <div className="text-center py-8 text-red-500">Product not found.</div>
    );
  }

  const handleReviewChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitReview = async () => {
    if (
      !productData ||
      !review.name ||
      !review.comment ||
      review.rating === 0
    ) {
      toast.error("Please fill out all fields and provide a rating.");
      return;
    }

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productData._id,
          review,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review.");
      }

      toast.success("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review.");
    }
  };

  const handleRatingChange = (star: number) => {
    setReview((prev) => ({ ...prev, rating: star }));
  };

  return (
    <div className="bg-white">
      {/* Product Details Section */}
      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        {/* Product Image */}
        <div className="w-full lg:w-1/2 h-[400px] lg:h-[700px] flex items-center justify-center bg-gray-100">
          <Image
            className="object-cover w-full h-full lg:w-[800px] lg:h-[600px] transition-transform duration-300 ease-in-out hover:scale-105 hover:translate-y-1"
            src={urlFor(productData.image).url()}
            width={1000}
            height={1000}
            alt={productData.name}
            priority
          />
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 bg-white p-4 sm:p-6 lg:p-10 text-[#2A254B] lg:h-[700px] overflow-y-auto">
          <h1 className="text-2xl sm:text-3xl font-semibold font-[Clash Display]">
            {productData.name}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4">
            <p className="text-lg sm:text-xl font-normal font-[Satoshi] text-[#12131A]">
              £{totalPrice.toFixed(2)}
            </p>
            <p className="text-sm font-[Satoshi] text-[#505977]">
              {productData.inStock
                ? `In Stock (${productData.stock} available)`
                : "Out of Stock"}
            </p>
          </div>
          <div className="space-y-4 mt-6">
            <h2 className="text-lg font-medium font-[Clash Display]">
              Description
            </h2>
            <p className="text-sm sm:text-base font-[Satoshi] text-[#505977]">
              {productData.description || "Product description goes here."}
            </p>
          </div>
          {productData.features && (
            <div className="space-y-4 mt-6">
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
            <div className="mt-6">
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
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium">Quantity:</span>
              <div className="flex items-center border rounded-md px-3 py-1 bg-[#F9F9F9]">
                <button
                  onClick={decreaseQuantity}
                  className="text-[#CAC6DA] hover:text-[#2A254B]"
                  disabled={quantity === 1 || !productData.inStock}
                >
                  -
                </button>
                <span className="mx-4 text-[#2A254B]">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="text-[#CAC6DA] hover:text-[#2A254B]"
                  disabled={
                    !productData.inStock || quantity >= productData.stock
                  }
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleWishlist}
                className={`p-3 rounded-md ${
                  isWishlisted
                    ? "text-red-500 bg-red-50"
                    : "text-[#2A254B] bg-gray-100"
                } hover:bg-gray-200 transition-colors duration-200`}
              >
                <FavoriteFilled size={20} />
              </button>
              <button
                onClick={handleAddToCart}
                disabled={!productData.inStock || quantity > productData.stock}
                className={`bg-[#2A254B] text-white px-6 py-3 rounded-md ${
                  !productData.inStock || quantity > productData.stock
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#3a345b] transition-colors duration-200"
                }`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-12 px-4 sm:px-6 lg:px-10">
        <h3 className="text-2xl font-bold text-[#2A254B] mb-4">
          Leave a Review
        </h3>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={review.name}
            onChange={handleReviewChange}
            className="p-2 border border-[#E8E8E8] rounded-lg"
          />
          <textarea
            name="comment"
            placeholder="Your Review"
            value={review.comment}
            onChange={handleReviewChange}
            className="p-2 border border-[#E8E8E8] rounded-lg"
            rows={4}
          />
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingChange(star)}
                className={`text-2xl ${
                  star <= review.rating ? "text-[#F3CD03]" : "text-[#BDBDBD]"
                }`}
              >
                ★
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmitReview}
            className="px-6 py-2 bg-[#2A254B] text-white rounded-lg hover:bg-green-600 transition-all"
          >
            Submit Review
          </button>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-12 px-4 sm:px-6 lg:px-10">
        <h3 className="text-2xl font-bold text-[#2A254B] mb-4">
          Customer Reviews
        </h3>
        {productData.reviews && productData.reviews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productData.reviews.map((review, index) => (
              <div key={index} className="mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#252B42]">{review.name}</span>
                  <div className="flex text-[#F3CD03]">
                    {[...Array(5)].map((_, i) =>
                      i < review.rating ? (
                        <Star key={i} size={16} />
                      ) : (
                        <Star key={i} size={16} />
                      )
                    )}
                  </div>
                  <span className="text-[#737373] text-sm">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-[#858585] mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#737373]">No reviews yet. Be the first to review!</p>
        )}
      </div>

      {/* Additional Sections */}
      <FeaturesSection />
      <NewsletterSignup />
      <PopularProduct />

      {/* Toast Container */}
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