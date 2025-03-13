// Action Types
export const ADD_TASK = "ADD_TASK"
export const TOGGLE_TASK = "TOGGLE_TASK"
export const EDIT_TASK = "EDIT_TASK"
export const DELETE_TASK = "DELETE_TASK"
export const FILTER_TASKS = "FILTER_TASKS"
export const CHECK_TASK_DATES = "CHECK_TASK_DATES"

// Auth Action Types
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"

// Theme Action Types
export const TOGGLE_THEME = "TOGGLE_THEME"

// Task Actions
export const addTask = (task) => {
  return {
    type: ADD_TASK,
    payload: task,
  }
}

export const toggleTask = (id) => {
  return {
    type: TOGGLE_TASK,
    payload: id,
  }
}

export const editTask = (task) => {
  return {
    type: EDIT_TASK,
    payload: task,
  }
}

export const deleteTask = (id) => {
  return {
    type: DELETE_TASK,
    payload: id,
  }
}

export const filterTasks = (filter) => {
  return {
    type: FILTER_TASKS,
    payload: filter,
  }
}

export const checkTaskDates = () => {
  return {
    type: CHECK_TASK_DATES,
  }
}

// Auth Actions
export const login = (email, username) => {
  return {
    type: LOGIN,
    payload: { email, username },
  }
}

export const logout = () => {
  return {
    type: LOGOUT,
  }
}

// Theme Actions
export const toggleTheme = () => {
  return {
    type: TOGGLE_THEME,
  }
}

