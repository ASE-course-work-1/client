import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function AuthPages() {
  // "register", "login", "otp" are the possible pages
  const [page, setPage] = useState("login");
  // Used to store temporary login info such as email for OTP verification
  const [tempEmail, setTempEmail] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {page === "register" && (
          <Register setPage={setPage} setTempEmail={setTempEmail} />
        )}
        {page === "login" && (
          <Login setPage={setPage} setTempEmail={setTempEmail} />
        )}
        {page === "otp" && <OTPVerification setPage={setPage} tempEmail={tempEmail} />}
      </motion.div>
    </div>
  );
}

// Registration Page
function Register({ setPage, setTempEmail }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("Individual");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/v1/register", {
        name,
        email,
        contact,
        password,
        accountType,
        role: "Consumer",
      });
      if (response.data.message) {
        setTempEmail(email);
        setPage("otp");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Create Account</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <input
        type="text"
        placeholder="Name"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Contact"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={accountType}
        onChange={(e) => setAccountType(e.target.value)}
      >
        <option value="Individual">Individual</option>
        <option value="Business">Business</option>
      </select>
      <button
        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
        onClick={handleRegister}
      >
        Create Account
      </button>
      <p className="text-center text-sm">
        Already have an account? {" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setPage("login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}

// Login Page
function Login({ setPage, setTempEmail }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      // Call your login API endpoint which sends an OTP
      const response = await axios.post("http://localhost:5001/api/v1/login", {
        email,
        password,
      });
      if (response.data.message) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("Userid", response.data.id);
        localStorage.setItem("Email", response.data.email);
        localStorage.setItem("Role", response.data.role);
        alert("User Verified! You are now logged in.");
        // Redirect to the home page after verification
        window.location.href = "/";
      }
    } catch (err) {
      setError("Invalid login credentials");
    }
  };

  // Bypass login for testing purposes with dummy details
  const handleBypassLogin = () => {
    const dummyToken = "dummy-auth-token";
    localStorage.setItem("authToken", dummyToken);
    alert("Bypass Login Successful! Redirecting to Home...");
    // Redirect to the home page
    //setPage("AdminPanel");
    window.location.href = "/outdash";
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Login</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
        onClick={handleLogin}
      >
        Login
      </button>
      <button
        className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-300"
        onClick={handleBypassLogin}
      >
        Test Login (Bypass)
      </button>
      <p className="text-center text-sm">
        Don't have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setPage("register")}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
}

// OTP Verification Page
function OTPVerification({ setPage, tempEmail }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    try {
      // Call your OTP verification API endpoint
      const response = await axios.post("http://localhost:5001/api/v1/verify-otp", {
        email: tempEmail,
        otp,
      });
      if (response.data.token) {
        // Save the authentication token in localStorage
        localStorage.setItem("authToken", response.data.token);
        alert("OTP Verified! You are now logged in.");
        // Redirect to the home page after verification
        window.location.href = "/";
      } else {
        setError("OTP Verification failed. Please try again.");
      }
    } catch (err) {
      setError("OTP Verification failed. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">OTP Verification</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <input
        type="text"
        placeholder="Enter OTP"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button
        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
        onClick={handleVerify}
      >
        Verify
      </button>
    </div>
  );
}
