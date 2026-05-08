import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated, isHR } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          ATS System
        </Link>
        <ul className="navbar-nav">
          <li><Link to="/">Jobs</Link></li>
          {!isAuthenticated ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          ) : (
            <>
              {isHR ? (
                <li><Link to="/hr-dashboard">HR Dashboard</Link></li>
              ) : (
                <li><Link to="/dashboard">My Dashboard</Link></li>
              )}
              <li><Link to="/profile">Profile</Link></li>
              <li>
                <span style={{ marginRight: '10px', color: '#2563eb' }}>
                  {user?.name}
                </span>
              </li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
