// src/page/OutletDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";

export default function OutletDashboard() {
    const [outletData, setOutletData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOutletData = async () => {
            try {
                const response = await axios.get("http://localhost:5003/api/outlet/dashboard", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                      },
                });
                setOutletData(response.data);
                setLoading(false);
            } catch (err) {
                setError("Error fetching outlet data.");
                setLoading(false);
            }
        };

        fetchOutletData();
    }, []);

    const handleUpdateOutlet = async (updatedOutlet) => {
        try {
            // Call your API to update outlet data
            const response = await axios.put(
                `http://localhost:5003/api/outlet/${outletData.id}`,
                updatedOutlet,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
                    },
                }
            );
            setOutletData(response.data);
            alert("Outlet data updated successfully!");
        } catch (err) {
            setError("Failed to update outlet data.");
        }
    };

    const handleDeleteOutlet = async () => {
        try {
            // Call your API to delete the outlet
            await axios.delete(`http://localhost:5003/api/outlet/${outletData.id}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
                },
            });
            alert("Outlet deleted successfully!");
            setOutletData(null); // Clear the outlet data after deletion
        } catch (err) {
            setError("Failed to delete outlet.");
        }
    };

    return (
        <DashboardLayout title="Outlet Management">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {loading ? (
                <p>Loading outlet data...</p>
            ) : (
                <div className="space-y-6">
                    {outletData ? (
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Outlet Information:</h2>
                            <div className="space-y-2">
                                <p>
                                    <strong>Name:</strong> {outletData.name}
                                </p>
                                <p>
                                    <strong>Location:</strong> {outletData.location}
                                </p>
                                <p>
                                    <strong>Stock Available:</strong> {outletData.stockAvailable}
                                </p>
                            </div>
                            <div className="space-x-4 mt-6">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => handleUpdateOutlet({ name: "Updated Name", location: "Updated Location", stockAvailable: 100 })}
                                >
                                    Update Outlet
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    onClick={handleDeleteOutlet}
                                >
                                    Delete Outlet
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p>Outlet data not found.</p>
                    )}
                </div>
            )}
        </DashboardLayout>
    );
}
