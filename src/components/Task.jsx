import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTask, editTask, deleteTask } from './redux/actions';
import { FaEdit, FaTrash, FaCalendarAlt, FaTags, FaExclamationCircle, FaSave, FaTimes } from 'react-icons/fa';

const Task = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate || '');
  const [editedCategory, setEditedCategory] = useState(task.category || '');
  const [editedPriority, setEditedPriority] = useState(task.priority || 'medium');
  const dispatch = useDispatch();

  const categories = [
    'Work', 'Personal', 'Shopping', 'Health', 
    'Finance', 'Education', 'Home', 'Other'
  ];

  const handleToggle = () => {
    dispatch(toggleTask(task.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
    }
  };

  const handleSave = () => {
    if (editedDescription.trim()) {
      const updatedTask = {
        ...task,
        description: editedDescription.trim(),
        dueDate: editedDueDate || null,
        category: editedCategory || 'Other',
        priority: editedPriority
      };
      
      // Check if due date is in the past
      if (editedDueDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const taskDate = new Date(editedDueDate);
        
        if (taskDate < today) {
          updatedTask.isDone = true; // Automatically mark as done if date is in the past
        }
      }
      
      dispatch(editTask(updatedTask));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedDescription(task.description);
    setEditedDueDate(task.dueDate || '');
    setEditedCategory(task.category || '');
    setEditedPriority(task.priority || 'medium');
    setIsEditing(false);
  };
  
  // Determine if task is overdue
  const isOverdue = () => {
    if (!task.dueDate || task.isDone) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(task.dueDate) < today;
  };
  
  // Get priority class
  const getPriorityClass = () => {
    switch(task.priority) {
      case 'high': return 'priority-high';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  return (
    <div className={`task-item ${task.isDone ? 'done' : ''} ${isOverdue() ? 'overdue' : ''}`}>
      {isEditing ? (
        <div className="task-edit">
          <div className="edit-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor={`description-${task.id}`}>Description</label>
                <input
                  type="text"
                  id={`description-${task.id}`}
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="edit-input"
                  autoFocus
                />
              </div>
              
              <div className="form-group">
                <label htmlFor={`dueDate-${task.id}`}>
                  <FaCalendarAlt className="input-icon" />
                  Due Date
                </label>
                <input
                  type="date"
                  id={`dueDate-${task.id}`}
                  value={editedDueDate}
                  onChange={(e) => setEditedDueDate(e.target.value)}
                  className="date-input"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor={`category-${task.id}`}>
                  <FaTags className="input-icon" />
                  Category
                </label>
                <select
                  id={`category-${task.id}`}
                  value={editedCategory}
                  onChange={(e) => setEditedCategory(e.target.value)}
                  className="category-select"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor={`priority-${task.id}`}>
                  <FaExclamationCircle className="input-icon" />
                  Priority
                </label>
                <select
                  id={`priority-${task.id}`}
                  value={editedPriority}
                  onChange={(e) => setEditedPriority(e.target.value)}
                  className="priority-select"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="edit-buttons">
            <button onClick={handleSave} className="save-button">
              <FaSave />
              Save
            </button>
            <button onClick={handleCancel} className="cancel-button">
              <FaTimes />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="task-content">
          <div className="task-info">
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={handleToggle}
              className="task-checkbox"
              id={`task-${task.id}`}
            />
            <label htmlFor={`task-${task.id}`} className={`task-description ${task.isDone ? 'completed' : ''}`}>
              {task.description}
            </label>
          </div>
          
          <div className="task-meta">
            {task.dueDate && (
              <span className="task-due-date">
                <FaCalendarAlt />
                {new Date(task.dueDate).toLocaleDateString()}
                {isOverdue() && <span className="overdue-label">Overdue</span>}
              </span>
            )}
            
            {task.category && (
              <span className="task-category">
                <FaTags />
                {task.category}
              </span>
            )}
            
            <span className={`task-priority ${getPriorityClass()}`}>
              <FaExclamationCircle />
              {task.priority}
            </span>
          </div>
          
          <div className="task-actions">
            <button onClick={handleEdit} className="edit-button" aria-label="Edit task">
              <FaEdit />
            </button>
            <button onClick={handleDelete} className="delete-button" aria-label="Delete task">
              <FaTrash />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
