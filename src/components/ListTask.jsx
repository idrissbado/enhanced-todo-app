import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Task from './Task';
import { filterTasks } from './redux/actions';
import { FaFilter, FaSearch, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

const ListTask = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const filter = useSelector(state => state.tasks.filter);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortDirection, setSortDirection] = useState('asc');
  const dispatch = useDispatch();

  // Get unique categories from tasks
  const categories = ['all', ...new Set(tasks.map(task => task.category).filter(Boolean))];
  
  // Filter tasks based on multiple criteria
  const filteredTasks = tasks.filter(task => {
    // Filter by completion status
    const statusMatch = 
      filter === 'all' ? true : 
      filter === 'done' ? task.isDone : 
      !task.isDone;
    
    // Filter by category
    const categoryMatch = 
      categoryFilter === 'all' ? true : 
      task.category === categoryFilter;
    
    // Filter by priority
    const priorityMatch = 
      priorityFilter === 'all' ? true : 
      task.priority === priorityFilter;
    
    // Filter by search term
    const searchMatch = 
      !searchTerm.trim() ? true : 
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return statusMatch && categoryMatch && priorityMatch && searchMatch;
  });
  
  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      // Handle null due dates
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      
      const dateComparison = new Date(a.dueDate) - new Date(b.dueDate);
      return sortDirection === 'asc' ? dateComparison : -dateComparison;
    }
    
    if (sortBy === 'priority') {
      const priorityValues = { high: 3, medium: 2, low: 1 };
      const priorityComparison = priorityValues[a.priority] - priorityValues[b.priority];
      return sortDirection === 'asc' ? priorityComparison : -priorityComparison;
    }
    
    if (sortBy === 'alphabetical') {
      const textComparison = a.description.localeCompare(b.description);
      return sortDirection === 'asc' ? textComparison : -textComparison;
    }
    
    return 0;
  });

  const handleFilterChange = (newFilter) => {
    dispatch(filterTasks(newFilter));
  };
  
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="list-task-container">
      <div className="task-filters">
        <div className="filter-section">
          <h4>Status</h4>
          <div className="filter-buttons">
            <button 
              className={filter === 'all' ? 'active' : ''} 
              onClick={() => handleFilterChange('all')}
            >
              All
            </button>
            <button 
              className={filter === 'done' ? 'active' : ''} 
              onClick={() => handleFilterChange('done')}
            >
              Completed
            </button>
            <button 
              className={filter === 'notDone' ? 'active' : ''} 
              onClick={() => handleFilterChange('notDone')}
            >
              Pending
            </button>
          </div>
        </div>
        
        <div className="search-section">
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>
      
      <div className="advanced-filters">
        <div className="filter-group">
          <label>
            <FaFilter />
            Category:
          </label>
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label>
            <FaFilter />
            Priority:
          </label>
          <select 
            value={priorityFilter} 
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>
            {sortDirection === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
            Sort by:
          </label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
          <button 
            className="sort-direction-toggle" 
            onClick={toggleSortDirection}
            aria-label={`Sort ${sortDirection === 'asc' ? 'ascending' : 'descending'}`}
          >
            {sortDirection === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
          </button>
        </div>
      </div>
      
      <div className="tasks-list">
        {sortedTasks.length === 0 ? (
          <div className="no-tasks">
            <p>No tasks match your filters</p>
          </div>
        ) : (
          sortedTasks.map(task => (
            <Task key={task.id} task={task} />
          ))
        )}
      </div>
      
      <div className="task-summary">
        <p>Showing {sortedTasks.length} of {tasks.length} tasks</p>
      </div>
    </div>
  );
};

export default ListTask;
