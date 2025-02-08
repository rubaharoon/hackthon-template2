"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/cart/store"; // Updated import
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/app/cart/features/cartSlice";
import { fetchCoupons, applyCoupon } from "@/app/cart/features/couponSlice";
import Link from "next/link";

const ShoppingCart = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Get cart items from Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { appliedCoupon, discountAmount, loading, error } =
    useSelector((state: RootState) => state.coupon);

  const [couponCode, setCouponCode] = useState("");

  // Fetch coupons when component mounts
  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate total after discount
  const totalAfterDiscount = subtotal - discountAmount;

  // Handle applying coupon
  const handleApplyCoupon = () => {
    dispatch(applyCoupon(couponCode));
  };

  return (
    <div className="bg-[#EBE8F4] w-full px-4 sm:px-10 lg:px-40 pt-10 pb-16 h-auto text-[#2A254B]">
      <h1 className="text-2xl sm:text-3xl text-center lg:text-left">
        Your Shopping Cart
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-10">
        {/* Product Section */}
        <div className="border-2 p-4">
          <h1 className="text-lg font-semibold text-[#2A254B]">Product</h1>
          {cartItems.length === 0 ? (
            <p className="mt-8 text-center text-[#2A254B]">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="flex items-start justify-between mt-8">
                <div className="flex">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={109}
                    height={134}
                    className="w-20 h-20 sm:w-28 sm:h-28 transition-transform duration-300 ease-in-out hover:scale-105 hover:translate-y-1"
                  />
                  <div className="ml-6">
                    <h1 className="text-[#2A254B] sm:text-lg font-medium">{item.name}</h1>
                    <p className="text-red-600 text-sm">
                      Price: <span className="font-semibold">£{item.price.toFixed(2)}</span>
                    </p>
                    {item.price !== item.originalPrice && (
                      <p className="text-gray-500 text-sm line-through">
                        Original: £{item.originalPrice.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
                {/* Quantity Section */}
                <div className="flex flex-col items-center">
                  <h1 className="text-sm text-[#2A254B] font-semibold sm:hidden lg:block">
                    Quantity
                  </h1>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => item._id && dispatch(decreaseQuantity(item._id))}
                      className="text-[#CAC6DA] hover:text-[#2A254B]"
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <p className="text-lg text-[#2A254B] font-medium">{item.quantity}</p>
                    <button
                      onClick={() => dispatch(increaseQuantity(item._id))}
                      className="text-[#CAC6DA] hover:text-[#2A254B]"
                    >
                      +
                    </button>
                  </div>
                  {/* Remove Item Button */}
                  <button
                    onClick={() => item._id && dispatch(removeFromCart(item._id))}
                    className="text-sm text-red-500 hover:text-red-700 mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Total & Coupon Section */}
        <div className="border-2 p-4">
          <h1 className="text-lg text-[#2A254B] font-semibold">Total</h1>
          <p className="mt-4 text-lg text-[#2A254B] font-medium">Subtotal: £{subtotal.toFixed(2)}</p>

          {/* Coupon Input */}
          <div className="mt-4">
            <input
              type="text"
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              className="bg-[#2A254B] text-white px-4 py-2 rounded-md mt-2 w-full"
              onClick={handleApplyCoupon}
              disabled={loading}
            >
              {loading ? "Applying..." : "Apply Coupon"}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {error && (
              <div className="mt-4 text-center">
                <Link href="/checkout">
                  <button className="bg-[#2A254B] text-white px-4 py-2 rounded-md w-full">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            )}
            {appliedCoupon && (
              <p className="text-green-500 mt-2">
                Coupon &quot;{appliedCoupon.code}&quot; applied! Discount: £{discountAmount}
              </p>
            )}
          </div>

          <h1 className="mt-4 text-lg font-medium text-[#4E4D93]">
            Total After Discount: £{totalAfterDiscount.toFixed(2)}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
