"use client";
import Link from "next/link";
import { Close as XIcon, Globe } from "@carbon/icons-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

interface MobileMenuProps {
  translations: Record<string, string>;
  onClose: () => void;
  language: string;
  onLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const MobileMenu = ({ translations, onClose, language, onLanguageChange }: MobileMenuProps) => {
  const handleCloseMenu = () => {
    onClose();
  };

  return (
    <nav
      className="lg:hidden absolute top-[64px] left-0 w-full bg-[#FFFFFF] shadow-md text-[#726E8D] flex flex-col items-start p-4 transition-all duration-300 z-50"
    >
      {/* Close button */}
      <button
        aria-label="Close menu"
        className="absolute top-4 right-4 text-gray-600"
        onClick={handleCloseMenu}
      >
        <XIcon className="h-6 w-6" />
      </button>

      {/* Menu Links */}
      <Link
        href="/"
        className="py-2 hover:text-[#5a526c] w-full border-b border-gray-200"
        onClick={handleCloseMenu}
      >
        {translations["home"] || "Home"}
      </Link>
      <Link
        href="/about"
        className="py-2 hover:text-[#5a526c] w-full border-b border-gray-200"
        onClick={handleCloseMenu}
      >
        {translations["about"] || "About"}
      </Link>
      <Link
        href="/contact"
        className="py-2 hover:text-[#5a526c] w-full border-b border-gray-200"
        onClick={handleCloseMenu}
      >
        {translations["contact"] || "Contact"}
      </Link>
      <Link
        href="/productlisting"
        className="py-2 hover:text-[#5a526c] w-full border-b border-gray-200"
        onClick={handleCloseMenu}
      >
        {translations["products"] || "Products"}
      </Link>

      {/* Language Selector */}
      <div className="flex items-center gap-3 mt-4">
        <Globe size={20} className="text-gray-500" />
        <select
          value={language}
          onChange={onLanguageChange}
          className="bg-transparent text-gray-500 border-none focus:outline-none"
          aria-label="Select Language"
        >
          <option value="en">English</option>
          <option value="ur">Urdu</option>
          <option value="fr">Français</option>
        </select>
      </div>

      {/* Authentication */}
      <div className="mt-4 w-full">
        <SignedOut>
          <SignInButton mode="modal">
            <motion.button
              className="text-sm font-medium flex items-center gap-2 bg-[#2A254B] text-white px-3 py-2 rounded-lg w-28"
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
      </div>
    </nav>
  );
};

export default MobileMenu;
