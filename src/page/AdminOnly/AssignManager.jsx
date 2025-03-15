import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import axios from "axios";

const AssignManager = () => {
  const [selectedOutletId, setSelectedOutletId] = useState("");
  const [selectedManagerId, setSelectedManagerId] = useState("");
  const [outlets, setOutlets] = useState([]);
  const [managers, setManagers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchOutlets = async () => {
      try {
        const response = await axios.get("http://localhost:5003/api/outlets/unassigned", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setOutlets(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error fetching outlets:", err);
      }
    };

    const fetchManagers = async () => {
      try {
        const response = await axios.get("http://localhost:5003/api/outlets/managers/unassigned", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setManagers(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error fetching managers:", err);
      }
    };

    fetchOutlets();
    fetchManagers();
  }, []);

  const handleAssignManager = async (e) => {
    e.preventDefault();
    if (!selectedOutletId || !selectedManagerId) {
      setError("Please select both outlet and manager.");
      return;
    }
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.put(
        `http://localhost:5003/api/outlets/${selectedOutletId}/manager`,
        { managerId: selectedManagerId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setSuccess("Manager assigned successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error("Error assigning manager:", err);
      setError("Failed to assign manager. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout title="Assign Outlet Manager">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <form onSubmit={handleAssignManager} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="outlet" className="font-semibold text-lg">
              Select Outlet
            </label>
            <select
              id="outlet"
              value={selectedOutletId}
              onChange={(e) => setSelectedOutletId(e.target.value)}
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
          </div>
          <div className="flex flex-col">
            <label htmlFor="manager" className="font-semibold text-lg">
              Select Manager
            </label>
            <select
              id="manager"
              value={selectedManagerId}
              onChange={(e) => setSelectedManagerId(e.target.value)}
              className="px-4 py-2 border rounded-lg"
              required
            >
              <option value="">Select Manager</option>
              {managers.map((manager) => (
                <option key={manager._id} value={manager._id}>
                  {manager.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            {isLoading ? "Assigning..." : "Assign Manager"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AssignManager;
