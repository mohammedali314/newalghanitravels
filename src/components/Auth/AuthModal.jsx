import React, { useState } from 'react';
import './authModal.scss';
import { FaTimes, FaUser, FaLock, FaEnvelope, FaFacebookF, FaGoogle } from 'react-icons/fa';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="authModal">
      <div className="overlay" onClick={onClose}></div>
      <div className="modalContent">
        <button className="closeBtn" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="modalHeader">
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Login to access your account' : 'Sign up for a new account'}</p>
        </div>

        <div className="socialLogin">
          <button className="socialBtn facebook">
            <FaFacebookF /> Continue with Facebook
          </button>
          <button className="socialBtn google">
            <FaGoogle /> Continue with Google
          </button>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="inputGroup">
              <FaUser className="icon" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="inputGroup">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputGroup">
            <FaLock className="icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {isLogin && (
            <div className="forgotPassword">
              <a href="#">Forgot Password?</a>
            </div>
          )}

          <button type="submit" className="submitBtn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="switchMode">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal; 