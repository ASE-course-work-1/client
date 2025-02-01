import React, { useState } from 'react';
import './OrderTracking.css';

const OrderTracking = () => {
  const [orders, setOrders] = useState([
    { token: '001', type: '12.5 kg', status: 'pending' },
    { token: '002', type: '5 kg', status: 'processing' }
  ]);

  const handleCancel = (token) => {
    setOrders(orders.filter(order => order.token !== token));
  };

  return (
    <div className="tracking-container">
      <header className="tracking-header">
        <h2>Gse by Gse</h2>
      </header>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Token</th>
            <th>Cylinder Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.token}>
              <td>{order.token}</td>
              <td>{order.type}</td>
              <td>{order.status}</td>
              <td>
                <button
                  className="cancel-btn"
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
  );
};

export default OrderTracking;