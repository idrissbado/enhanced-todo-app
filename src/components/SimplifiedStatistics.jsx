"use client"

import { useState } from "react"

// A simplified version of the Statistics component without Recharts
function SimplifiedStatistics({ tasks }) {
  const [timeRange, setTimeRange] = useState("all")

  // Filter tasks based on time range
  const getFilteredTasks = () => {
    if (timeRange === "all") return tasks

    const now = new Date()
    const timeRanges = {
      week: 7,
      month: 30,
      quarter: 90,
    }

    const cutoffDate = new Date(now.setDate(now.getDate() - timeRanges[timeRange]))
    return tasks.filter((task) => new Date(task.createdAt) >= cutoffDate)
  }

  const filteredTasks = getFilteredTasks()

  // Count completed and active tasks
  const completedCount = filteredTasks.filter((task) => task.completed).length
  const activeCount = filteredTasks.filter((task) => !task.completed).length

  // Calculate completion rate
  const completionRate = filteredTasks.length > 0 ? Math.round((completedCount / filteredTasks.length) * 100) : 0

  // Calculate average completion time (in days)
  const getAverageCompletionTime = () => {
    const completedTasks = filteredTasks.filter((task) => task.completed && task.completedAt && task.createdAt)

    if (completedTasks.length === 0) return "N/A"

    const totalDays = completedTasks.reduce((sum, task) => {
      const created = new Date(task.createdAt)
      const completed = new Date(task.completedAt)
      const diffTime = Math.abs(completed - created)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return sum + diffDays
    }, 0)

    return (totalDays / completedTasks.length).toFixed(1) + " days"
  }

  // Get category data
  const getCategoryData = () => {
    const categoryMap = {}

    filteredTasks.forEach((task) => {
      const category = task.category || "Uncategorized"
      if (!categoryMap[category]) {
        categoryMap[category] = {
          name: category,
          completed: 0,
          active: 0,
        }
      }

      if (task.completed) {
        categoryMap[category].completed += 1
      } else {
        categoryMap[category].active += 1
      }
    })

    return Object.values(categoryMap)
  }

  const categoryData = getCategoryData()

  return (
    <div className="statistics-container">
      <div className="stats-header">
        <h2>Task Statistics</h2>
        <div className="time-range-selector">
          <label htmlFor="timeRange">Time Range:</label>
          <select id="timeRange" value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="all">All Time</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
          </select>
        </div>
      </div>

      <div className="stats-summary">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p className="stat-value">{filteredTasks.length}</p>
        </div>
        <div className="stat-card">
          <h3>Completion Rate</h3>
          <p className="stat-value">{completionRate}%</p>
        </div>
        <div className="stat-card">
          <h3>Avg. Completion Time</h3>
          <p className="stat-value">{getAverageCompletionTime()}</p>
        </div>
      </div>

      <div className="stats-text-data">
        <h3>Task Status</h3>
        <p>Completed Tasks: {completedCount}</p>
        <p>Active Tasks: {activeCount}</p>

        <h3 className="mt-4">Tasks by Category</h3>
        <ul className="category-list">
          {categoryData.map((category, index) => (
            <li key={index} className="category-item">
              <strong>{category.name}:</strong> {category.completed + category.active} tasks ({category.completed}{" "}
              completed, {category.active} active)
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SimplifiedStatistics

