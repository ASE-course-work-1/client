import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Assuming your API endpoint for orders is provided here:
                const response = await axios.get("http://your-api-url/api/orders", {
                    headers: {
                        // Include auth headers if necessary
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
                    },
                });
                setOrders(response.data.orders);
            } catch (err) {
                setError("Error fetching orders.");
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="min-h-screen p-8 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <p>Welcome to your dashboard. Here you can view your gas orders and account details.</p>
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-2">Your Orders:</h2>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <ul>
                        {orders.map((order) => (
                            <li key={order.requestID} className="mb-2 p-4 bg-white rounded shadow">
                                <p>
                                    <strong>Gas Type:</strong> {order.gasType}
                                </p>
                                <p>
                                    <strong>Quantity:</strong> {order.quantity}
                                </p>
                                <p>
                                    <strong>Status:</strong> {order.status}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
