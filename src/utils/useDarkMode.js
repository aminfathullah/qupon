import { useState, useEffect } from 'react'

// Custom hook for dark mode with localStorage persistence
export const useDarkMode = (defaultValue = true) => {
  // Initialize state from localStorage or use default
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedMode = localStorage.getItem('darkMode')
      return savedMode !== null ? JSON.parse(savedMode) : defaultValue
    } catch (error) {
      console.warn('Error reading darkMode from localStorage:', error)
      return defaultValue
    }
  })

  // Save to localStorage whenever darkMode changes
  useEffect(() => {
    try {
      localStorage.setItem('darkMode', JSON.stringify(darkMode))
    } catch (error) {
      console.warn('Error saving darkMode to localStorage:', error)
    }
  }, [darkMode])

  // Toggle function
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode)
  }

  return [darkMode, setDarkMode, toggleDarkMode]
}

export default useDarkMode
