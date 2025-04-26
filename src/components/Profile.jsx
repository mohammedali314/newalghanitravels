import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/');
      return;
    }
    axios.get(`http://localhost:5000/api/profile/me?email=${user.email}`)
      .then(res => {
        setProfile(res.data);
        if (res.data.status !== 'approved') {
          alert('Your account is pending approval. Please wait for admin verification.');
          navigate('/');
        }
      });
  }, [navigate]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-page" style={{maxWidth: 500, margin: '2rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(59,130,246,0.10)', padding: '2rem'}}>
      <h2 style={{fontWeight: 900, color: '#2563eb'}}>My Profile</h2>
      <div><b>Name:</b> {profile.name}</div>
      <div><b>Email:</b> {profile.email}</div>
      <div><b>Company:</b> {profile.company}</div>
      <div><b>Role:</b> {profile.role}</div>
    </div>
  );
};

export default Profile; 