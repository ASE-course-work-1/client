// src/components/DashboardLayout.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const DashboardLayout = ({ title, children }) => {
  // Get the user's role from localStorage
  const role = localStorage.getItem("Role");
  const navigate = useNavigate();

  // Consumer-specific navigation
  const consumerNavLinks =
    role === "consumer"
      ? [
          { to: "/dashboard", label: "Dashboard" },
          { to: "/createorder", label: "Create Order" },
          { to: "/ordertracking", label: "Order Tracking" },
        ]
      : [];

  // Admin-specific navigation
  const adminNavLinks =
    role === "admin"
      ? [
          { to: "/admin/dashboard", label: "Dashboard" },
          { to: "/admin/createoutlet", label: "Create Outlet" },
          { to: "/admin/createmanager", label: "Create Manager" },
          { to: "/admin/assignmanager", label: "Assign Manager" },
          { to: "/admin/stock", label: "Manage Stock" },
        ]
      : [];

  const navLinks = role === "consumer" ? consumerNavLinks : role === "admin" ? adminNavLinks : [];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white p-6 flex flex-col justify-between">
        <div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold">GasByGas Dashboard</h1>
          </div>
          <nav>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      isActive
                        ? "block px-4 py-2 rounded bg-blue-600"
                        : "block px-4 py-2 rounded hover:bg-blue-700"
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 mt-8"
        >
          Logout
        </button>
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
