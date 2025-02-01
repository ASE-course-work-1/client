// src/page/CreateOrder.jsx
import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import axios from "axios";

const CreateOrder = () => {
  const [cylinderType, setCylinderType] = useState(""); // To track cylinder type input
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form submission
  const handleCreateOrder = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsLoading(true);
    setError(""); // Clear any previous errors
    setSuccess(""); // Clear previous success messages

    try {
      // Replace with your backend API URL
      const response = await axios.post('/api/gas-requests', {
        cylinderType: cylinderType,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Assuming token is stored in localStorage
        }
      });

      // Success message
      setSuccess("Order created successfully!");
      setCylinderType(""); // Reset the form
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
        {/* <h2 className="text-2xl font-bold mb-4">Create a New Order</h2> */}

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        <form onSubmit={handleCreateOrder} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="cylinderType" className="font-semibold text-lg">Cylinder Type</label>
            <select
              id="cylinderType"
              name="cylinderType"
              value={cylinderType}
              onChange={(e) => setCylinderType(e.target.value)}
              className="px-4 py-2 border rounded-lg"
              required
            >
              <option value="">Select Cylinder Type</option>
              <option value="12.5 kg">12.5 kg</option>
              <option value="5 kg">5 kg</option>
              <option value="20 kg">20 kg</option>
            </select>
          </div>
          {/* <div className="flex flex-col">
            <label htmlFor="selectOutlet" className="font-semibold text-lg">Select Outlet</label>
            <select
              id="ouletSelect"
              name="ouletSelect"
              value={ouletSelect}
              onChange={(e) => setCylinderType(e.target.value)}
              className="px-4 py-2 border rounded-lg"
              required
            >
              <option value="">Select Cylinder Type</option>
              <option value="12.5 kg">12.5 kg</option>
              <option value="5 kg">5 kg</option>
              <option value="20 kg">20 kg</option>
            </select>
          </div> */}

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
