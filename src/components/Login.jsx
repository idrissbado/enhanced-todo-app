import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './redux/actions';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }
    
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Extract username from email (part before @)
    const username = email.split('@')[0];
    
    // Dispatch login action
    dispatch(login(email, username));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Task Manager</h1>
        <h2>Login</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-icon">
              <FaUser />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div className="form-group">
            <div className="input-icon">
              <FaLock />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <button type="submit" className="login-button">Login</button>
        </form>
        
        <div className="login-footer">
          <p>For demo purposes, any email and password will work.</p>
          <p>Your username will be extracted from your email.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
