// src/components/DashboardLayout.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const DashboardLayout = ({ title, children }) => {
    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-800 text-white p-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">GasByGas Dashboard</h1>
                </div>
                <nav>
                    <ul className="space-y-4">
                        <li>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    isActive
                                        ? "block px-4 py-2 rounded bg-blue-600"
                                        : "block px-4 py-2 rounded hover:bg-blue-700"
                                }
                            >
                                Dashboard Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/ordertracking"
                                className={({ isActive }) =>
                                    isActive
                                        ? "block px-4 py-2 rounded bg-blue-600"
                                        : "block px-4 py-2 rounded hover:bg-blue-700"
                                }
                            >
                                Order Tracking
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/adminpanel"
                                className={({ isActive }) =>
                                    isActive
                                        ? "block px-4 py-2 rounded bg-blue-600"
                                        : "block px-4 py-2 rounded hover:bg-blue-700"
                                }
                            >
                                Admin Panel
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/outlet"
                                className={({ isActive }) =>
                                    isActive
                                        ? "block px-4 py-2 rounded bg-blue-600"
                                        : "block px-4 py-2 rounded hover:bg-blue-700"
                                }
                            >
                                Outlet Dashboard
                            </NavLink>
                        </li>
                        {/* Add more navigation links as needed */}
                    </ul>
                </nav>
            </aside>
            {/* Main Content */}
            <main className="flex-1 p-8">
                <h2 className="text-3xl font-bold mb-4">{title}</h2>
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
