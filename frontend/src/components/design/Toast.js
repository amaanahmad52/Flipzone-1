// Toast.js
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = ({ message, type }) => {
  const showToast = () => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      // Add more cases for different toast types if needed
      default:
        toast(message);
    }
  };

  return (
    <>
      <ToastContainer />
      {showToast()}
    </>
  );
};

export default Toast;
