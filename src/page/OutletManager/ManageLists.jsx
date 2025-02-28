import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import axios from "axios";

const dummyOutlets = [
  { _id: "1", name: "Outlet A", location: "Colombo", district: "Western", manager: { name: "John Doe" }, contact: "0771234567" },
  { _id: "2", name: "Outlet B", location: "Kandy", district: "Central", manager: { name: "Jane Smith" }, contact: "0777654321" }
];

const dummyUsers = [
  { _id: "1", name: "Alice Brown", email: "alice@example.com", role: "Admin", phone: "0711234567" },
  { _id: "2", name: "Bob Green", email: "bob@example.com", role: "Manager", phone: "0757654321" }
];

const dummyOrders = [
  { _id: "1", customerName: "Charlie White", totalAmount: 150.00, status: "Completed", date: "2024-02-28T12:30:00Z" },
  { _id: "2", customerName: "Diana Black", totalAmount: 250.00, status: "Pending", date: "2024-02-27T10:15:00Z" }
];

const ManageLists = () => {
  const [outlets, setOutlets] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState({ outlets: true, users: true, orders: true });
  const [error, setError] = useState("");
  const [usingDummyData, setUsingDummyData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [outletRes, userRes, orderRes] = await Promise.all([
          axios.get("http://localhost:5003/api/outlets/public"),
          axios.get("http://localhost:5003/api/admin/users"),
          axios.get("http://localhost:5003/api/stock/schedule"),
        ]);
        setOutlets(outletRes.data || []);
        setUsers(userRes.data || []);
        setOrders(orderRes.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch live data. Using dummy data.");
        setUsingDummyData(true);
        setOutlets(dummyOutlets);
        setUsers(dummyUsers);
        setOrders(dummyOrders);
      } finally {
        setLoading({ outlets: false, users: false, orders: false });
      }
    };
    fetchData();
  }, []);

  return (
    <DashboardLayout title="Manage Lists">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        {error && <div className="text-yellow-600 bg-yellow-100 p-3 rounded-md mb-4">{error}</div>}

        {/* Outlets Table */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Outlets</h2>
          {loading.outlets ? (
            <p>Loading outlets...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Location</th>
                    <th className="border p-2">District</th>
                    <th className="border p-2">Manager</th>
                    <th className="border p-2">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {outlets.map((outlet) => (
                    <tr key={outlet._id} className="border">
                      <td className="border p-2">{outlet.name}</td>
                      <td className="border p-2">{outlet.location}</td>
                      <td className="border p-2">{outlet.district}</td>
                      <td className="border p-2">{outlet.manager?.name || "Not assigned"}</td>
                      <td className="border p-2">{outlet.contact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Users Table */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Users</h2>
          {loading.users ? (
            <p>Loading users...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Role</th>
                    <th className="border p-2">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border">
                      <td className="border p-2">{user.name}</td>
                      <td className="border p-2">{user.email}</td>
                      <td className="border p-2">{user.role}</td>
                      <td className="border p-2">{user.phone || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Orders Table */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Orders</h2>
          {loading.orders ? (
            <p>Loading orders...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">Order ID</th>
                    <th className="border p-2">Customer</th>
                    <th className="border p-2">Total Amount</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border">
                      <td className="border p-2">{order._id}</td>
                      <td className="border p-2">{order.customerName}</td>
                      <td className="border p-2">${order.totalAmount.toFixed(2)}</td>
                      <td className="border p-2">{order.status}</td>
                      <td className="border p-2">{new Date(order.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default ManageLists;
