"use client";
import Link from "next/link";

interface MobileMenuProps {
  translations: Record<string, string>;
  onClose: () => void;
}

const MobileMenu = ({ translations, onClose }: MobileMenuProps) => {
  return (
    <nav className="lg:hidden absolute top-[64px] left-0 w-full bg-[#FFFFFF] shadow-md text-[#726E8D] flex flex-col items-start p-4">
      <Link
        href="/"
        className="py-2 hover:text-[#5a526c] w-full border-b border-gray-200"
        onClick={onClose}
      >
        {translations["home"] || "Home"}
      </Link>
      <Link
        href="/about"
        className="py-2 hover:text-[#5a526c] w-full border-b border-gray-200"
        onClick={onClose}
      >
        {translations["about"] || "About"}
      </Link>
      <Link
        href="/contact"
        className="py-2 hover:text-[#5a526c] w-full border-b border-gray-200"
        onClick={onClose}
      >
        {translations["contact"] || "Contact"}
      </Link>
      <Link
        href="/ceramic"
        className="py-2 hover:text-[#5a526c] w-full border-b border-gray-200"
        onClick={onClose}
      >
        {translations["ceramics"] || "Ceramics"}
      </Link>
      <Link
        href="/plant-pots"
        className="py-2 hover:text-[#5a526c] w-full border-b border-gray-200"
        onClick={onClose}
      >
        {translations["plantPots"] || "Plant Pots"}
      </Link>
      <Link
        href="/crockery"
        className="py-2 hover:text-[#5a526c] w-full border-b border-gray-200"
        onClick={onClose}
      >
        {translations["crockery"] || "Crockery"}
      </Link>
      <Link
        href="/tableware"
        className="py-2 hover:text-[#5a526c] w-full border-b border-gray-200"
        onClick={onClose}
      >
        {translations["tableware"] || "Tableware"}
      </Link>
      <Link
        href="/cutlery"
        className="py-2 hover:text-[#5a526c] w-full border-b border-gray-200"
        onClick={onClose}
      >
        {translations["cutlery"] || "Cutlery"}
      </Link>
    </nav>
  );
};

export default MobileMenu;