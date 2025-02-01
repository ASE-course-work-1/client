import HeroSection from "../assets/component/HeroSection/HeroSection";
import ProductSection from "../assets/component/Product/ProductSection";
import OutletSection from "../assets/component/OutletSection/OutletSection";
import ContactSection from "../assets/component/Footer/ContactSection";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-[1200px] p-4 bg-gradient-to-r from-blue-800 via-indigo-700 to-blue-900 text-white shadow-2xl rounded-full">
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
            to="/login"
            className="px-6 py-2 bg-gray-700 rounded-full transition duration-300 hover:bg-indigo-400 hover:scale-105 focus:outline-none"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Sections with top padding to avoid navbar overlap */}
      <div id="hero" className="pt-24">
        <HeroSection />
      </div>
      <div id="products" className="pt-24">
        <ProductSection />
      </div>
      <div id="outlets" className="pt-24">
        <OutletSection />
      </div>
      <div id="contact" className="pt-24">
        <ContactSection />
      </div>
    </div>
  );
}
