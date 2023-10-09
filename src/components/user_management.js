import React, { useState } from 'react';
import AddWebUser from './AddWebUser';
import AddAppUser from './AddAppUser';
import './addUsers.css';
import Toast from './Toast';

const UserManagement = () => {
  const [showWebUserForm, setShowWebUserForm] = useState(false);
  const [showAppUserForm, setShowAppUserForm] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleWebUserClick = () => {
    setShowWebUserForm(true);
    setShowAppUserForm(false);
  };

  const handleAppUserClick = () => {
    setShowAppUserForm(true);
    setShowWebUserForm(false);
  };

  const handleUserAdded = (message) => {
    setToastMessage(message);
  };

  return (
    <div className="user-management-container">
      <button className="user-management-button" onClick={handleWebUserClick}>Add Web User</button>
      <button className="user-management-button" onClick={handleAppUserClick}>Add App User</button>
  
      {showWebUserForm && <AddWebUser onUserAdded={handleUserAdded} />}
      {showAppUserForm && <AddAppUser onUserAdded={handleUserAdded} />}
      
      {toastMessage && <div className="toast-message">{toastMessage}</div>}
    </div>
  );
  
};

export default UserManagement;
