import React, { useState } from 'react';
import './loginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    const data = {
      username: username,
      password: password
    };

    fetch('http://localhost:3001/auth/webLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      if (data.authenticated) {
        localStorage.setItem('jwtToken', data.token);
        setLoggedIn(true);
        navigate('/');  // Navigate to the dashboard
      } else {
        alert(data.error || "Login failed");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleLogin} className="login-form">
          <input 
            type="text" 
            placeholder="Username"
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            className="login-input" 
          />
          <input 
            type="password" 
            placeholder="Password"
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            className="login-input" 
          />
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
