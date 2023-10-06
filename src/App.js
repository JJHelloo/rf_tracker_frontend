import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import MapView from './components/map_view';
import UserManagement from './components/user_management';
import LoginPage from './components/login_page';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Dashboard /> : <LoginPage setLoggedIn={setLoggedIn} />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/user_management" element={<UserManagement />} />
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
              Go to Map
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
