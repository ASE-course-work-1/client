// src/page/OutletDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";

export default function OutletDashboard() {
    const [outletData, setOutletData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOutletData = async () => {
            try {
                // Replace with your actual endpoint for outlet data
                const response = await axios.get("http://your-api-url/api/outlet/dashboard", {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
                    },
                });
                setOutletData(response.data);
            } catch (err) {
                setError("Error fetching outlet data.");
            }
        };

        fetchOutletData();
    }, []);

    return (
        <DashboardLayout title="Outlet Dashboard">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {outletData ? (
                <div>
                    <h2 className="text-2xl font-bold mb-2">Outlet Information:</h2>
                    <p>
                        <strong>Name:</strong> {outletData.name}
                    </p>
                    <p>
                        <strong>Location:</strong> {outletData.location}
                    </p>
                    <p>
                        <strong>Stock Available:</strong> {outletData.stockAvailable}
                    </p>
                    {/* Display additional outlet information as needed */}
                </div>
            ) : (
                <p>Loading outlet data...</p>
            )}
        </DashboardLayout>
    );
}
