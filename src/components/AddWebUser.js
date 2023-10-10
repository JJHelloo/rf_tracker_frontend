import React, { useState } from 'react';
import './userManagement.css';

const AddWebUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Default isAdmin status
  const [message, setMessage] = useState(null);
  const [messageColor, setMessageColor] = useState('black'); // Default message color
  const token = localStorage.getItem('jwtToken');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const lowerCaseUsername = username.toLowerCase();
    const lowerCaseEmail = email.toLowerCase();
  // Prepare the data
  const data = {
    username: lowerCaseUsername,
    password,
    email: lowerCaseEmail,
    isAdmin
  };

    // Make an API call to add the user
    try {
      const response = await fetch('http://localhost:3001/users/api/addWebUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (result.success) {
        setMessage('User added successfully');
        setMessageColor('green'); // Set message color to green for success
      } else {
        setMessage('Failed to add user');
        setMessageColor('red'); // Set message color to red for failure
      }
    } catch (error) {
      console.error('There was a problem with the request', error);
      setMessage('An error occurred');
      setMessageColor('red'); // Set message color to red for errors
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-user-form-container">
      <h2 className="add-user-form-title">Add Web User</h2>
      <input 
        type="text" 
        placeholder="Username" 
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="add-user-input"
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="add-user-input"
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="add-user-input"
      />
      <label>Is Admin:</label>
      <input 
        type="checkbox" 
        checked={isAdmin}
        onChange={e => setIsAdmin(e.target.checked)}
      />
      <button type="submit" className="add-user-button">Add Web User</button>
      {message && <div style={{ color: messageColor }}>{message}</div>}
    </form>
  );
};

export default AddWebUser;
