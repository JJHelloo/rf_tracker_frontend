import React from 'react';
import './Toast.css';  // Assuming you have a CSS file for styling

const Toast = ({ message, isSuccess }) => {
  const toastClass = isSuccess ? 'toast-success' : 'toast-error';
  
  return (
    <div className={`toast ${toastClass}`}>
      {message}
    </div>
  );
};

export default Toast;
