"use client";
import React, { useState, useEffect } from "react";
import { Menu, Close } from "@carbon/icons-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "@/components/searchbar";
import Icons from "@/components/icons";
import Navigation from "@/components/navigation";
import MobileMenu from "@/components/mobilemenu";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await fetch(`/translation/${language}.json`);
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error("Failed to load translations:", error);
      }
    };
    fetchTranslations();
  }, [language]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <header className="max-w-[1440px] mx-auto bg-[#FFFFFF] px-6">
      {/* Top Bar */}
      <div className="border-b-[0.5px] border-[#0000004f] flex items-center justify-between lg:justify-between h-[64px] relative">
        {/* Search Bar */}
        <SearchBar onSearch={onSearch} searchPlaceholder={translations["searchPlaceholder"] || "Search by name or tag..."} />

        {/* Logo */}
        <h1 className="text-2xl font-semibold text-[#22202E] mx-auto lg:mx-0 flex-1 text-center">
          {translations["brandName"] || "Avion"}
        </h1>

        {/* Icons  (Mobile) */}
        <div className="lg:hidden flex items-center gap-4">
          <Icons language={language} onLanguageChange={handleLanguageChange} />
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="lg:hidden text-gray-500 focus:outline-none"
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {!menuOpen ? <Menu size={24} /> : <Close size={24} />}
        </button>

        {/* Icons  (Desktop) */}
        <div className="hidden lg:flex items-center gap-6 absolute right-6">
          <Icons language={language} onLanguageChange={handleLanguageChange} />
        </div>
      </div>

      {/* Desktop Navigation */}
      <Navigation translations={translations} />

      {/* Mobile Dropdown Menu */}
      {menuOpen && <MobileMenu translations={translations} onClose={() => setMenuOpen(false)} />}

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
    </header>
  );
};

export default Header;