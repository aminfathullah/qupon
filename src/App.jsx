import { useState, lazy, Suspense } from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { grey, deepOrange } from '@mui/material/colors'

// Lazy load components
const MainLayout = lazy(() => import('./components/MainLayout'))

function App() {
  const [darkMode, setDarkMode] = useState(false)
  
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: deepOrange[500],
      },
      secondary: {
        main: grey[900],
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      }
    },
  })
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<div>Loading...</div>}>
        <MainLayout darkMode={darkMode} setDarkMode={setDarkMode} />
      </Suspense>
    </ThemeProvider>
  )
}

export default App
