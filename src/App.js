import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import styles from './Dashboard.module.css';
import MapView from './components/map_view';
import UserManagement from './components/user_management';
import LoginPage from './components/login_page';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    console.log("isLoggedIn state changed:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} />} />
          <Route path="/map" element={isLoggedIn ? <MapView /> : <Navigate to="/login" />} />
          <Route path="/user_management" element={isLoggedIn ? <UserManagement /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

const Dashboard = () => (
  <div className={styles['dashboard-container']}>
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
            <button className={styles["UserManagementButton"]}>
              User Management
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default App;
