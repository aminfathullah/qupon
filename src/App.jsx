import { useState, lazy, Suspense } from 'react'
import { CssBaseline, ThemeProvider, createTheme, Backdrop, CircularProgress, Box, Typography } from '@mui/material'

// Lazy load components
const MainLayout = lazy(() => import('./components/MainLayout'))

function App() {
  const [darkMode, setDarkMode] = useState(false)
  
  // Custom color palette: Green (faith, halal, nature), Gold (value, generosity), White (clean, modern)
  const greenPalette = {
    50: '#f1f8e9',
    100: '#dcedc8',
    200: '#c5e1a5',
    300: '#aed581',
    400: '#9ccc65',
    500: '#8bc34a', // Main green
    600: '#7cb342',
    700: '#689f38',
    800: '#558b2f',
    900: '#33691e',
  };

  const goldPalette = {
    50: '#fffbf0',
    100: '#fff3c4',
    200: '#ffeb94',
    300: '#ffe082',
    400: '#ffd54f',
    500: '#ffca28', // Main gold
    600: '#ffb300',
    700: '#ff8f00',
    800: '#ff6f00',
    900: '#e65100',
  };
  
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? greenPalette[400] : greenPalette[600], // Green for faith and nature
        light: greenPalette[300],
        dark: greenPalette[800],
        contrastText: '#ffffff',
      },
      secondary: {
        main: darkMode ? goldPalette[400] : goldPalette[600], // Gold for value and generosity
        light: goldPalette[300],
        dark: goldPalette[800],
        contrastText: '#000000',
      },
      background: {
        default: darkMode ? '#1a1a1a' : '#ffffff', // Clean white background
        paper: darkMode ? '#2d2d2d' : '#ffffff',
      },
      success: {
        main: greenPalette[600],
      },
      info: {
        main: greenPalette[700],
      },
      warning: {
        main: goldPalette[600],
      },
      // Custom colors for the Islamic theme
      tertiary: {
        main: goldPalette[500],
        light: goldPalette[300],
        dark: goldPalette[700],
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
            background: `linear-gradient(135deg, ${greenPalette[600]} 0%, ${goldPalette[600]} 100%)`,
            color: '#ffffff',
            '&:hover': {
              background: `linear-gradient(135deg, ${greenPalette[700]} 0%, ${goldPalette[700]} 100%)`,
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
        <CircularProgress size={60} thickness={4} sx={{ color: greenPalette[500] }} />
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
