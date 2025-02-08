import React from "react";
import {
  LogoFacebook,
  LogoInstagram,
  LogoLinkedin,
  LogoPinterest,
  LogoSkype,
  LogoTwitter,
} from "@carbon/icons-react";
import Link from "next/link";

const socialLinks = [
  { href: "#", icon: LogoLinkedin, label: "LinkedIn" },
  { href: "#", icon: LogoFacebook, label: "Facebook" },
  { href: "#", icon: LogoInstagram, label: "Instagram" },
  { href: "#", icon: LogoSkype, label: "Skype" },
  { href: "#", icon: LogoTwitter, label: "Twitter" },
  { href: "#", icon: LogoPinterest, label: "Pinterest" },
];

const Footer = () => {
  return (
    <footer className="bg-[#2A254B] text-[#FFFFFF] py-8 mt-14">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Menu */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Menu</h3>
            <ul className="space-y-2">
              {["New arrivals", "Best sellers", "Recently viewed", "Popular this week", "All products"].map(
                (item, idx) => (
                  <li key={idx}>{item}</li>
                )
              )}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              {["Crockery", "Furniture", "Homeware", "Plant pots", "Chairs"].map((category, idx) => (
                <li key={idx}>{category}</li>
              ))}
            </ul>
          </div>

          {/* Our Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">About us</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/contact">Contact us</Link>
              </li>
              <li>
                <Link href="/privacypolicy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/returnpolicy">Return Policy</Link>
              </li>
            </ul>
          </div>

          {/* Mailing List */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#FFFFFF]">Join our mailing list</h3>
            <form className="flex flex-col space-y-3 md:space-y-0 md:flex-row items-center">
              <label htmlFor="email-input" className="sr-only">Email address</label>
              <input
                id="email-input"
                type="email"
                placeholder="your@email.com"
                className="flex-1 py-3 px-4 bg-[#4E4D93] text-[#FFFFFF] focus:outline-none"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="bg-[#FFFFFF] h-12 w-32 text-[#2A254B] hover:bg-[#2A254B] hover:text-[#FFFFFF] focus:outline-none"
                aria-label="Sign up for the mailing list"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#4E4D93] mt-8 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <p className="text-sm text-[#FFFFFF]">Copyright © 2022 Avion LTD</p>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-4 md:mt-0">
              {socialLinks.map(({ href, icon: Icon, label }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className="text-[#FFFFFF] border-transparent hover:text-white"
                  aria-label={label}
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
