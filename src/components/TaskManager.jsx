import React from 'react';
import AddTask from './AddTask';
import ListTask from './ListTask';

const TaskManager = () => {
  return (
    <div className="task-manager-container">
      <h2>Task Management</h2>
      <AddTask />
      <ListTask />
    </div>
  );
};

export default TaskManager;
