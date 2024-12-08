"use client";
import React, { useState } from "react";
import { Search, Menu, Close, ShoppingCart, UserAvatar } from "@carbon/icons-react";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="max-w-[1440px] mx-auto bg-[#FFFFFF] px-6">
      {/* Top Bar */}
      <div className="border-b-[0.5px] border-[#0000004f] flex items-center justify-between lg:justify-between h-[64px] relative">
        {/* Search Icon (Left for Mobile and Desktop) */}
        <button className="text-gray-500 focus:outline-none lg:absolute lg:left-6" aria-label="Search">
          <Search size={24} />
        </button>

        {/* Logo (Centered for Desktop, Left for Mobile) */}
        <h1 className="text-2xl font-semibold text-[#22202E] mx-auto lg:mx-0 flex-1 text-center">
          Avion
        </h1>

        {/* Hamburger Menu for Mobile */}
        <button
          className="lg:hidden text-gray-500 focus:outline-none"
          aria-label="Menu"
          onClick={toggleMenu}
        >
          {!menuOpen ? <Menu size={24} /> : <Close size={24} />}
        </button>

        {/* Cart and Profile Icons (Right for Desktop) */}
        <div className="hidden lg:flex items-center gap-6 absolute right-6">
          <Link href="/shoppingcart">
            <button className="text-gray-500 focus:outline-none" aria-label="Cart">
              <ShoppingCart size={24} />
            </button>
          </Link>
          <button className="text-gray-500 focus:outline-none" aria-label="Profile">
            <UserAvatar size={24} />
          </button>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex justify-center items-center text-[#726E8D] h-[64px]">
        <Link
          href="/"
          className="mx-4 hover:text-[#5a526c] border-b-2 border-transparent hover:border-b-[#5a526c] pb-1"
        >
          Ceramics
        </Link>
        <Link
          href="/"
          className="mx-4 hover:text-[#5a526c] border-b-2 border-transparent hover:border-b-[#5a526c] pb-1"
        >
          Tables
        </Link>
        <Link
          href="/"
          className="mx-4 hover:text-[#5a526c] border-b-2 border-transparent hover:border-b-[#5a526c] pb-1"
        >
          Chairs
        </Link>
        <Link
          href="/"
          className="mx-4 hover:text-[#5a526c] border-b-2 border-transparent hover:border-b-[#5a526c] pb-1"
        >
          Crockery
        </Link>
        <Link
          href="/"
          className="mx-4 hover:text-[#5a526c] border-b-2 border-transparent hover:border-b-[#5a526c] pb-1"
        >
          Tableware
        </Link>
        <Link
          href="/"
          className="mx-4 hover:text-[#5a526c] border-b-2 border-transparent hover:border-b-[#5a526c] pb-1"
        >
          Cutlery
        </Link>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <nav className="lg:hidden absolute top-[64px] left-0 w-full bg-[#FFFFFF] shadow-md text-[#726E8D] flex flex-col items-start p-4">
          {/* Links */}
          <Link
            href="/"
            className="py-2 hover:text-[#5a526c] w-full border-b border-gray-200"
            onClick={() => setMenuOpen(false)}
          >
            Ceramics
          </Link>
          <Link
            href="/"
            className="py-2 hover:text-[#5a526c] w-full border-b border-gray-200"
            onClick={() => setMenuOpen(false)}
          >
            Tables
          </Link>
          <Link
            href="/"
            className="py-2 hover:text-[#5a526c] w-full border-b border-gray-200"
            onClick={() => setMenuOpen(false)}
          >
            Chairs
          </Link>
          <Link
            href="/"
            className="py-2 hover:text-[#5a526c] w-full border-b border-gray-200"
            onClick={() => setMenuOpen(false)}
          >
            Crockery
          </Link>
          <Link
            href="/"
            className="py-2 hover:text-[#5a526c] w-full border-b border-gray-200"
            onClick={() => setMenuOpen(false)}
          >
            Tableware
          </Link>
          <Link
            href="/"
            className="py-2 hover:text-[#5a526c] w-full border-b border-gray-200"
            onClick={() => setMenuOpen(false)}
          >
            Cutlery
          </Link>

          {/* Cart and Profile Icons */}
          <div className="flex items-center gap-6 mt-4">
            <Link href="/shoppingcart">
              <button className="text-gray-500 focus:outline-none" aria-label="Cart">
                <ShoppingCart size={24} />
              </button>
            </Link>
            <button className="text-gray-500 focus:outline-none" aria-label="Profile">
              <UserAvatar size={24} />
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
