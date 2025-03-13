import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from './redux/actions';
import { FaPlus, FaTags, FaExclamationCircle } from 'react-icons/fa';

const AddTask = () => {
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('medium');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const categories = [
    'Work', 'Personal', 'Shopping', 'Health', 
    'Finance', 'Education', 'Home', 'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!description.trim()) {
      setError('Task description is required');
      return;
    }
    
    // Create a new task with a unique ID
    const newTask = {
      id: Date.now(),
      description: description.trim(),
      isDone: false,
      dueDate: dueDate || null,
      category: category || 'Other',
      priority,
      createdAt: new Date().toISOString()
    };
    
    // Check if due date is in the past
    if (dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const taskDate = new Date(dueDate);
      
      if (taskDate < today) {
        newTask.isDone = true; // Automatically mark as done if date is in the past
      }
    }
    
    // Dispatch the addTask action
    dispatch(addTask(newTask));
    
    // Clear the form
    setDescription('');
    setDueDate('');
    setCategory('');
    setPriority('medium');
    setError('');
  };

  return (
    <div className="add-task-container">
      <h3>Add New Task</h3>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="add-task-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="description">Task Description</label>
            <input
              type="text"
              id="description"
              placeholder="What needs to be done?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="task-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="date-input"
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">
              <FaTags className="input-icon" />
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="category-select"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="priority">
              <FaExclamationCircle className="input-icon" />
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="priority-select"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        
        <button type="submit" className="add-button">
          <FaPlus />
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
