

import './App.css'

import { Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import Login from './page/Login';

function App() {

  return (
 
    <div>
    {/* <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav> */}

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
  </div>

  )
}

export default App
