// src/components/DashboardLayout.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const DashboardLayout = ({ title, children }) => {
  // Get the user's role from localStorage
  const role = localStorage.getItem("Role");

  // Define navigation links for consumers and admins
  const consumerNavLinks =
    role === "consumer"
      ? [
          { to: "/dashboard", label: "Dashboard" },
          { to: "/createorder", label: "Create Order" },
          { to: "/ordertracking", label: "Order Tracking" },
        ]
      : [];

  const adminNavLinks =
    role === "admin"
      ? [
          { to: "/dashboard", label: "Dashboard" },
          { to: "/adminpanel", label: "Admin Main Panel" },
          { to: "/admin/createoutlet", label: "Create Outlet" },
          { to: "/admin/createmanager", label: "Create Manager" },
          { to: "/admin/assignmanager", label: "Assign Manager" },
          // { to: "/admin/stock", label: "Manage Stock" },
        ]
      : [];

  const navLinks =
    role === "consumer" ? consumerNavLinks : role === "admin" ? adminNavLinks : [];

  const navigate = useNavigate();
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

DashboardLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node, // 'children' can be any renderable node
};

export default DashboardLayout;
