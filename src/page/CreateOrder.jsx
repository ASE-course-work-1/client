import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import axios from "axios";

const CreateOrder = () => {
  const [outletId, setOutletId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [outlets, setOutlets] = useState([]);
  const [loadingOutlets, setLoadingOutlets] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOutlets = async () => {
      setLoadingOutlets(true);
      try {
        const response = await axios.get("http://localhost:5003/api/outlets/public");
        setOutlets(response.data);
      } catch (err) {
        console.error("Error fetching outlets:", err);
      } finally {
        setLoadingOutlets(false);
      }
    };

    fetchOutlets();
  }, []);

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    setOrderDetails(null);

    try {
      const response = await axios.post(
        "http://localhost:5003/api/requests",
        { outletId, quantity, address },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        }
      );

      setSuccess("Order created successfully!");
      setOrderDetails(response.data);
      setOutletId("");
      setQuantity(1);
      setAddress("");
    } catch (err) {
      console.error("Error creating order:", err);
      setError("There was an error creating your order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout title="Create New Order">
      <div className="container mx-auto p-6">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        {orderDetails && (
          <div className="p-4 border rounded-lg bg-gray-100 mb-4">
            <h3 className="font-semibold text-lg">Order Details:</h3>
            <p><strong>Consumer ID:</strong> {orderDetails.consumerId}</p>
            <p><strong>Outlet ID:</strong> {orderDetails.outletId}</p>
            <p><strong>Status:</strong> {orderDetails.status}</p>
            <p><strong>Token:</strong> {orderDetails.token}</p>
            <p><strong>Quantity:</strong> {orderDetails.quantity}</p>
            <p><strong>Address:</strong> {orderDetails.address}</p>
            <p><strong>Created At:</strong> {new Date(orderDetails.createdAt).toLocaleString()}</p>
          </div>
        )}

        <form onSubmit={handleCreateOrder} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="outletId" className="font-semibold text-lg">Select Outlet</label>
            {loadingOutlets ? (
              <p>Loading outlets...</p>
            ) : (
              <select
                id="outletId"
                value={outletId}
                onChange={(e) => setOutletId(e.target.value)}
                className="px-4 py-2 border rounded-lg"
                required
              >
                <option value="">Select Outlet</option>
                {outlets.map((outlet) => (
                  <option key={outlet._id} value={outlet._id}>
                    {outlet.name} - {outlet.location}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="quantity" className="font-semibold text-lg">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="px-4 py-2 border rounded-lg"
              required
              min="1"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="address" className="font-semibold text-lg">Delivery Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Creating Order..." : "Create Order"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateOrder;
