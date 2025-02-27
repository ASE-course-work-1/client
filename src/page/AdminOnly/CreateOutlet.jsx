// src/page/CreateOutlet.jsx
import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import axios from "axios";

const CreateOutlet = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [district, setDistrict] = useState("");
  const [contact, setContact] = useState("");
  const [capacity, setCapacity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreateOutlet = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.post(
        "http://localhost:5003/api/outlets",
        {
          name,
          location,
          district,
          contact,
          capacity: Number(capacity),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setSuccess("Outlet created successfully!");
      setName("");
      setLocation("");
      setDistrict("");
      setContact("");
      setCapacity("");
    } catch (err) {
      console.error("Error creating outlet:", err);
      setError("Error creating outlet. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout title="Create New Outlet">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <form onSubmit={handleCreateOutlet} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-semibold text-lg">Outlet Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="location" className="font-semibold text-lg">Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="district" className="font-semibold text-lg">District</label>
            <input
              type="text"
              id="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="contact" className="font-semibold text-lg">Contact</label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="capacity" className="font-semibold text-lg">Capacity</label>
            <input
              type="number"
              id="capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="px-4 py-2 border rounded-lg"
              required
              min="0"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            {isLoading ? "Creating Outlet..." : "Create Outlet"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateOutlet;
