import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', company: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/auth/register', form);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} style={{maxWidth: 400, margin: '2rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(59,130,246,0.10)', padding: '2rem'}}>
      <h2 style={{fontWeight: 900, color: '#2563eb'}}>Register as Agent</h2>
      <input name="name" placeholder="Name" onChange={handleChange} required style={{marginBottom: 12, width: '100%', padding: 8}} />
      <input name="email" placeholder="Email" onChange={handleChange} required style={{marginBottom: 12, width: '100%', padding: 8}} />
      <input name="company" placeholder="Company" onChange={handleChange} required style={{marginBottom: 12, width: '100%', padding: 8}} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required style={{marginBottom: 12, width: '100%', padding: 8}} />
      <button type="submit" style={{background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontWeight: 700}}>Register</button>
    </form>
  );
};

export default Register; 