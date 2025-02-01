// src/page/OrderTracking.jsx
import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import "./OrderTracking.css"; // Assuming you have some custom CSS for this page

const OrderTracking = () => {
  const [orders, setOrders] = useState([
    { token: '001', type: '12.5 kg', status: 'pending' },
    { token: '002', type: '5 kg', status: 'processing' },
  ]);

  const handleCancel = (token) => {
    setOrders(orders.filter((order) => order.token !== token));
  };

  return (
    <DashboardLayout title="Order Tracking">
      <table className="orders-table w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Token</th>
            <th className="p-2 border">Cylinder Type</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.token} className="text-center">
              <td className="p-2 border">{order.token}</td>
              <td className="p-2 border">{order.type}</td>
              <td className="p-2 border">{order.status}</td>
              <td className="p-2 border">
                <button
                  className="cancel-btn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleCancel(order.token)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
};

export default OrderTracking;
