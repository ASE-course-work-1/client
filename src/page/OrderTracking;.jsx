// src/page/OrderTracking.jsx
import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import axios from "axios";

const OrderTracking = () => {
  const [token, setToken] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setOrderStatus(null);

    try {
      const response = await axios.get(`/api/requests/status/${token}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      // Assume the response contains an object with a "status" property
      setOrderStatus(response.data);
    } catch (err) {
      console.error("Error tracking order:", err);
      setError("Failed to track order. Please check the token and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout title="Order Tracking">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
        <form onSubmit={handleTrackOrder} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="token" className="font-semibold text-lg">
              Enter Order Token
            </label>
            <input
              type="text"
              id="token"
              name="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. ABC123"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {isLoading ? "Tracking Order..." : "Track Order"}
          </button>
        </form>

        {error && <div className="text-red-500 mt-4">{error}</div>}

        {orderStatus && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-100">
            <h3 className="text-xl font-bold mb-2">Order Status</h3>
            <p className="text-gray-700">{orderStatus.status}</p>
            {/* Display additional details if available */}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default OrderTracking;
