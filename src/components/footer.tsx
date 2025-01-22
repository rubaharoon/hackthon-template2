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

const Footer = () => {
  return (
    <footer className="bg-[#2A254B] text-[#FFFFFF] py-8 mt-14">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Menu */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Menu</h3>
            <ul className="space-y-2">
              <li>New arrivals</li>
              <li>Best sellers</li>
              <li>Recently viewed</li>
              <li>Popular this week</li>
              <li>All products</li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>Crockery</li>
              <li>Furniture</li>
              <li>Homeware</li>
              <li>Plant pots</li>
              <li>Chairs</li>
            </ul>
          </div>

          {/* Our Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our company</h3>
            <ul className="space-y-2">
              <li><Link href="/about">About us</Link></li>
              <li>Vacancies</li>
              <li>Contact us</li>
              <li>Privacy</li>
              <li>Returns policy</li>
            </ul>
          </div>

          {/* Mailing List */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#FFFFFF]">
              Join our mailing list
            </h3>
            <form className="flex items-center">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 py-3 px-4 bg-[#4E4D93] text-[#FFFFFF] focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#FFFFFF] h-12 w-32  text-[#2A254B] hover:bg-[#2A254B] hover:text-[#FFFFFF] focus:outline-none"
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
              <a
                href="#"
                className="text-[#FFFFFF] border-transparent hover:text-white"
              >
                <LogoLinkedin size={24} />
              </a>
              <a
                href="#"
                className="text-[#FFFFFF] border-transparent hover:text-white"
              >
                <LogoFacebook size={24} />
              </a>
              <a
                href="#"
                className="text-[#FFFFFF] border-transparent hover:text-white"
              >
                <LogoInstagram size={24} />
              </a>
              <a
                href="#"
                className="text-[#FFFFFF] border-transparent hover:text-white"
              >
                <LogoSkype size={24} />
              </a>
              <a
                href="#"
                className="text-[#FFFFFF] border-transparent hover:text-white"
              >
                <LogoTwitter size={24} />
              </a>
              <a
                href="#"
                className="text-[#FFFFFF] border-transparent hover:text-white"
              >
                <LogoPinterest size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
