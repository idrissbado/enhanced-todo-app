import { ADD_TASK, TOGGLE_TASK, EDIT_TASK, DELETE_TASK, FILTER_TASKS, CHECK_TASK_DATES } from "../actions"

// Initial state
const initialState = {
  tasks: [],
  filter: "all", // 'all', 'done', or 'notDone'
}

// Load tasks from localStorage if available
const savedTasks = localStorage.getItem("tasks")
if (savedTasks) {
  initialState.tasks = JSON.parse(savedTasks)
}

// Tasks reducer
const tasksReducer = (state = initialState, action) => {
  let updatedTasks

  switch (action.type) {
    case ADD_TASK:
      updatedTasks = [...state.tasks, action.payload]
      localStorage.setItem("tasks", JSON.stringify(updatedTasks))
      return {
        ...state,
        tasks: updatedTasks,
      }

    case TOGGLE_TASK:
      updatedTasks = state.tasks.map((task) => (task.id === action.payload ? { ...task, isDone: !task.isDone } : task))
      localStorage.setItem("tasks", JSON.stringify(updatedTasks))
      return {
        ...state,
        tasks: updatedTasks,
      }

    case EDIT_TASK:
      updatedTasks = state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task))
      localStorage.setItem("tasks", JSON.stringify(updatedTasks))
      return {
        ...state,
        tasks: updatedTasks,
      }

    case DELETE_TASK:
      updatedTasks = state.tasks.filter((task) => task.id !== action.payload)
      localStorage.setItem("tasks", JSON.stringify(updatedTasks))
      return {
        ...state,
        tasks: updatedTasks,
      }

    case FILTER_TASKS:
      return {
        ...state,
        filter: action.payload,
      }

    case CHECK_TASK_DATES:
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      let tasksChanged = false
      updatedTasks = state.tasks.map((task) => {
        if (!task.isDone && task.dueDate) {
          const dueDate = new Date(task.dueDate)
          if (dueDate < today) {
            tasksChanged = true
            return { ...task, isDone: true }
          }
        }
        return task
      })

      if (tasksChanged) {
        localStorage.setItem("tasks", JSON.stringify(updatedTasks))
        return {
          ...state,
          tasks: updatedTasks,
        }
      }

      return state

    default:
      return state
  }
}

export default tasksReducer

