// src/page/ManageStock.jsx
import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import axios from "axios";

const ManageStock = () => {
  const [outlets, setOutlets] = useState([]);
  const [selectedOutletId, setSelectedOutletId] = useState("");
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [currentStock, setCurrentStock] = useState(null);
  const [newStock, setNewStock] = useState("");
  const [loadingOutlets, setLoadingOutlets] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all outlets from public API on mount
  useEffect(() => {
    const fetchOutlets = async () => {
      setLoadingOutlets(true);
      try {
        const response = await axios.get("http://localhost:5003/api/outlets/public");
        // Response is an array of outlet objects
        setOutlets(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error fetching outlets:", err);
        setError("Failed to fetch outlets.");
      } finally {
        setLoadingOutlets(false);
      }
    };

    fetchOutlets();
  }, []);

  // When an outlet is selected, update the outlet details and fetch its current stock.
  useEffect(() => {
    if (selectedOutletId) {
      const outlet = outlets.find((o) => o._id === selectedOutletId);
      setSelectedOutlet(outlet);
      // Fetch current stock for the selected outlet.
      const fetchStock = async () => {
        try {
          const response = await axios.get(`http://localhost:5003/api/stock/${selectedOutletId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
          setCurrentStock(response.data.stock);
        } catch (err) {
          console.error("Error fetching stock:", err);
          setCurrentStock(null);
        }
      };
      fetchStock();
    } else {
      setSelectedOutlet(null);
      setCurrentStock(null);
    }
  }, [selectedOutletId, outlets]);

  const handleUpdateStock = async (e) => {
    e.preventDefault();
    if (!selectedOutletId || newStock === "") {
      setError("Please select an outlet and enter a stock value.");
      return;
    }
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post(
        `http://localhost:5003/api/stock/${selectedOutletId}`,
        { stock: Number(newStock) },
        { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
      );
      setSuccess("Stock updated successfully!");
      setCurrentStock(Number(newStock));
      setNewStock("");
    } catch (err) {
      console.error("Error updating stock:", err);
      setError("Failed to update stock. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout title="Manage Outlet Stock">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        {/* Outlet Selection */}
        <div className="mb-6">
          <label htmlFor="outletSelect" className="font-semibold text-lg">
            Select Outlet
          </label>
          {loadingOutlets ? (
            <p>Loading outlets...</p>
          ) : (
            <select
              id="outletSelect"
              value={selectedOutletId}
              onChange={(e) => setSelectedOutletId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
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

        {/* Outlet Details */}
        {selectedOutlet && (
          <div className="mb-6 border p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2">{selectedOutlet.name}</h3>
            <p>
              <span className="font-semibold">Location:</span> {selectedOutlet.location}
            </p>
            <p>
              <span className="font-semibold">District:</span> {selectedOutlet.district}
            </p>
            <p>
              <span className="font-semibold">Manager:</span>{" "}
              {selectedOutlet.manager ? selectedOutlet.manager.name : "Not added yet manager"}
            </p>
            <p>
              <span className="font-semibold">Contact:</span> {selectedOutlet.contact}
            </p>
            {currentStock !== null && (
              <p>
                <span className="font-semibold">Current Stock:</span> {currentStock}
              </p>
            )}
          </div>
        )}

        {/* Update Stock Form */}
        <form onSubmit={handleUpdateStock} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="newStock" className="font-semibold text-lg">
              Add/Update Stock
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
      </div>
    </DashboardLayout>
  );
};

export default ManageStock;
