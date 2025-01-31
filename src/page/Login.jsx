import { useState } from "react";
import { motion } from "framer-motion";

export default function AuthPages() {
  const [page, setPage] = useState("register");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {page === "register" && <Register setPage={setPage} />}
        {page === "login" && <Login setPage={setPage} />}
        {page === "otp" && <OTPVerification setPage={setPage} />}
      </motion.div>
    </div>
  );
}

function Register({ setPage }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Create Account</h2>
      <input type="text" placeholder="Name" className="input-field" />
      <input type="email" placeholder="Email" className="input-field" />
      <input type="text" placeholder="Contact" className="input-field" />
      <input type="password" placeholder="Password" className="input-field" />
      <button className="btn" onClick={() => setPage("otp")}>Create Account</button>
      <p className="text-center text-sm">
        Already have an account? <span className="text-blue-500 cursor-pointer" onClick={() => setPage("login")}>Login</span>
      </p>
    </div>
  );
}

function Login({ setPage }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Login</h2>
      <input type="email" placeholder="Email" className="input-field" />
      <input type="password" placeholder="Password" className="input-field" />
      <button className="btn" onClick={() => setPage("otp")}>Login</button>
      <p className="text-center text-sm">
        Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={() => setPage("register")}>Sign Up</span>
      </p>
    </div>
  );
}

function OTPVerification({ setPage }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">OTP Verification</h2>
      <input type="text" placeholder="Enter OTP" className="input-field" />
      <button className="btn" onClick={() => alert("Verified!")}>Verify</button>
    </div>
  );
}

// Tailwind Utility Classes
const inputFieldStyles = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400";
const buttonStyles = "w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300";

document.querySelectorAll(".input-field").forEach(el => el.className = inputFieldStyles);
document.querySelectorAll(".btn").forEach(el => el.className = buttonStyles);
