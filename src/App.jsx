

import './App.css'

import { Route, Routes } from 'react-router-dom';
import Home from './page/Home';

function App() {


// const HeroSection = () => (
//   <div
//     className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
//     style={{ backgroundImage: `url(${image1})` }}
//   >
//     <div className="text-center  bg-opacity-50 p-6 rounded-lg">
//       <h1 className="text-white text-8xl font-bold">welcome</h1>
//       <button className="mt-4 px-8 py-3 bg-blue-500 text-white rounded-lg transition duration-300 hover:bg-blue-600">
//         Join Us
//       </button>
//     </div>
//   </div>
// );




// const ProductCard = ({ image, price, type, desc }) => (
//   <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg">
//     <div
//       className="h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center"
//       style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}
//     >
//       {!image && <span className="text-gray-500">No Image</span>}
//     </div>
//     <p className="text-lg font-semibold text-gray-800">{price}</p>
//     <p className="text-gray-600">{type}</p>
//     <p className="text-gray-500 text-sm">{desc}</p>
//     <button className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-full transition duration-300 hover:bg-blue-600">
//       Buy Now
//     </button>
//   </div>
// );
// const products = [
//   { image: "", price: "$49", type: "Premium", desc: "Best quality gas for home use." },
//   { image: "", price: "$39", type: "Standard", desc: "Reliable and affordable option." },
//   { image: "", price: "$29", type: "Budget", desc: "Economical gas for everyday use." },
//   { image: "", price: "$59", type: "Ultra Premium", desc: "High-performance fuel solution." },
//   { image: "", price: "$45", type: "Eco-Friendly", desc: "Sustainable and efficient gas." },
//   { image: "", price: "$35", type: "Basic", desc: "Great for small-scale usage." },
// ];

// const ProductSection = () => (
//   <div className="p-20 m-10 bg-gray-100">
//       <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">Our Pricing</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {products.map((product, index) => (
//           <ProductCard key={index} {...product} />
//         ))}
//       </div>
//     </div>
// );

const outlets = [
  { name: "Colombo Central Outlet", district: "Colombo" },
  { name: "Kandy Premium Store", district: "Kandy" },
  { name: "Galle Gas Hub", district: "Galle" },
  { name: "Jaffna Supply Point", district: "Jaffna" },
  { name: "Anuradhapura Main Outlet", district: "Anuradhapura" },
  { name: "Kurunegala Gas Point", district: "Kurunegala" },
  { name: "Gampaha Express Outlet", district: "Gampaha" },
  { name: "Nuwara Eliya Fuel Hub", district: "Nuwara Eliya" },
];

const OutletSection = () => (
  <div className="pl-50 pr-50 pt-12 bg-gray-100 rounded-lg shadow-md">
 <div className="flex justify-center p-10">
    <h2 className="text-3xl text-c font-bold text-gray-800">Our Outlets</h2>
  </div>
        

      <div className="overflow-x-auto pb-12">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="p-3 text-left">Outlet</th>
              <th className="p-3 text-left">District</th>
            </tr>
          </thead>
          <tbody>
            {outlets.map((outlet, index) => (
              <tr key={index} className="border-b hover:bg-gray-200 transition">
                <td className="p-3">{outlet.name}</td>
                <td className="p-3">{outlet.district}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
);

const ContactSection = () => (
  <footer className="bg-gray-900 text-white py-10">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
    {/* Company Info */}
    <div>
      <h2 className="text-lg font-semibold">GasByGas</h2>
      <p className="text-gray-400 mt-2">Your trusted partner in energy solutions.</p>
    </div>

    {/* Navigation Links */}
    <div>
      <h2 className="text-lg font-semibold">Quick Links</h2>
      <ul className="mt-2 space-y-2">
        <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Home</a></li>
        <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">About</a></li>
        <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Services</a></li>
        <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Contact</a></li>
      </ul>
    </div>

    {/* Social Media */}
    <div>
      <h2 className="text-lg font-semibold">Follow Us</h2>
      <div className="flex justify-center md:justify-start space-x-4 mt-2">
        <a href="#" className="text-gray-400 hover:text-blue-400 transition"><i className="fab fa-facebook-f"></i></a>
        <a href="#" className="text-gray-400 hover:text-blue-400 transition"><i className="fab fa-twitter"></i></a>
        <a href="#" className="text-gray-400 hover:text-blue-400 transition"><i className="fab fa-instagram"></i></a>
        <a href="#" className="text-gray-400 hover:text-blue-400 transition"><i className="fab fa-linkedin-in"></i></a>
      </div>
    </div>
  </div>

  {/* Bottom Section */}
  <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
    <p>&copy; {new Date().getFullYear()} GasByGas. All Rights Reserved.</p>
  </div>
</footer>
);






  return (
 
    <div>
    {/* <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav> */}

    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/about" element={<About />} /> */}
    </Routes>
  </div>

  )
}

export default App
