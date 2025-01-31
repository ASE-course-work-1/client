

export default function Contact() {
  return (
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
  )
}
