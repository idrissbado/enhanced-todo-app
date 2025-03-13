import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, toggleTheme } from './redux/actions';
import { FaSignOutAlt, FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const username = useSelector(state => state.auth.username);
  const darkMode = useSelector(state => state.theme.darkMode);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="app-header">
      <div className="header-logo">
        <h1>Task Manager</h1>
      </div>
      
      <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
      
      <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li className={location.pathname === '/dashboard' ? 'active' : ''}>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          </li>
          <li className={location.pathname === '/tasks' ? 'active' : ''}>
            <Link to="/tasks" onClick={() => setMenuOpen(false)}>Tasks</Link>
          </li>
        </ul>
      </nav>
      
      <div className="header-actions">
        <button className="theme-toggle" onClick={handleThemeToggle} aria-label="Toggle theme">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        
        <div className="user-info">
          <span>Hello, {username}</span>
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
