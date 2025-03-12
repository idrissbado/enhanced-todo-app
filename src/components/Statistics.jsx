"use client"

import { useState } from "react"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Statistics component to display task analytics
function Statistics({ tasks }) {
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

  // Completion status data for pie chart
  const completionData = [
    { name: "Completed", value: filteredTasks.filter((task) => task.completed).length },
    { name: "Active", value: filteredTasks.filter((task) => !task.completed).length },
  ]

  // Colors for pie chart
  const COLORS = ["#2ecc71", "#3498db"]

  // Category data for bar chart
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

  // Weekly activity data
  const getWeeklyActivityData = () => {
    const activityMap = {}
    const now = new Date()
    const oneWeekAgo = new Date(now.setDate(now.getDate() - 7))

    // Initialize days
    for (let i = 0; i < 7; i++) {
      const date = new Date(oneWeekAgo)
      date.setDate(date.getDate() + i)
      const dayStr = date.toLocaleDateString("en-US", { weekday: "short" })
      activityMap[dayStr] = {
        name: dayStr,
        created: 0,
        completed: 0,
      }
    }

    // Fill in data
    filteredTasks.forEach((task) => {
      const createdDate = new Date(task.createdAt)
      if (createdDate >= oneWeekAgo) {
        const dayStr = createdDate.toLocaleDateString("en-US", { weekday: "short" })
        if (activityMap[dayStr]) {
          activityMap[dayStr].created += 1
        }
      }

      if (task.completed && task.completedAt) {
        const completedDate = new Date(task.completedAt)
        if (completedDate >= oneWeekAgo) {
          const dayStr = completedDate.toLocaleDateString("en-US", { weekday: "short" })
          if (activityMap[dayStr]) {
            activityMap[dayStr].completed += 1
          }
        }
      }
    })

    return Object.values(activityMap)
  }

  const weeklyActivityData = getWeeklyActivityData()

  // Priority distribution
  const getPriorityData = () => {
    const priorityMap = {
      high: { name: "High", value: 0, color: "#e74c3c" },
      medium: { name: "Medium", value: 0, color: "#f39c12" },
      low: { name: "Low", value: 0, color: "#3498db" },
    }

    filteredTasks.forEach((task) => {
      const priority = task.priority || "medium"
      if (priorityMap[priority]) {
        priorityMap[priority].value += 1
      }
    })

    return Object.values(priorityMap)
  }

  const priorityData = getPriorityData()

  // Calculate completion rate
  const completionRate =
    filteredTasks.length > 0 ? Math.round((completionData[0].value / filteredTasks.length) * 100) : 0

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

      <div className="stats-charts">
        <div className="chart-container">
          <h3>Task Status</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={completionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {completionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container">
          <h3>Tasks by Category</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" stackId="a" fill="#2ecc71" name="Completed" />
                <Bar dataKey="active" stackId="a" fill="#3498db" name="Active" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container">
          <h3>Weekly Activity</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyActivityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="created" fill="#f39c12" name="Created" />
                <Bar dataKey="completed" fill="#2ecc71" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container">
          <h3>Priority Distribution</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics

