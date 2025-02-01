import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = ({ userRole }) => {
    const [stats, setStats] = useState({
        orders: 0,
        pendingDeliveries: 0,
        outlets: 0,
        stock: 0,
    });
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(userRole || localStorage.getItem("Role"));

    useEffect(() => {
        if (!role) return; // Don't make an API call if the role is missing

        // Dummy API call simulation with axios
        axios.get(`/api/dashboard-stats?role=${role}`)
            .then((response) => {
                // Simulate stats data based on user role
                const responseData = response.data || {
                    orders: 120,
                    pendingDeliveries: 40,
                    outlets: 10,
                    stock: 200,
                    dailyOrders: [10, 20, 15, 30, 50, 60, 80], // Dummy data for the chart
                };

                setStats(responseData);

                // Chart data simulation (daily orders for the past week)
                setChartData({
                    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    datasets: [
                        {
                            label: "Orders this week",
                            data: responseData.dailyOrders,
                            borderColor: "rgb(75, 192, 192)",
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            fill: true,
                        },
                    ],
                });

                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching stats", error);
                setLoading(false);
            });
    }, [role]);

    if (loading) {
        return <DashboardLayout title="Dashboard"><p>Loading...</p></DashboardLayout>;
    }

    return (
        <DashboardLayout title="Dashboard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {role === "consumer" && (
                    <div className="bg-white p-6 shadow-md rounded">
                        <h3 className="text-xl font-bold">Your Orders</h3>
                        <p className="text-3xl">{stats.orders}</p>
                    </div>
                )}

                {role === "outlet_manager" && (
                    <>
                        <div className="bg-white p-6 shadow-md rounded">
                            <h3 className="text-xl font-bold">Pending Deliveries</h3>
                            <p className="text-3xl">{stats.pendingDeliveries}</p>
                        </div>
                        <div className="bg-white p-6 shadow-md rounded">
                            <h3 className="text-xl font-bold">Stock Available</h3>
                            <p className="text-3xl">{stats.stock}</p>
                        </div>
                    </>
                )}

                {role === "admin" && (
                    <>
                        <div className="bg-white p-6 shadow-md rounded">
                            <h3 className="text-xl font-bold">Total Outlets</h3>
                            <p className="text-3xl">{stats.outlets}</p>
                        </div>
                        <div className="bg-white p-6 shadow-md rounded">
                            <h3 className="text-xl font-bold">Stock Across Outlets</h3>
                            <p className="text-3xl">{stats.stock}</p>
                        </div>
                    </>
                )}

                {/* Chart for Admins or any role that needs it */}
                {role === "admin" && (
                    <div className="bg-white p-6 shadow-md rounded col-span-3">
                        <h3 className="text-xl font-bold">Weekly Orders Trend</h3>
                        <Line data={chartData} options={{ responsive: true }} />
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
