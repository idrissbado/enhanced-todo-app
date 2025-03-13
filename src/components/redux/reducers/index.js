import { combineReducers } from "redux"
import tasksReducer from "./tasksReducer"
import authReducer from "./authReducer"
import themeReducer from "./themeReducer"

const rootReducer = combineReducers({
  tasks: tasksReducer,
  auth: authReducer,
  theme: themeReducer,
})

export default rootReducer

