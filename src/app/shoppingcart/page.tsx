"use client";
import React from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/cart/store"; // Adjust the path as needed
import { decreaseQuantity, increaseQuantity, removeFromCart } from "@/app/cart/features/cartSlice"; // Import actions
import Link from "next/link";

const ShoppingCart = () => {
  const dispatch = useDispatch();

  // Get cart items from Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items);
  console.log(cartItems); // Debug: Check if description is present

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle quantity decrease
  const handleDecreaseQuantity = (itemId: string) => {
    dispatch(decreaseQuantity(itemId)); // Dispatch the decreaseQuantity action
  };

  // Handle quantity increase
  const handleIncreaseQuantity = (itemId: string) => {
    dispatch(increaseQuantity(itemId)); // Dispatch the increaseQuantity action
  };

  // Handle item removal
  const handleRemoveFromCart = (itemId: string) => {
    dispatch(removeFromCart(itemId)); // Dispatch the removeFromCart action
  };

  return (
    <>
      <div className="bg-[#EBE8F4] w-full px-4 sm:px-10 lg:px-40 pt-10 pb-16 h-auto text-[#2A254B]">
        <h1 className="text-2xl sm:text-3xl text-center lg:text-left">
          Your Shopping Cart
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-10">
          {/* Product Section */}
          <div className="border-2 p-4">
            <h1 className="text-lg font-semibold text-[#2A254B]">Product</h1>
            {cartItems.length === 0 ? (
              <p className="mt-8 text-center text-[#2A254B]">
                Your cart is empty.
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-start justify-between mt-8"
                >
                  <div className="flex">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={109}
                      height={134}
                      className="w-20 h-20 sm:w-28 sm:h-28 transition-transform duration-300 ease-in-out hover:scale-105 hover:translate-y-1"
                    />
                    <div className="ml-6">
                      <h1 className="text-[#2A254B] sm:text-lg font-medium">
                        {item.name}
                      </h1>
                      {/* Display the description */}
                      <p className="text-sm text-[#2A254B] mt-2">
                        {item.description || "No description available."}
                      </p>
                      <p className="mt-2 text-[#2A254B] font-semibold">
                        £{item.price}
                      </p>
                    </div>
                  </div>
                  {/* Quantity Section */}
                  <div className="flex flex-col items-center">
                    <h1 className="text-sm text-[#2A254B] font-semibold sm:hidden lg:block">
                      Quantity
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleDecreaseQuantity(item._id)}
                        className="text-[#CAC6DA] hover:text-[#2A254B]"
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <p className="text-lg text-[#2A254B] font-medium">
                        {item.quantity}
                      </p>
                      <button
                        onClick={() => handleIncreaseQuantity(item._id)}
                        className="text-[#CAC6DA] hover:text-[#2A254B]"
                      >
                        +
                      </button>
                    </div>
                    {/* Remove Item Button */}
                    <button
                      onClick={() => handleRemoveFromCart(item._id)}
                      className="text-sm text-red-500 hover:text-red-700 mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Total Section (Hidden on Small Screens) */}
          <div className="border-2 p-4 sm:hidden lg:block">
            <h1 className="text-lg text-[#2A254B] font-semibold ml-96">
              Total
            </h1>
            {cartItems.map((item) => (
              <p
                key={item._id}
                className="mt-10 text-lg text-[#2A254B] font-medium ml-96"
              >
                £{(item.price * item.quantity).toFixed(2)}
              </p>
            ))}
          </div>
        </div>
        {/* Subtotal Section */}
        <div className="mt-10 text-center lg:text-right">
          <h1 className="inline text-lg sm:text-xl font-medium mr-4 text-[#4E4D93]">
            Subtotal
          </h1>
          <h1 className="inline text-xl sm:text-2xl font-semibold text-[#2A254B]">
            £{subtotal.toFixed(2)}
          </h1>
          <p className="text-sm mt-4 text-[#4E4D93]">
            Taxes and shipping are calculated at checkout
          </p>
          <Link href="/checkout">
            <button className="bg-[#2A254B] h-12 sm:h-14 mt-6 w-full sm:w-56 rounded-sm text-white">
              Go to checkout
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;