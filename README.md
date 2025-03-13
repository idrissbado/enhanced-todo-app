# Enhanced ToDo Application with Redux

A comprehensive task management application with authentication, analytics, and advanced task management features.

## Features

### Authentication
- Login page with email-based authentication
- Username extracted from email address
- Protected routes for authenticated users

### Dashboard
- Task statistics overview (completed, pending, due today, overdue)
- Interactive pie chart showing task status distribution
- Upcoming tasks preview
- Time range filtering for statistics

### Task Management
- Create tasks with descriptions, due dates, categories, and priority levels
- Automatic task completion based on due dates (past dates are marked as completed)
- Edit and delete tasks
- Toggle task completion status

### Advanced Filtering and Sorting
- Filter tasks by completion status (All, Completed, Pending)
- Filter by category and priority
- Search functionality
- Sort by due date, priority, or alphabetically

### Additional Features
- Dark/Light theme toggle
- Responsive design for all device sizes
- Data persistence using localStorage
- Task categorization and prioritization

## Technologies Used

- React
- Redux for state management
- React Router for navigation
- Recharts for data visualization
- React Icons for UI icons
- CSS variables for theming

## Installation

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/idrissbado/enhanced-todo-app.git
   cd enhanced-todo-app
