"use client";
import { DeliveryTruck } from "@carbon/icons-react";
import { useState } from "react";

const Banner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-[#2A254B] text-white px-2 py-2 flex justify-between items-center text-sm sm:text-base">
      {/* Centered Content */}
      <div className="flex items-center justify-center gap-2 mx-auto">
        <DeliveryTruck size={20} aria-label="Delivery icon" />
        <span className="text-center">
          Free delivery on all orders over <strong>£50</strong> with code <strong>easter</strong> at checkout
        </span>
      </div>

      {/* Close Button */}
      <button
        className="absolute right-4 text-white hover:text-gray-400 transition focus:outline-none"
        onClick={() => setVisible(false)}
        aria-label="Close banner"
      >
        ✕
      </button>
    </div>
  );
};

export default Banner;