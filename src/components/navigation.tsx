"use client";
import Link from "next/link";

interface NavigationProps {
  translations: Record<string, string>;
}

const Navigation = ({ translations }: NavigationProps) => {
  return (
    <nav className="hidden lg:flex justify-center items-center text-[#726E8D] h-[64px]">
      <Link
        href="/"
        className="mx-4 hover:text-[#5a526c] border-b-2 border-transparent hover:border-b-[#5a526c] pb-1"
      >
        {translations["home"] || "Home"}
      </Link>
      <Link
        href="/about"
        className="mx-4 hover:text-[#5a526c] border-b-2 border-transparent hover:border-b-[#5a526c] pb-1"
      >
        {translations["about"] || "About"}
      </Link>
      <Link
        href="/contact"
        className="mx-4 hover:text-[#5a526c] border-b-2 border-transparent hover:border-b-[#5a526c] pb-1"
      >
        {translations["contact"] || "Contact"}
      </Link>
      <Link
        href="/ceramic"
        className="mx-4 hover:text-[#5a526c] border-b-2 border-transparent hover:border-b-[#5a526c] pb-1"
      >
        {translations["ceramics"] || "Ceramics"}
      </Link>
      <Link
        href="/plant-pots"
        className="mx-4 hover:text-[#5a526c] border-b-2 border-transparent hover:border-b-[#5a526c] pb-1"
      >
        {translations["plantPots"] || "Plant Pots"}
      </Link>
      <Link
        href="/crockery"
        className="mx-4 hover:text-[#5a526c] border-b-2 border-transparent hover:border-b-[#5a526c] pb-1"
      >
        {translations["crockery"] || "Crockery"}
      </Link>
      <Link
        href="/tableware"
        className="mx-4 hover:text-[#5a526c] border-b-2 border-transparent hover:border-b-[#5a526c] pb-1"
      >
        {translations["tableware"] || "Tableware"}
      </Link>
      <Link
        href="/cutlery"
        className="mx-4 hover:text-[#5a526c] border-b-2 border-transparent hover:border-b-[#5a526c] pb-1"
      >
        {translations["cutlery"] || "Cutlery"}
      </Link>
    </nav>
  );
};

export default Navigation;