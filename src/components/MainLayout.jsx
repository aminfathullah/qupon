import { useState, lazy, Suspense } from 'react';
import { 
  Box, 
  Container, 
  Paper, 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton,
  Switch,
  FormControlLabel
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Lazy load components
const CouponGenerator = lazy(() => import('../pages/CouponGenerator'));
const CouponPreview = lazy(() => import('../pages/CouponPreview'));

const MainLayout = ({ darkMode, setDarkMode }) => {
  const [coupons, setCoupons] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Kupon Qurban Generator
          </Typography>
          <FormControlLabel
            control={
              <Switch 
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                color="default"
              />
            }
            label=""
          />
          <IconButton 
            color="inherit" 
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3, 
            borderRadius: 2,
            backgroundColor: theme => 
              theme.palette.mode === 'dark' ? 'rgba(66, 66, 66, 0.7)' : 'rgba(255, 255, 255, 0.7)'
          }}
        >
          <Suspense fallback={<div>Loading...</div>}>
            {!showPreview ? (
              <CouponGenerator 
                setCoupons={setCoupons} 
                setShowPreview={setShowPreview} 
              />
            ) : (
              <CouponPreview 
                coupons={coupons} 
                setShowPreview={setShowPreview}
              />
            )}
          </Suspense>
        </Paper>
      </Container>
      
      <Box 
        component="footer" 
        sx={{ 
          py: 2, 
          mt: 'auto',
          backgroundColor: theme => 
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
          textAlign: 'center'
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Kupon Qurban Generator
        </Typography>
      </Box>
    </Box>
  );
};

export default MainLayout;
