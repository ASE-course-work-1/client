// src/page/OrderTracking.jsx
import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

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
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white border-collapse shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border">Token</th>
              <th className="px-4 py-2 border">Cylinder Type</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.token} className="text-center">
                <td className="px-4 py-2 border">{order.token}</td>
                <td className="px-4 py-2 border">{order.type}</td>
                <td className="px-4 py-2 border">{order.status}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => handleCancel(order.token)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default OrderTracking;
