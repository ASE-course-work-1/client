import HeroSection from "../assets/component/HeroSection/HeroSection";
import ProductSection from "../assets/component/Product/ProductSection";
import OutletSection from "../assets/component/OutletSection/OutletSection";
import ContactSection from "../assets/component/Footer/ContactSection";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[1200px] p-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg z-50 rounded-full">
        <div className="flex justify-center space-x-8">
          <a
            href="#hero"
            className="px-6 py-2 bg-gray-700 rounded-full transition duration-300 hover:bg-indigo-400 hover:scale-105 focus:outline-none"
          >
            Home
          </a>

          <a
            href="#products"
            className="px-6 py-2 bg-gray-700 rounded-full transition duration-300 hover:bg-indigo-400 hover:scale-105 focus:outline-none"
          >
            Price
          </a>
          <a
            href="#outlets"
            className="px-6 py-2 bg-gray-700 rounded-full transition duration-300 hover:bg-indigo-400 hover:scale-105 focus:outline-none"
          >
            Outlet
          </a>
          <a
            href="#contact"
            className="px-6 py-2 bg-gray-700 rounded-full transition duration-300 hover:bg-indigo-400 hover:scale-105 focus:outline-none"
          >
            Contact
          </a>
          <Link
            to="/Login"
            className="px-6 py-2 bg-gray-700 rounded-full transition duration-300 hover:bg-indigo-400 hover:scale-105 focus:outline-none"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Sections */}
      <div id="hero">
        <HeroSection />
      </div>
      <div id="products">
        <ProductSection />
      </div>
      <div id="outlets">
        <OutletSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </div>
  );
}
