// src/page/ManageDeliveries.jsx
import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import axios from "axios";
import { format } from "date-fns";

const ManageDeliveries = () => {
  const [outlets, setOutlets] = useState([]);
  const [selectedOutletId, setSelectedOutletId] = useState("");
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  const [requests, setRequests] = useState([]);
  const [scheduledDate, setScheduledDate] = useState("");
  const [requestId, setRequestId] = useState("");
  const [loadingOutlets, setLoadingOutlets] = useState(false);
  const [loadingDeliveries, setLoadingDeliveries] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For schedule/update actions
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all outlets on mount and filter by logged-in manager
  useEffect(() => {
    const fetchOutlets = async () => {
      setLoadingOutlets(true);
      try {
        const response = await axios.get("http://localhost:5003/api/outlets/all");
        const allOutlets = Array.isArray(response.data) ? response.data : [];
  
        // Get logged-in manager ID from local storage
        const loggedUserId = localStorage.getItem("Userid");
  
        // Filter outlets managed by the logged-in user
        const filteredOutlets = allOutlets.filter(
          (outlet) => outlet.manager && outlet.manager._id === loggedUserId
        );
  
        setOutlets(filteredOutlets);
      } catch (err) {
        console.error("Error fetching outlets:", err);
        setError("Failed to fetch outlets.");
      } finally {
        setLoadingOutlets(false);
      }
    };
  
    fetchOutlets();
  }, []);

  // When an outlet is selected, update details and fetch its deliveries
  useEffect(() => {
    if (selectedOutletId) {
      const outlet = outlets.find((o) => o._id === selectedOutletId);
      setSelectedOutlet(outlet);
      // Fetch deliveries for the selected outlet
      const fetchDeliveries = async () => {
        setLoadingDeliveries(true);
        try {
          const response = await axios.get(`http://localhost:5003/api/deliveries/${selectedOutletId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
          setDeliveries(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
          console.error("Error fetching deliveries:", err);
          setError("Failed to fetch deliveries.");
          setDeliveries([]);
        } finally {
          setLoadingDeliveries(false);
        }
      };
      fetchDeliveries();
    } else {
      setSelectedOutlet(null);
      setDeliveries([]);
    }
  }, [selectedOutletId, outlets]);

  // Fetch requests for the selected outlet
  useEffect(() => {
    if (selectedOutletId) {
      const fetchRequests = async () => {
        setLoadingRequests(true);
        try {
          const response = await axios.get(`http://localhost:5003/api/requests/outlet/${selectedOutletId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
          setRequests(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
          console.error("Error fetching requests:", err);
        } finally {
          setLoadingRequests(false);
        }
      };
      fetchRequests();
    } else {
      setRequests([]);
    }
  }, [selectedOutletId]);

  // Schedule a new delivery
  const handleScheduleDelivery = async (e) => {
    e.preventDefault();
    if (!selectedOutletId || !scheduledDate || !requestId) {
      setError("Please select an outlet, set a scheduled date, and select a request.");
      return;
    }
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.post(
        "http://localhost:5003/api/deliveries",
        { outletId: selectedOutletId, scheduledDate, requestId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setSuccess("Delivery scheduled successfully!");
      // Refresh deliveries list
      const response = await axios.get(`http://localhost:5003/api/deliveries/${selectedOutletId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setDeliveries(Array.isArray(response.data) ? response.data : []);
      setScheduledDate("");
      setRequestId("");
    } catch (err) {
      console.error("Error scheduling delivery:", err);
      setError("Failed to schedule delivery.");
    } finally {
      setIsLoading(false);
    }
  };

  // Update delivery status
  const handleUpdateStatus = async (deliveryId, status) => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.put(
        `http://localhost:5003/api/deliveries/${deliveryId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setSuccess("Delivery status updated successfully!");
      // Refresh deliveries list
      const response = await axios.get(`http://localhost:5003/api/deliveries/${selectedOutletId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setDeliveries(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update delivery status.");
    } finally {
      setIsLoading(false);
    }
  };

  // Confirm a delivery
  const handleConfirmDelivery = async (deliveryId) => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.post(
        `http://localhost:5003/api/deliveries/confirm/${deliveryId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setSuccess("Delivery confirmed successfully!");
      // Refresh deliveries list
      const response = await axios.get(`http://localhost:5003/api/deliveries/${selectedOutletId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setDeliveries(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error confirming delivery:", err);
      setError("Failed to confirm delivery.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout title="Manage Deliveries">
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
              {selectedOutlet.manager ? selectedOutlet.manager.name : "Not assigned"}
            </p>
            <p>
              <span className="font-semibold">Contact:</span> {selectedOutlet.contact}
            </p>
          </div>
        )}

        {/* Schedule New Delivery */}
        {selectedOutletId && (
          <div className="mb-6 border p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-4">Schedule Delivery</h3>
            <form onSubmit={handleScheduleDelivery} className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="scheduledDate" className="block font-medium mb-2">
                  Scheduled Date & Time
                </label>
                <input
                  id="scheduledDate"
                  type="datetime-local"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="requestId" className="block font-medium mb-2">
                  Select Request
                </label>
                {loadingRequests ? (
                  <p>Loading requests...</p>
                ) : requests.length === 0 ? (
                  <p>No requests available for this outlet.</p>
                ) : (
                  <div className="max-h-40 overflow-y-auto border rounded-md p-2">
                    {requests.map((req) => (
                      <div
                        key={req._id}
                        onClick={() => setRequestId(req._id)}
                        className={`p-2 border-b cursor-pointer ${
                          requestId === req._id ? "bg-blue-100" : ""
                        }`}
                      >
                        <p>
                          <span className="font-medium">Token:</span> {req.token}
                        </p>
                        <p>
                          <span className="font-medium">Quantity:</span> {req.quantity}
                        </p>
                        <p>
                          <span className="font-medium">User:</span> {req.consumerId?.name}
                        </p>
                        <p>
                          <span className="font-medium">Phone:</span> {req.consumerId?.phone}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                {isLoading ? "Scheduling..." : "Schedule Delivery"}
              </button>
            </form>
          </div>
        )}

        {/* Deliveries List */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Scheduled Deliveries</h3>
          {loadingDeliveries ? (
            <p>Loading deliveries...</p>
          ) : deliveries.length === 0 ? (
            <p>No deliveries scheduled yet.</p>
          ) : (
            <div className="space-y-4">
              {deliveries.map((delivery) => (
                <div key={delivery._id} className="border p-4 rounded-md">
                  <p>
                    <strong>Delivery ID:</strong> {delivery._id}
                  </p>
                  <p>
                    <strong>Status:</strong> {delivery.status}
                  </p>
                  <p>
                    <strong>Scheduled For:</strong>{" "}
                    {format(new Date(delivery.scheduledDate), "PPP p")}
                  </p>
                  <div className="mt-4">
                    <label htmlFor={`status-${delivery._id}`} className="block font-medium mb-2">
                      Update Status
                    </label>
                    <select
                      id={`status-${delivery._id}`}
                      onChange={(e) => handleUpdateStatus(delivery._id, e.target.value)}
                      className="w-full p-2 border rounded-md"
                      defaultValue={delivery.status}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-transit">In Transit</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                  {delivery.status === "delivered" && (
                    <button
                      className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                      onClick={() => handleConfirmDelivery(delivery._id)}
                      disabled={isLoading}
                    >
                      {isLoading ? "Confirming..." : "Confirm Delivery"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageDeliveries;
