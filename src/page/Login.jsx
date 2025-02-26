import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import PropTypes from "prop-types";

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
          <Login setPage={setPage} />
        )}
        {page === "otp" && (
          <OTPVerification tempEmail={tempEmail} />
        )}
      </motion.div>
    </div>
  );
}

// Registration Page
function Register({ setPage, setTempEmail }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");
    try {
      const response = await axios.post("http://localhost:5003/api/auth/register", {
        name,
        email,
        password,
        phone,
        nic,
        role: "consumer",
      });
      // Assuming a success message indicates registration success
      if (response.data.message) {
        setTempEmail(email);
        setPage("otp");
      } else {
        setError(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Please try again.");
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
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="text"
        placeholder="NIC"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={nic}
        onChange={(e) => setNic(e.target.value)}
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
        onClick={handleRegister}
      >
        Create Account
      </button>
      <p className="text-center text-sm">
        Already have an account?{" "}
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

Register.propTypes = {
  setPage: PropTypes.func.isRequired,
  setTempEmail: PropTypes.func.isRequired,
};

// Login Page
function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const response = await axios.post("http://localhost:5003/api/auth/login", {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("Userid", response.data.user.id);
        localStorage.setItem("Email", response.data.user.email);
        localStorage.setItem("Role", response.data.user.role);
        alert("User Verified! You are now logged in.");
        window.location.href = "/dashboard";
      } else {
        setError(response.data.message || "Invalid login credentials");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid login credentials");
    }
  };

  // Bypass login for testing purposes
  const handleBypassLogin = () => {
    const dummyToken = "dummy-auth-token";
    localStorage.setItem("authToken", dummyToken);
    alert("Bypass Login Successful! Redirecting to Home...");
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
        Don&apos;t have an account?{" "}
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

Login.propTypes = {
  setPage: PropTypes.func.isRequired,
};

// OTP Verification Page
function OTPVerification({ tempEmail }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    setError("");
    try {
      const response = await axios.post("http://localhost:5003/api/auth/verify-identity", {
        email: tempEmail,
        otp,
      });
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        alert("OTP Verified! You are now logged in.");
        window.location.href = "/";
      } else {
        setError(response.data.message || "OTP Verification failed. Please try again.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "OTP Verification failed. Please try again.");
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

OTPVerification.propTypes = {
  tempEmail: PropTypes.string.isRequired,
};
