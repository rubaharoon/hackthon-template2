"use client";
import { Search } from "@carbon/icons-react";
import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  searchPlaceholder: string;
}

const SearchBar = ({ onSearch, searchPlaceholder }: SearchBarProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setSearchQuery("");
      onSearch("");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="flex items-center gap-4">
      <button
        className="text-gray-500 focus:outline-none"
        aria-label="Search"
        onClick={toggleSearch}
      >
        <Search size={24} />
      </button>
      {searchOpen && (
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={handleSearch}
          className="w-48 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A254B]"
          autoFocus
        />
      )}
    </div>
  );
};

export default SearchBar;