// App.jsx
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import Login from './page/Login';
import Dashboard from './page/Dashboard';
import OutDash from './page/OutletDashboard';
import AdminPanel from './page/AdminPanel';
import OrderTracking from './page/OrderTracking;';
import CreateOrder from './page/CreateOrder';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/outlet" element={<OutDash />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/ordertracking" element={<OrderTracking />} />
        <Route path="/createorder" element={<CreateOrder />} />
      </Routes>
    </div>
  );
}

export default App;
