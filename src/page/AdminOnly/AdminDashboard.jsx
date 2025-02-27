// src/page/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import axios from "axios";

const AdminDashboard = () => {
  const [outlets, setOutlets] = useState([]);
  const [selectedOutletId, setSelectedOutletId] = useState("");
  const [stock, setStock] = useState(null);
  const [newStock, setNewStock] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch outlets on mount
  useEffect(() => {
    const fetchOutlets = async () => {
      try {
        const response = await axios.get("/api/outlets", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setOutlets(response.data);
      } catch (err) {
        console.error("Error fetching outlets:", err);
      }
    };

    fetchOutlets();
  }, []);

  // Fetch stock when selectedOutletId changes
  useEffect(() => {
    const fetchStock = async () => {
      if (!selectedOutletId) {
        setStock(null);
        return;
      }
      try {
        const response = await axios.get(`/api/stock/${selectedOutletId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setStock(response.data.stock);
      } catch (err) {
        console.error("Error fetching stock:", err);
        setStock(null);
      }
    };

    fetchStock();
  }, [selectedOutletId]);

  const handleAddStock = async (e) => {
    e.preventDefault();
    if (!selectedOutletId || newStock === "") {
      setError("Please select an outlet and enter stock amount.");
      return;
    }
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.put(
        `/api/stock/${selectedOutletId}`,
        { stock: Number(newStock) },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setSuccess("Stock updated successfully!");
      // Refresh stock after update
      const response = await axios.get(`/api/stock/${selectedOutletId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setStock(response.data.stock);
      setNewStock("");
    } catch (err) {
      console.error("Error updating stock:", err);
      setError("Failed to update stock. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout title="Admin Dashboard - Manage Stock">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
        <div className="mb-6">
          <label htmlFor="outlet" className="font-semibold text-lg">
            Select Outlet
          </label>
          <select
            id="outlet"
            value={selectedOutletId}
            onChange={(e) => setSelectedOutletId(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option value="">Select Outlet</option>
            {outlets.map((outlet) => (
              <option key={outlet.id} value={outlet.id}>
                {outlet.name}
              </option>
            ))}
          </select>
        </div>
        {selectedOutletId && (
          <div className="mb-6">
            <h3 className="text-xl font-bold">
              Current Stock: {stock !== null ? stock : "Loading..."}
            </h3>
          </div>
        )}
        <form onSubmit={handleAddStock} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="newStock" className="font-semibold text-lg">
              Add Stock
            </label>
            <input
              type="number"
              id="newStock"
              value={newStock}
              onChange={(e) => setNewStock(e.target.value)}
              className="px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            {isLoading ? "Updating Stock..." : "Update Stock"}
          </button>
        </form>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        {success && <div className="text-green-500 mt-4">{success}</div>}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
