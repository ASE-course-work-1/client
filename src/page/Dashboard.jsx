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
        orders: 5,
        pendingDeliveries: 2,
        outlets: 1,
        stock: 40,
        totalSales: 1000, // New dummy data for total sales
        recentDeliveries: 3, // New dummy data for recent deliveries
        scheduledOrders: 2, // Dummy data for scheduled orders
        lastCompletedOrders: 4, // Dummy data for last completed orders
    });
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const role = userRole || localStorage.getItem("Role");

    // Dummy order statuses for customer
    const orderStatuses = [
        "Order Placed",
        "Processing",
        "Out for Delivery",
        "Delivered"
    ];

    useEffect(() => {
        if (!role) return; // Don't make an API call if the role is missing

        axios.get(`/api/dashboard-stats?role=${role}`)
            .then((response) => {
                const responseData = response.data || {};
                setStats({
                    orders: responseData.orders || 0,
                    pendingDeliveries: responseData.pendingDeliveries || 0,
                    outlets: responseData.outlets || 0,
                    stock: responseData.stock || 0,
                    totalSales: responseData.totalSales || 1000, // Fallback to dummy data
                    recentDeliveries: responseData.recentDeliveries || 3, // Fallback to dummy data
                    scheduledOrders: responseData.scheduledOrders || 2, // Fallback to dummy data
                    lastCompletedOrders: responseData.lastCompletedOrders || 4, // Fallback to dummy data
                });

                setChartData({
                    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    datasets: [
                        {
                            label: "Orders this week",
                            data: responseData.dailyOrders || [8, 5, 2, 9, 1, 4, 3],
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
                {/* Customer Dashboard */}
                {role === "consumer" && (
                    <div className="bg-white p-6 shadow-md rounded">
                        <h3 className="text-xl font-bold">Your Orders</h3>
                        <p className="text-3xl">{stats.orders}</p>
                        <h4 className="text-lg font-semibold mt-4">Order Status:</h4>
                        <ul className="mt-2">
                            {orderStatuses.map((status, index) => (
                                <li key={index} className="flex items-center mb-2">
                                    <span className={`inline-block w-3 h-3 rounded-full ${index <= stats.orders - 1 ? "bg-green-500" : "bg-gray-400"}`} />
                                    <span className="ml-2">{status}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Scheduled Orders */}
                        <div className="mt-6">
                            <h4 className="text-lg font-semibold">Scheduled Orders</h4>
                            <p className="text-3xl">{stats.scheduledOrders}</p>
                        </div>

                        {/* Last Completed Orders */}
                        <div className="mt-6">
                            <h4 className="text-lg font-semibold">Last Completed Orders</h4>
                            <p className="text-3xl">{stats.lastCompletedOrders}</p>
                        </div>
                    </div>
                )}

                {/* Outlet Manager Dashboard */}
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
                        {/* Additional Outlet Manager Info */}
                        <div className="bg-white p-6 shadow-md rounded">
                            <h3 className="text-xl font-bold">Total Sales</h3>
                            <p className="text-3xl">${stats.totalSales}</p>
                        </div>
                        <div className="bg-white p-6 shadow-md rounded">
                            <h3 className="text-xl font-bold">Recent Deliveries</h3>
                            <p className="text-3xl">{stats.recentDeliveries}</p>
                        </div>

                        {/* Scheduled Orders */}
                        <div className="bg-white p-6 shadow-md rounded">
                            <h3 className="text-xl font-bold">Scheduled Orders</h3>
                            <p className="text-3xl">{stats.scheduledOrders}</p>
                        </div>

                        {/* Last Completed Orders */}
                        <div className="bg-white p-6 shadow-md rounded">
                            <h3 className="text-xl font-bold">Last Completed Orders</h3>
                            <p className="text-3xl">{stats.lastCompletedOrders}</p>
                        </div>
                    </>
                )}

                {/* Admin Dashboard */}
                {role === "admin" && (
                    <>
                        <div className="bg-white p-6 shadow-md rounded">
                            <h3 className="text-xl font-bold">Total Outlets</h3>
                            <p className="text-3xl">{stats.outlets}</p>
                        </div>
                        <div className="bg-white p-6 shadow-md rounded">
                            <h3 className="text-xl font-bold">Stock Across Outlets</h3>
                            <p className="text-3xl">200</p>
                        </div>
                    </>
                )}

                {/* Admin Weekly Orders Trend */}
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
