import React, { useState } from 'react';
import './authModal.scss';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ isOpen, onClose, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    companyName: '',
    contactNumber: '',
    role: 'agent'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await axios.post(`http://localhost:5000${endpoint}`, {
        ...formData,
        username: formData.fullName
      });
      // If agent is pending, show review modal and do not set user
      if (response.data.admin.role === 'agent' && response.data.admin.status === 'pending') {
        setShowReviewModal(true);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        return;
      }
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.admin));
      setUser(response.data.admin);
      if (response.data.admin.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
      onClose();
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <>
      {showReviewModal && (
        <div className="reviewModal">
          <div className="reviewModalContent">
            <h3>Your profile is under review.</h3>
            <p>Please wait for admin verification.</p>
            <button onClick={() => { setShowReviewModal(false); onClose(); navigate('/'); }} style={{marginBottom: 10}}>Return to Home</button>
            <button onClick={() => { setShowReviewModal(false); setIsLogin(true); }}>Login</button>
          </div>
        </div>
      )}
      <div className="authModal">
        <div className="modalContent">
          <button className="closeButton" onClick={onClose}>
            <IoClose />
          </button>
          <div className="authHeader">
            <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="subtitle">
              {isLogin ? 'Login to access your account' : 'Sign up for a new account'}
            </p>
          </div>
          {error && (
            <div className="error">
              {error}
              <button className="modalCloseBtn" onClick={onClose} style={{marginTop: 12, display: 'block', width: '100%'}}>Close</button>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="inputGroup">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="inputGroup">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inputGroup">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {!isLogin && (
              <>
                <div className="inputGroup">
                  <label>Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Enter your company name"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="inputGroup">
                  <label>Contact Number</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    placeholder="Enter your contact number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}
            <button 
              type="submit" 
              className="submitButton" 
              disabled={isLoading}
            >
              {isLoading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
          </form>
          <div className="switchMode">
            {isLogin ? (
              <>Don't have an account? <button onClick={() => setIsLogin(false)}>Sign Up</button></>
            ) : (
              <>Already have an account? <button onClick={() => setIsLogin(true)}>Login</button></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModal; 