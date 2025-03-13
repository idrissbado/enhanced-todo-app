import { TOGGLE_THEME } from "../actions"

// Check if dark mode is preferred
const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches

// Check if theme is saved in localStorage
const savedTheme = localStorage.getItem("theme")
const initialDarkMode = savedTheme ? savedTheme === "dark" : prefersDarkMode

// Apply theme to body
if (initialDarkMode) {
  document.body.classList.add("dark-theme")
} else {
  document.body.classList.remove("dark-theme")
}

// Initial state
const initialState = {
  darkMode: initialDarkMode,
}

// Theme reducer
const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      const newDarkMode = !state.darkMode

      // Save theme preference to localStorage
      localStorage.setItem("theme", newDarkMode ? "dark" : "light")

      // Apply theme to body
      if (newDarkMode) {
        document.body.classList.add("dark-theme")
      } else {
        document.body.classList.remove("dark-theme")
      }

      return {
        ...state,
        darkMode: newDarkMode,
      }

    default:
      return state
  }
}

export default themeReducer

