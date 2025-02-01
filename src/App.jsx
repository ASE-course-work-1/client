// App.jsx
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import Login from './page/Login';
import Dashboard from './page/Dashboard';
import OutDash from './page/OutletDashboard';
import AdminPanel from './page/AdminPanel';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/outdash" element={<OutDash />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

export default App;
