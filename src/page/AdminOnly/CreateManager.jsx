// src/page/CreateManager.jsx
import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import axios from "axios";

const CreateManager = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreateManager = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post(
        "/api/outlets/managers",
        {
          name,
          email,
          password,
          phone,
          nic,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setSuccess("Manager account created successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setNic("");
    } catch (err) {
      console.error("Error creating manager:", err);
      setError("Error creating manager. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout title="Create Manager Account">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <form onSubmit={handleCreateManager} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-semibold text-lg">Manager Name</label>
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
            <label htmlFor="email" className="font-semibold text-lg">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="font-semibold text-lg">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="font-semibold text-lg">Phone</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="nic" className="font-semibold text-lg">NIC</label>
            <input
              type="text"
              id="nic"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              className="px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            {isLoading ? "Creating Manager..." : "Create Manager"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateManager;
