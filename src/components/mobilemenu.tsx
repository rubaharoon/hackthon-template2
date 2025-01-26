"use client";
import Link from "next/link";
import { useState } from "react";
import { Close as XIcon, Globe } from "@carbon/icons-react";

interface MobileMenuProps {
  translations: Record<string, string>;
  onClose: () => void;
}

const MobileMenu = ({ onClose }: MobileMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [language, setLanguage] = useState("en");

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    onClose();
  };

  const onLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  return (
    <nav
      className={`lg:hidden absolute top-[64px] left-0 w-full bg-[#FFFFFF] shadow-md text-[#726E8D] flex flex-col items-start p-4 transition-all duration-300 ${
        isMenuOpen ? "transform translate-x-0" : "transform translate-x-full"
      }`}
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
        Home
      </Link>
      <Link
        href="/about"
        className="py-2 hover:text-[#5a526c] w-full border-b border-gray-200"
        onClick={handleCloseMenu}
      >
        About
      </Link>
      <Link
        href="/contact"
        className="py-2 hover:text-[#5a526c] w-full border-b border-gray-200"
        onClick={handleCloseMenu}
      >
        Contact
      </Link>
      <Link
        href="/productlisting"
        className="py-2 hover:text-[#5a526c] w-full border-b border-gray-200"
        onClick={handleCloseMenu}
      >
        Products
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
    </nav>
  );
};

export default MobileMenu;
