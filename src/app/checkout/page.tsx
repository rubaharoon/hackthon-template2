"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

// Define the CartItem type
type CartItem = {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  price_id: string;
};

// Define the checkout schema
const checkoutSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Shipping address is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Checkout() {
  const cartItems = useSelector((state: { cart: { items: CartItem[] } }) => state.cart.items);
  const totalPrice = useSelector((state: { cart: { items: { price: number; quantity: number }[] } }) =>
    state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
  );

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const handleCheckout: SubmitHandler<CheckoutFormData> = async (data) => {
    const stripe = await stripePromise;
  
    if (!stripe) {
      console.error("Stripe.js has not loaded properly.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      for (const item of cartItems) {
        const stockUpdateResponse = await fetch("/api/updateStock", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: item._id, quantity: item.quantity }),
        });
  
        if (!stockUpdateResponse.ok) {
          const { message } = await stockUpdateResponse.json();
          alert(`Failed to update stock for ${item.name}: ${message || "Unknown error"}`);
          setIsLoading(false);
          return;
        }
      }
  
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: cartItems.map((item) => ({
            price_id: item.price_id,
            quantity: item.quantity,
          })),
          customerEmail: data.email,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }
  
      const { sessionId } = await response.json();
  
      if (sessionId) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error("Error redirecting to checkout:", error);
          setIsLoading(false);
        }
      } else {
        console.error("No session ID returned.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#F9FAFB] to-[#EFF6FF] min-h-screen">
      <div className="wrapper">
        <div className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-[#1F2937] mb-8 text-center">
              Checkout
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Summary */}
              <div className="bg-white shadow-xl rounded-lg p-8">
                <h2 className="text-2xl font-bold text-[#1F2937] mb-6">
                  Order Summary
                </h2>
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between border-b border-gray-200 py-4"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                        />
                      </div>
                      <span className="text-lg font-medium text-[#1F2937]">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-lg font-medium text-[#1F2937]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between mt-8">
                  <span className="text-xl font-bold text-[#1F2937]">
                    Total
                  </span>
                  <span className="text-xl font-bold text-[#1F2937]">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Form */}
              <div className="bg-white shadow-xl rounded-lg p-8">
                <h2 className="text-2xl font-bold text-[#1F2937] mb-6">
                  Shipping Details
                </h2>
                <form onSubmit={handleSubmit(handleCheckout)}>
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-lg font-medium text-[#1F2937] mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register("name")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2A254B] focus:border-transparent text-lg"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600 mt-2">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-lg font-medium text-[#1F2937] mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register("email")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2A254B] focus:border-transparent text-lg"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 mt-2">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="address"
                        className="block text-lg font-medium text-[#1F2937] mb-2"
                      >
                        Shipping Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        {...register("address")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2A254B] focus:border-transparent text-lg"
                      />
                      {errors.address && (
                        <p className="text-sm text-red-600 mt-2">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-lg font-medium text-[#1F2937] mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        {...register("phone")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2A254B] focus:border-transparent text-lg"
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-600 mt-2">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-8 bg-[#2A254B] hover:bg-[#1D4ED8] text-white font-bold py-4 px-8 rounded-lg transition-all ease-in-out transform hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Processing..." : "Place Order"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}