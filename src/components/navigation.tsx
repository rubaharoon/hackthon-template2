"use client";
import Link from "next/link";

interface NavigationProps {
  translations: Record<string, string>;
}

const Navigation = ({ translations }: NavigationProps) => {
  return (
    <nav className="hidden lg:flex justify-center items-center text-[#726E8D] h-[64px]">
      {/* Home */}
      <Link
        href="/"
        className="mx-4 hover:text-[#5a526c] border-b-2 border-transparent hover:border-b-[#5a526c] pb-1"
      >
        {translations["home"] || "Home"}
      </Link>

      {/* About */}
      <Link
        href="/about"
        className="mx-4 hover:text-[#5a526c] border-b-2 border-transparent hover:border-b-[#5a526c] pb-1"
      >
        {translations["about"] || "About"}
      </Link>

      {/* Contact */}
      <Link
        href="/contact"
        className="mx-4 hover:text-[#5a526c] border-b-2 border-transparent hover:border-b-[#5a526c] pb-1"
      >
        {translations["contact"] || "Contact"}
      </Link>

      {/* Products */}
      <Link
        href="/productlisting"
        className="mx-4 hover:text-[#5a526c] border-b-2 border-transparent hover:border-b-[#5a526c] pb-1"
      >
        {translations["products"] || "Products"}
      </Link>
    </nav>
  );
};

export default Navigation;
