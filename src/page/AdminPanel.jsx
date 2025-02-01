import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Replace with your actual admin API endpoint
                const response = await axios.get("http://your-api-url/api/admin/users", {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
                    },
                });
                setUsers(response.data.users);
            } catch (err) {
                setError("Error fetching users.");
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="min-h-screen p-8 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <p>Manage users, orders, and system settings from here.</p>
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-2">Registered Users:</h2>
                {users.length === 0 ? (
                    <p>No users found.</p>
                ) : (
                    <ul>
                        {users.map((user) => (
                            <li key={user.userID} className="mb-2 p-4 bg-white rounded shadow">
                                <p>
                                    <strong>Name:</strong> {user.name}
                                </p>
                                <p>
                                    <strong>Email:</strong> {user.email}
                                </p>
                                <p>
                                    <strong>Role:</strong> {user.role}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
