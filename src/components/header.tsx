"use client";
import React, { useState, useEffect } from "react";
import { Menu } from "@carbon/icons-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "@/components/searchbar";
import Icons from "@/components/icons";
import Navigation from "@/components/navigation";
import MobileMenu from "@/components/mobilemenu";
import { createClient, groq } from "next-sanity";
import Link from "next/link";

// Setup Sanity client for search
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: "2025-01-20",
});

type Product = {
  _id: string;
  name: string;
  slug: { current: string };
  imageUrl: string;
};

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [searchResults, setSearchResults] = useState<Product[]>([]);

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

  // When the search query changes, fetch matching products from Sanity.
  const handleSearchQuery = async (query: string) => {
    // Optionally, call the passed onSearch callback (if needed elsewhere)
    if (onSearch) {
      onSearch(query);
    }
    // If query is empty or too short, clear search results.
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    try {
      const result: Product[] = await client.fetch(
        groq`*[_type == "product" && name match $search]{_id, name, slug, "imageUrl": image.asset->url}[0...5]`,
        { search: `*${query}*` }
      );
      setSearchResults(result);
    } catch (error) {
      console.error("Error searching products:", error);
      setSearchResults([]);
    }
  };

  return (
    <header className="max-w-[1440px] mx-auto bg-[#FFFFFF] px-6">
      {/* Top Bar */}
      <div className="border-b-[0.5px] border-[#0000004f] flex items-center justify-between lg:justify-between h-[64px] relative">
        {/* Search Bar with Dropdown */}
        <div className="relative">
          <SearchBar
            onSearch={handleSearchQuery}
            searchPlaceholder={
              translations["searchPlaceholder"] || "Search by name or tag..."
            }
          />
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-50">
              {searchResults.map((result) => (
                <Link
                  key={result._id}
                  href={`/productlisting/${result.slug.current}`}
                >
                  <div className="p-2 hover:bg-gray-100 cursor-pointer">
                    {result.name}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Logo */}
        <h1 className="text-2xl font-semibold text-[#22202E] mx-auto lg:mx-0 flex-1 text-center">
          {translations["brandName"] || "Avion"}
        </h1>

        {/* Icons (Mobile) */}
        <div className="lg:hidden flex items-center gap-4">
          <Icons language={language} onLanguageChange={handleLanguageChange} />
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="lg:hidden text-gray-500 focus:outline-none"
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {!menuOpen ? <Menu size={24} /> : null}
        </button>

        {/* Icons (Desktop) */}
        <div className="hidden lg:flex items-center gap-6 absolute right-6">
          <Icons language={language} onLanguageChange={handleLanguageChange} />
        </div>
      </div>

      {/* Desktop Navigation */}
      <Navigation translations={translations} />

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <MobileMenu
          translations={translations}
          onClose={() => setMenuOpen(false)}
          language={language}
          onLanguageChange={handleLanguageChange}
        />
      )}

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
