import React from 'react';
import './loginPage.css';

const LoginPage = ({ setLoggedIn }) => {
  const handleLogin = () => {
    // Perform authentication here (e.g., API call)
    // If successful, update the login state
    setLoggedIn(true);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleLogin} className="login-form">
          <input type="text" placeholder="Username" className="login-input" />
          <input type="password" placeholder="Password" className="login-input" />
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
