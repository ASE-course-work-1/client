// src/page/ManageScheduledRequests.jsx
import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import axios from "axios";
import { format } from "date-fns";

const ManageScheduledRequests = () => {
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loadingOutlets, setLoadingOutlets] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all outlets and filter according to the logged-in manager
  useEffect(() => {
    const fetchOutlets = async () => {
      try {
        const response = await axios.get("http://localhost:5003/api/outlets/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const allOutlets = Array.isArray(response.data) ? response.data : [];
        const managerId = localStorage.getItem("Userid");
        const managerOutlets = allOutlets.filter(
          (outlet) => outlet.manager && outlet.manager._id === managerId
        );
        if (managerOutlets.length > 0) {
          // Use the first authorized outlet for this manager
          setSelectedOutlet(managerOutlets[0]);
        } else {
          setError("No authorized outlet found for this manager.");
        }
      } catch (err) {
        console.error("Error fetching outlets:", err);
        setError("Failed to fetch outlets.");
      } finally {
        setLoadingOutlets(false);
      }
    };
    fetchOutlets();
  }, []);

  // Fetch all scheduled requests and filter them by the manager's outlet name
  useEffect(() => {
    if (selectedOutlet) {
      const fetchRequests = async () => {
        try {
          const response = await axios.get("http://localhost:5003/api/requests/all", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
          const allRequests = Array.isArray(response.data) ? response.data : [];
          const filteredRequests = allRequests.filter(
            (req) => req.outletId && req.outletId.name === selectedOutlet.name
          );
          setRequests(filteredRequests);
        } catch (err) {
          console.error("Error fetching requests:", err);
          setError("Failed to fetch scheduled requests.");
        } finally {
          setLoadingRequests(false);
        }
      };
      fetchRequests();
    }
  }, [selectedOutlet]);

  // Handler to update a request's status with confirmation
  const handleStatusChange = async (requestId, newStatus) => {
    const confirmed = window.confirm("Are you sure you want to update the status?");
    if (!confirmed) return;

    setIsUpdating(true);
    setError("");
    setSuccess("");
    try {
      await axios.put(
        `http://localhost:5003/api/outlets/requests/${requestId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setSuccess("Request status updated successfully!");
      // Refresh the list of requests
      const response = await axios.get("http://localhost:5003/api/requests/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const allRequests = Array.isArray(response.data) ? response.data : [];
      const filteredRequests = allRequests.filter(
        (req) => req.outletId && req.outletId.name === selectedOutlet.name
      );
      setRequests(filteredRequests);
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update request status.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Define your status options (customize as needed)
  const statusOptions = ["pending", "processing", "delivered", "cancelled"];

  return (
    <DashboardLayout title="Manage Scheduled Requests">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        {loadingOutlets || loadingRequests ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Scheduled Requests for Outlet: {selectedOutlet ? selectedOutlet.name : "N/A"}
            </h2>
            {requests.length === 0 ? (
              <p>No scheduled requests found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {requests.map((req) => (
                  <div key={req._id} className="border p-4 rounded-lg">
                    <p>
                      <strong>Token:</strong> {req.token}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {req.quantity}
                    </p>
                    <p>
                      <strong>Status:</strong> {req.status}
                    </p>
                    <p>
                      <strong>Address:</strong> {req.address}
                    </p>
                    <p>
                      <strong>User:</strong> {req.consumerId?.name}
                    </p>
                    <p>
                      <strong>Phone:</strong> {req.consumerId?.phone}
                    </p>
                    <p>
                      <strong>Created At:</strong> {format(new Date(req.createdAt), "PPP p")}
                    </p>
                    <div className="mt-2">
                      <label htmlFor={`status-${req._id}`} className="mr-2">
                        Update Status:
                      </label>
                      <select
                        id={`status-${req._id}`}
                        defaultValue={req.status}
                        onChange={(e) => handleStatusChange(req._id, e.target.value)}
                        className="border p-1 rounded"
                        disabled={isUpdating}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManageScheduledRequests;
