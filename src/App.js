"use client"

import { useState, useEffect } from "react"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
// Import the simplified statistics component instead
import SimplifiedStatistics from "./components/SimplifiedStatistics"
import ThemeToggle from "./components/ThemeToggle"
import "./App.css"

function App() {
  // State for tasks
  const [tasks, setTasks] = useState([])
  // State for task being edited
  const [editTask, setEditTask] = useState(null)
  // State for filter
  const [filter, setFilter] = useState("all")
  // State for category filter
  const [categoryFilter, setCategoryFilter] = useState("all")
  // State for view mode (list or statistics)
  const [view, setView] = useState("list")

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks")
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  // Add a new task
  const addTask = (task) => {
    setTasks([
      ...tasks,
      {
        ...task,
        id: Date.now(),
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null,
      },
    ])
  }

  // Delete a task with confirmation
  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== id))
    }
  }

  // Toggle task completion status
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date().toISOString() : null,
            }
          : task,
      ),
    )
  }

  // Set a task for editing
  const startEdit = (task) => {
    setEditTask(task)
  }

  // Update a task
  const updateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    setEditTask(null)
  }

  // Cancel editing
  const cancelEdit = () => {
    setEditTask(null)
  }

  // Get unique categories from tasks
  const categories = ["all", ...new Set(tasks.map((task) => task.category).filter(Boolean))]

  // Filter tasks based on completion status and category
  const filteredTasks = tasks.filter((task) => {
    // Filter by completion status
    const statusMatch = filter === "all" ? true : filter === "active" ? !task.completed : task.completed

    // Filter by category
    const categoryMatch = categoryFilter === "all" ? true : task.category === categoryFilter

    return statusMatch && categoryMatch
  })

  // Sort tasks by due date (if present)
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!a.dueDate) return 1
    if (!b.dueDate) return -1
    return new Date(a.dueDate) - new Date(b.dueDate)
  })

  return (
    <div className="app-container animate-fade-in">
      <header className="app-header">
        <div className="header-left">
          <h1>Task Manager</h1>
        </div>
        <div className="header-right">
          <div className="view-toggle">
            <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}>
              Task List
            </button>
            <button className={view === "stats" ? "active" : ""} onClick={() => setView("stats")}>
              Statistics
            </button>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {view === "list" ? (
        <>
          <div className="filter-container animate-slide-up">
            <div className="filter-section">
              <h3>Status</h3>
              <div className="filter-controls">
                <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
                  All
                </button>
                <button className={filter === "active" ? "active" : ""} onClick={() => setFilter("active")}>
                  Active
                </button>
                <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>
                  Completed
                </button>
              </div>
            </div>

            {categories.length > 1 && (
              <div className="filter-section">
                <h3>Category</h3>
                <div className="filter-controls category-filters">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={categoryFilter === category ? "active" : ""}
                      onClick={() => setCategoryFilter(category)}
                    >
                      {category === "all" ? "All" : category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <TaskForm addTask={addTask} editTask={editTask} updateTask={updateTask} cancelEdit={cancelEdit} />

          <TaskList tasks={sortedTasks} deleteTask={deleteTask} toggleComplete={toggleComplete} startEdit={startEdit} />

          <div className="task-stats">
            <p>{tasks.filter((task) => !task.completed).length} tasks remaining</p>
          </div>
        </>
      ) : (
        <SimplifiedStatistics tasks={tasks} />
      )}
    </div>
  )
}

export default App

