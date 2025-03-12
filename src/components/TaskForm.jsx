"use client"

import { useState, useEffect } from "react"

// Predefined categories
const CATEGORIES = ["Work", "Personal", "Shopping", "Health", "Finance", "Education", "Home", "Other"]

// TaskForm component handles both adding new tasks and editing existing ones
function TaskForm({ addTask, editTask, updateTask, cancelEdit }) {
  // State for form fields
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [priority, setPriority] = useState("medium")
  // State for validation errors
  const [errors, setErrors] = useState({})

  // When editTask changes, populate form with task data
  useEffect(() => {
    if (editTask) {
      setName(editTask.name)
      setDescription(editTask.description)
      setCategory(editTask.category || "")
      setDueDate(editTask.dueDate ? new Date(editTask.dueDate).toISOString().split("T")[0] : "")
      setPriority(editTask.priority || "medium")
      setErrors({})
    }
  }, [editTask])

  // Validate form fields
  const validateForm = () => {
    const newErrors = {}
    if (!name.trim()) newErrors.name = "Task name is required"
    if (!description.trim()) newErrors.description = "Description is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      const taskData = {
        name: name.trim(),
        description: description.trim(),
        category: category || "Other",
        priority,
        dueDate: dueDate || null,
      }

      if (editTask) {
        // Update existing task
        updateTask({
          ...editTask,
          ...taskData,
        })
      } else {
        // Add new task
        addTask(taskData)
      }

      // Reset form
      setName("")
      setDescription("")
      setCategory("")
      setDueDate("")
      setPriority("medium")
      setErrors({})
    }
  }

  // Handle cancel button click
  const handleCancel = () => {
    cancelEdit()
    setName("")
    setDescription("")
    setCategory("")
    setDueDate("")
    setPriority("medium")
    setErrors({})
  }

  return (
    <div className="task-form-container">
      <h2>{editTask ? "Edit Task" : "Add New Task"}</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="taskName">Task Name:</label>
            <input
              type="text"
              id="taskName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? "error" : ""}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="taskCategory">Category:</label>
            <select id="taskCategory" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="taskDueDate">Due Date:</label>
            <input type="date" id="taskDueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="taskPriority">Priority:</label>
            <select id="taskPriority" value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="taskDescription">Description:</label>
          <textarea
            id="taskDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={errors.description ? "error" : ""}
          />
          {errors.description && <div className="error-message">{errors.description}</div>}
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-submit">
            {editTask ? "Update Task" : "Add Task"}
          </button>
          {editTask && (
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default TaskForm

