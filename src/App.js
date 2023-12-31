import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import MapView from './components/map_view';
import UserManagement from './components/user_management';
import LoginPage from './components/login_page';
import jwt_decode from "jwt-decode";

let isAdmin = false;

function App() {
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const token = localStorage.getItem('jwtToken');

  if (token) {
    const decodedToken = jwt_decode(token);
    isAdmin = decodedToken.isAdmin;
  }

  useEffect(() => {
    console.log("isLoggedIn state changed:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Dashboard setLoggedIn={setLoggedIn} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} />} />
          <Route path="/map" element={isLoggedIn ? <MapView /> : <Navigate to="/login" />} />
          <Route path="/user_management" element={isLoggedIn ? <UserManagement /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

const Dashboard = ({ setLoggedIn }) => {
  const navigate = useNavigate();  // Now it's safe to use
  
  const handleLogout = () => {  // Add this function
    localStorage.removeItem('jwtToken');  // Remove token
    setLoggedIn(false);  // Update state
    navigate('/login');  // Navigate to login
  };

  return (
    <div className={styles['dashboard-container']}>
      <button onClick={handleLogout} className={styles["global-logout-button"]}>Logout</button> {/* Global Logout Button */}
      <div className={styles['dashboard-card']}>
        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>
        <div className={styles['dashboard-card-content']}>
          <div className={styles['dashboard-card-button']}>
            <Link to="/map">
              <button className={styles["GoToMapButton"]}>
                RF Devices
              </button>
            </Link>
          </div>
          <div className={styles['dashboard-card-button']}>
            <Link to="/user_management">
              <button 
                disabled={!isAdmin} 
                className={styles["UserManagementButton"]}
                onContextMenu={(e) => { if (!isAdmin) e.preventDefault(); }}
              >
                User Management
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
