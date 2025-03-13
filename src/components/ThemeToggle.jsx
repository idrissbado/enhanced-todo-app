"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"

function ThemeToggle() {
  // Check if user has a theme preference in localStorage or prefers dark mode
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      return savedTheme
    }
    // Check for browser preference, but handle SSR case where window might not exist
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return "light" // Default fallback
  }

  const [theme, setTheme] = useState("light") // Start with a default value

  // Initialize theme after component mounts to avoid SSR issues
  useEffect(() => {
    setTheme(getInitialTheme())
  }, [])

  // Apply theme class to body
  useEffect(() => {
    if (typeof document !== "undefined") {
      // Check for document to avoid SSR issues
      if (theme === "dark") {
        document.body.classList.add("dark-mode")
      } else {
        document.body.classList.remove("dark-mode")
      }
      localStorage.setItem("theme", theme)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  )
}

export default ThemeToggle

