import { LogoLinkedin, LogoFacebook, LogoInstagram, LogoTwitter, LogoPinterest, LogoSkype } from "@carbon/icons-react";

const Footer = () => {
  return (
    <footer className="bg-[#2b2442] text-white py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Avion Section */}
        <div>
          <h2 className="font-bold text-lg">Avion</h2>
          <address className="mt-4 not-italic">
            21 New York Street<br />
            New York City<br />
            United States of America<br />
            432 34
          </address>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="font-bold text-lg">Social links</h2>
          <div className="flex space-x-4 mt-4">
            <LogoLinkedin size={32} className="hover:text-gray-400" />
            <LogoFacebook size={32} className="hover:text-gray-400" />
            <LogoInstagram size={32} className="hover:text-gray-400" />
            <LogoTwitter size={32} className="hover:text-gray-400" />
            <LogoSkype size={32} className="hover:text-gray-400" />
            <LogoPinterest size={32} className="hover:text-gray-400" />
          </div>
        </div>

        {/* Menu Section */}
        <div>
          <h2 className="font-bold text-lg">Menu</h2>
          <ul className="mt-4 space-y-2">
            <li>New arrivals</li>
            <li>Best sellers</li>
            <li>Recently viewed</li>
            <li>Popular this week</li>
            <li>All products</li>
          </ul>
        </div>

        {/* Categories Section */}
        <div>
          <h2 className="font-bold text-lg">Categories</h2>
          <ul className="mt-4 space-y-2">
            <li>Crockery</li>
            <li>Furniture</li>
            <li>Homeware</li>
            <li>Plant pots</li>
            <li>Chairs</li>
          </ul>
        </div>

        {/* Our Company Section */}
        <div>
          <h2 className="font-bold text-lg">Our company</h2>
          <ul className="mt-4 space-y-2">
            <li>About us</li>
            <li>Vacancies</li>
            <li>Contact us</li>
            <li>Privacy</li>
            <li>Returns policy</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center border-t border-gray-600 mt-8 pt-4">
        <p>Copyright 2022 Avion LTD</p>
      </div>
    </footer>
  );
};

export default Footer;
