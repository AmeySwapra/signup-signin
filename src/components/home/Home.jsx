import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';  

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    navigate('/signin');
  };

  return (
    <div className="home-container">
      <h2>Welcome, {user?.name}</h2>
      <p>Email: {user?.email}</p>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default Home;




