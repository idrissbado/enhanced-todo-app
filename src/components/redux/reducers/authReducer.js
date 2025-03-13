import { LOGIN, LOGOUT } from "../actions"

// Initial state
const initialState = {
  isAuthenticated: false,
  email: null,
  username: null,
}

// Check if user is already logged in
const savedAuth = localStorage.getItem("auth")
if (savedAuth) {
  const parsedAuth = JSON.parse(savedAuth)
  initialState.isAuthenticated = true
  initialState.email = parsedAuth.email
  initialState.username = parsedAuth.username
}

// Auth reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      const authData = {
        email: action.payload.email,
        username: action.payload.username,
      }
      localStorage.setItem("auth", JSON.stringify(authData))
      return {
        ...state,
        isAuthenticated: true,
        email: action.payload.email,
        username: action.payload.username,
      }

    case LOGOUT:
      localStorage.removeItem("auth")
      return {
        ...state,
        isAuthenticated: false,
        email: null,
        username: null,
      }

    default:
      return state
  }
}

export default authReducer

