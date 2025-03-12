import TaskItem from "./TaskItem"

// TaskList component displays the list of tasks
function TaskList({ tasks, deleteTask, toggleComplete, startEdit }) {
  // If there are no tasks, display a message
  if (tasks.length === 0) {
    return <div className="empty-list">No tasks to display</div>
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
          startEdit={startEdit}
        />
      ))}
    </div>
  )
}

export default TaskList

