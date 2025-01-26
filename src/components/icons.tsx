"use client";
import { ShoppingCart, Favorite, Globe } from "@carbon/icons-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/app/cart/store";
import { toast } from "react-toastify";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";


interface IconsBarProps {
  language: string;
  onLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Icons = ({ language, onLanguageChange }: IconsBarProps) => {
  // Fetch cart items and calculate total quantity
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Fetch wishlist items and calculate total count
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const totalWishlistQuantity = wishlistItems.length;

  const handleCartClick = () => {
    toast.info(`You have ${totalCartQuantity} items in your cart.`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="flex items-center gap-4 lg:gap-6">
      {/* Wishlist Icon with Count */}
      <Link href="/wishlist">
        <button className="text-gray-500 focus:outline-none relative" aria-label="Wishlist">
          <Favorite size={24} />
          {totalWishlistQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
              {totalWishlistQuantity}
            </span>
          )}
        </button>
      </Link>

      {/* Cart Icon with Count */}
      <Link href="/shoppingcart">
        <button
          className="text-gray-500 focus:outline-none relative"
          aria-label="Cart"
          onClick={handleCartClick}
        >
          <ShoppingCart size={24} />
          {totalCartQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
              {totalCartQuantity}
            </span>
          )}
        </button>
      </Link>

     {/* Authentication Section */}
     <SignedOut>
              <SignInButton mode="modal">
                <motion.button    className="text-sm font-medium flex items-center gap-2 bg-[#2A254B] text-white px-3 py-2 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login/Register
                </motion.button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton showName />
            </SignedIn>

      {/* Language Switcher */}
      <div className="hidden lg:flex items-center gap-2">
  <Globe size={20} className="text-gray-500" />
  <select
    value={language}
    onChange={onLanguageChange}
    className="text-gray-500 bg-transparent border-none focus:outline-none"
    aria-label="Language Switcher"
  >
    <option value="en">English</option>
    <option value="ur">Urdu</option>
    <option value="fr">Français</option>
  </select>
</div>
    </div>
  );
};

export default Icons;