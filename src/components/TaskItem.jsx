"use client"

// Function to format date
const formatDate = (dateString) => {
  if (!dateString) return null

  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Function to determine if a task is overdue
const isOverdue = (dueDate, completed) => {
  if (!dueDate || completed) return false
  return new Date(dueDate) < new Date()
}

// TaskItem component represents a single task in the list
function TaskItem({ task, deleteTask, toggleComplete, startEdit }) {
  const overdue = isOverdue(task.dueDate, task.completed)

  // Get priority class
  const getPriorityClass = () => {
    switch (task.priority) {
      case "high":
        return "priority-high"
      case "low":
        return "priority-low"
      default:
        return "priority-medium"
    }
  }

  return (
    <div className={`task-item ${task.completed ? "completed" : ""} ${overdue ? "overdue" : ""}`}>
      <div className="task-content">
        <div className="task-header">
          <div className="task-title-area">
            <h3>{task.name}</h3>
            <div className="task-meta">
              {task.category && <span className="task-category">{task.category}</span>}
              <span className={`task-priority ${getPriorityClass()}`}>{task.priority}</span>
            </div>
          </div>
          <div className="task-actions">
            <button
              className="btn-toggle"
              onClick={() => toggleComplete(task.id)}
              aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              {task.completed ? "✓" : "○"}
            </button>
            <button className="btn-edit" onClick={() => startEdit(task)} aria-label="Edit task">
              ✎
            </button>
            <button className="btn-delete" onClick={() => deleteTask(task.id)} aria-label="Delete task">
              ×
            </button>
          </div>
        </div>
        <p className="task-description">{task.description}</p>

        <div className="task-footer">
          {task.dueDate && (
            <div className="task-due-date">
              <span className="label">Due:</span>
              <span className={overdue ? "overdue-text" : ""}>
                {formatDate(task.dueDate)}
                {overdue && " (Overdue)"}
              </span>
            </div>
          )}
          {task.completed && task.completedAt && (
            <div className="task-completed-date">
              <span className="label">Completed:</span> {formatDate(task.completedAt)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskItem

