import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TaskManager from './components/TaskManager';
import Header from './components/Header';
import { checkTaskDates } from './components/redux/actions';
import './App.css';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  
  // Check task dates periodically to auto-mark completed tasks
  useEffect(() => {
    dispatch(checkTaskDates());
    
    // Check task dates every hour
    const interval = setInterval(() => {
      dispatch(checkTaskDates());
    }, 3600000); // 1 hour
    
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <Header />}
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/tasks" element={isAuthenticated ? <TaskManager /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
