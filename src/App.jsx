import { useState, lazy, Suspense } from 'react'
import { CssBaseline, ThemeProvider, createTheme, Backdrop, CircularProgress, Box, Typography } from '@mui/material'
import { deepOrange, green, blue } from '@mui/material/colors'

// Lazy load components
const MainLayout = lazy(() => import('./components/MainLayout'))

function App() {
  const [darkMode, setDarkMode] = useState(false)
  
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? deepOrange[400] : deepOrange[600],
        light: deepOrange[300],
        dark: deepOrange[800],
      },
      secondary: {
        main: darkMode ? green[400] : green[600],
        light: green[300],
        dark: green[800],
      },
      background: {
        default: darkMode ? '#0a0a0a' : '#f8f9fa',
        paper: darkMode ? '#1a1a1a' : '#ffffff',
      },
      success: {
        main: green[600],
      },
      info: {
        main: blue[600],
      },
      warning: {
        main: deepOrange[600],
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 800,
        fontSize: '2.5rem',
        letterSpacing: '-0.02em',
      },
      h4: {
        fontWeight: 700,
        fontSize: '1.75rem',
        letterSpacing: '-0.01em',
      },
      h6: {
        fontWeight: 600,
        fontSize: '1.125rem',
      },
      button: {
        fontWeight: 600,
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: '10px 24px',
            fontSize: '0.95rem',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transform: 'translateY(-1px)',
            },
            transition: 'all 0.2s ease-in-out',
          },
          contained: {
            background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #ff5722 0%, #ff7043 100%)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            backdropFilter: 'blur(10px)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            },
          },
        },
      },
    },
  })
  
  // Enhanced loading component
  const LoadingComponent = () => (
    <Backdrop open={true} sx={{ zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.7)' }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <CircularProgress size={60} thickness={4} sx={{ color: deepOrange[500] }} />
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 500 }}>
          Memuat aplikasi...
        </Typography>
      </Box>
    </Backdrop>
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<LoadingComponent />}>
        <MainLayout darkMode={darkMode} setDarkMode={setDarkMode} />
      </Suspense>
    </ThemeProvider>
  )
}

export default App
