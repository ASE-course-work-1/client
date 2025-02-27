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

// Admin pages
import CreateOutlet from "./page/AdminOnly/CreateOutlet";
import CreateManager from "./page/AdminOnly/CreateManager";
import AssignManager from "./page/AdminOnly/AssignManager";
import AdminDashboard from "./page/AdminOnly/AdminDashboard";


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

          {/* Admin routes */}
          <Route path="/admin/createoutlet" element={<CreateOutlet />} />
        <Route path="/admin/createmanager" element={<CreateManager />} />
        <Route path="/admin/assignmanager" element={<AssignManager />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
