"use client";
import { Search } from "@carbon/icons-react";
import React, { useState, useEffect, useRef } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  searchPlaceholder: string;
}

const SearchBar = ({ onSearch, searchPlaceholder }: SearchBarProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle search bar and reset query when closing
  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    if (!searchOpen) {
      setSearchQuery("");
      onSearch("");
    }
  };

  // Focus input field when the search bar opens
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Search Icon Button */}
      <button
        className="text-gray-500 focus:outline-none"
        aria-label="Search"
        aria-expanded={searchOpen}
        aria-controls="search-input"
        onClick={toggleSearch}
      >
        <Search size={24} />
      </button>

      {/* Search Input Field */}
      <div
        className={`transition-all duration-300 ${
          searchOpen ? "max-w-xs opacity-100" : "max-w-0 opacity-0"
        } overflow-hidden`}
      >
        <input
          id="search-input"
          type="text"
          ref={inputRef}
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={handleSearch}
          className="w-48 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A254B]"
          aria-label="Search input"
        />
      </div>
    </div>
  );
};

export default SearchBar;