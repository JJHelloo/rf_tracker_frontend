import React, { useState } from 'react';
import './userManagement.css';

const AddAppUser = ({ onUserAdded }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [messageColor, setMessageColor] = useState('black'); // Default message color

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lowerCaseUsername = username.toLowerCase();
  // Prepare the data
  const data = {
    firstName,
    lastName,
    username: lowerCaseUsername,
    password
  };

    // Make the API call
    const response = await fetch('http://localhost:3001/users/api/addAppUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      setMessage('App User added successfully');
      setMessageColor('green');  // Set message color to green for success
      // onUserAdded('App User added successfully');
    } else {
      setMessage('Failed to add App User');
      setMessageColor('red');  // Set message color to red for failure
      // onUserAdded('Failed to add App User');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-user-form-container">
      <h2 className="add-user-form-title">Add App User</h2>
      <input 
        type="text" 
        placeholder="First Name" 
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        className="add-user-input"
      />
      <input 
        type="text" 
        placeholder="Last Name" 
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        className="add-user-input"
      />
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
      <button type="submit" className="add-user-button">Add App User</button>
      {message && <div style={{ color: messageColor }}>{message}</div>}
    </form>
  );
};

export default AddAppUser;
