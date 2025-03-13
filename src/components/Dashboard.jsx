import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { FaCheckCircle, FaHourglassHalf, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';

const Dashboard = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const username = useSelector(state => state.auth.username);
  const [timeRange, setTimeRange] = useState('all');
  
  // Filter tasks based on time range
  const getFilteredTasks = () => {
    if (timeRange === 'all') return tasks;
    
    const now = new Date();
    const timeRanges = {
      'week': 7,
      'month': 30,
      'quarter': 90
    };
    
    const cutoffDate = new Date();
    cutoffDate.setDate(now.getDate() - timeRanges[timeRange]);
    
    return tasks.filter(task => {
      const taskDate = task.dueDate ? new Date(task.dueDate) : null;
      return taskDate && taskDate >= cutoffDate;
    });
  };
  
  const filteredTasks = getFilteredTasks();
  
  // Calculate task statistics
  const completedTasks = filteredTasks.filter(task => task.isDone);
  const pendingTasks = filteredTasks.filter(task => !task.isDone);
  const overdueTasks = pendingTasks.filter(task => {
    if (!task.dueDate) return false;
    return new Date(task.dueDate) < new Date();
  });
  
  // Data for pie chart
  const chartData = [
    { name: 'Completed', value: completedTasks.length },
    { name: 'Pending', value: pendingTasks.length - overdueTasks.length },
    { name: 'Overdue', value: overdueTasks.length }
  ].filter(item => item.value > 0);
  
  const COLORS = ['#2ecc71', '#3498db', '#e74c3c'];
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Get tasks due today
  const todayTasks = tasks.filter(task => {
    if (!task.dueDate) return false;
    return task.dueDate === today;
  });
  
  // Get tasks due this week
  const thisWeek = new Date();
  thisWeek.setDate(thisWeek.getDate() + 7);
  const thisWeekTasks = tasks.filter(task => {
    if (!task.dueDate || task.isDone) return false;
    const dueDate = new Date(task.dueDate);
    return dueDate > new Date() && dueDate <= thisWeek;
  });

  return (
    <div className="dashboard-container">
      <div className="dashboard-welcome">
        <h2>Welcome back, {username}!</h2>
        <p>Here's an overview of your tasks</p>
        
        <div className="time-range-selector">
          <label htmlFor="timeRange">Time Range:</label>
          <select 
            id="timeRange" 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
          </select>
        </div>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon completed">
            <FaCheckCircle />
          </div>
          <div className="stat-info">
            <h3>Completed</h3>
            <p className="stat-value">{completedTasks.length}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon pending">
            <FaHourglassHalf />
          </div>
          <div className="stat-info">
            <h3>Pending</h3>
            <p className="stat-value">{pendingTasks.length}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon today">
            <FaCalendarAlt />
          </div>
          <div className="stat-info">
            <h3>Due Today</h3>
            <p className="stat-value">{todayTasks.length}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon overdue">
            <FaExclamationTriangle />
          </div>
          <div className="stat-info">
            <h3>Overdue</h3>
            <p className="stat-value">{overdueTasks.length}</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-charts">
        <div className="chart-container">
          <h3>Task Status Distribution</h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="no-data">No tasks to display</div>
          )}
        </div>
        
        <div className="upcoming-tasks">
          <h3>Upcoming Tasks</h3>
          {thisWeekTasks.length > 0 ? (
            <ul className="task-preview-list">
              {thisWeekTasks.slice(0, 5).map(task => (
                <li key={task.id} className="task-preview-item">
                  <span className="task-preview-description">{task.description}</span>
                  <span className="task-preview-date">{new Date(task.dueDate).toLocaleDateString()}</span>
                </li>
              ))}
              {thisWeekTasks.length > 5 && (
                <li className="task-preview-more">
                  <Link to="/tasks">View {thisWeekTasks.length - 5} more tasks</Link>
                </li>
              )}
            </ul>
          ) : (
            <p className="no-tasks">No upcoming tasks this week</p>
          )}
        </div>
      </div>
      
      <div className="dashboard-actions">
        <Link to="/tasks" className="action-button">
          Manage Tasks
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
