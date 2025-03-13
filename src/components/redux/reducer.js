import { ADD_TASK, TOGGLE_TASK, EDIT_TASK, FILTER_TASKS } from "./actions"

// Initial state
const initialState = {
  tasks: [],
  filter: "all", // 'all', 'done', or 'notDone'
}

// Reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      }

    case TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === action.payload ? { ...task, isDone: !task.isDone } : task)),
      }

    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, description: action.payload.description } : task,
        ),
      }

    case FILTER_TASKS:
      return {
        ...state,
        filter: action.payload,
      }

    default:
      return state
  }
}

export default reducer

