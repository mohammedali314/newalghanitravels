import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';
import './NotFound.scss';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="notfound-container">
      <div className="notfound-icon"><FiAlertTriangle size={64} /></div>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist or has been moved.</p>
      <button className="notfound-btn" onClick={() => navigate('/')}>Go to Homepage</button>
    </div>
  );
};

export default NotFound; 