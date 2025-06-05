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
  FormControlLabel,
  Fade,
  Slide,
  useScrollTrigger,
  Fab,
  Zoom,
  Backdrop,
  CircularProgress,
  Tooltip
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import QrCode2Icon from '@mui/icons-material/QrCode2';

// Lazy load components with enhanced loading
const CouponGenerator = lazy(() => import('../pages/CouponGenerator'));
const CouponPreview = lazy(() => import('../pages/CouponPreview'));

// Enhanced loading component
const LoadingComponent = () => (
  <Backdrop open={true} sx={{ zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.3)' }}>
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <CircularProgress size={40} thickness={4} />
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        Memuat...
      </Typography>
    </Box>
  </Backdrop>
)

// Scroll to top component
const ScrollTop = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
};

const MainLayout = ({ darkMode, setDarkMode }) => {
  const [coupons, setCoupons] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added for global loading state

  // Lifted settings state
  const [settings, setSettings] = useState({
    numberOfCoupons: 10,
    paperSize: 'A4',
    orientation: 'portrait',
    couponSize: { width: 85, height: 55 }, // This might be less relevant if using paper size for layout
    margins: { top: 10, right: 10, bottom: 10, left: 10 }, // Assuming mm
    columns: 2, // These will be used by calculateLayout
    rows: 4,    // These will be used by calculateLayout
    fontSizeTitle: 14,
    fontSizeContent: 12,
    title: 'KUPON QURBAN',
    subtitle: 'Idul Adha 1446 H',
    additionalText: 'Masjid Al-Iman',
    showLogo: true,
    showQrCode: true,
    qrCodePrefix: 'QURBAN',
    qrCodeSize: 80, // This is for QR code image itself, not coupon cell
    qrCodeErrorCorrection: 'H',
    colorScheme: 'blackwhite',
    borderStyle: 'solid',
    startingNumber: 1,
    useColors: false,
  });
  const handleToggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Enhanced AppBar with gradient and glassmorphism effect */}
      <AppBar 
        position="static" 
        elevation={0}        sx={{ 
          background: darkMode 
            ? 'linear-gradient(135deg, rgba(46,125,50,0.9) 0%, rgba(27,94,32,0.9) 100%)'
            : 'linear-gradient(135deg, rgba(139,195,74,0.95) 0%, rgba(255,202,40,0.95) 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <QrCode2Icon sx={{ mr: 2, fontSize: 28 }} />          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 700,
              fontSize: '1.3rem',
              letterSpacing: '-0.01em'
            }}
          >
            Qupon: Generator Kupon Qurban
          </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.85rem' }}>
              {darkMode ? 'Mode Gelap' : 'Mode Terang'}
            </Typography>            <Tooltip title="Preferensi mode tema akan disimpan otomatis" arrow>
              <FormControlLabel
                control={
                  <Switch 
                    checked={darkMode}
                    onChange={handleToggleDarkMode}
                    color="default"
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#fff',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: 'rgba(255,255,255,0.3)',
                      },
                      '& .MuiSwitch-track': {
                        transition: 'background-color 0.3s ease',
                      },
                    }}
                  />
                }
                label=""
              />
            </Tooltip>
            <Tooltip title={`Beralih ke ${darkMode ? 'mode terang' : 'mode gelap'}`} arrow>
              <IconButton 
                color="inherit" 
                onClick={handleToggleDarkMode}
                sx={{
                  ml: 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'rotate(180deg)',
                  },
                }}
              >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>        {/* Enhanced main content with animations */}
      <Container 
        component="main" 
        maxWidth="lg"
        sx={{ 
          mt: 4, 
          mb: 4, 
          flexGrow: 1,
          px: { xs: 2, sm: 3 },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}
      >        <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={600}>
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 3, sm: 4, md: 5 }, 
              borderRadius: 3,
              width: '100%',
              maxWidth: '100%',              background: darkMode 
                ? 'linear-gradient(145deg, rgba(46,46,46,0.8) 0%, rgba(33,33,33,0.9) 100%)'
                : 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(248,255,248,0.95) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid',
              borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              boxShadow: darkMode 
                ? '0 8px 32px rgba(0,0,0,0.3)' 
                : '0 8px 32px rgba(0,0,0,0.1)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #8bc34a, #ffca28, #ffa726, #8bc34a)',
                backgroundSize: '200% 100%',
                animation: 'gradient 3s ease infinite',
              },
              '@keyframes gradient': {
                '0%': { backgroundPosition: '0% 50%' },
                '50%': { backgroundPosition: '100% 50%' },
                '100%': { backgroundPosition: '0% 50%' },
              },
            }}
          >
            <Suspense fallback={<LoadingComponent />}>
              <Fade in={true} timeout={800}>
                <Box>
                  {!showPreview ? (                    <CouponGenerator
                      settings={settings} // Pass settings down
                      setSettings={setSettings} // Pass setSettings down
                      setCoupons={setCoupons}
                      setShowPreview={setShowPreview}
                      setIsLoading={setIsLoading} // Pass setIsLoading
                    />
                  ) : (
                    <CouponPreview
                      coupons={coupons}
                      settings={settings} // Pass settings down
                      setShowPreview={setShowPreview}
                      setIsLoading={setIsLoading} // Pass setIsLoading
                    />
                  )}
                </Box>
              </Fade>
            </Suspense>
          </Paper>
        </Slide>
      </Container>      
      {/* Enhanced footer */}
      <Box 
        component="footer" 
        sx={{ 
          py: 3,
          px: 2,
          mt: 'auto',          background: darkMode 
            ? 'linear-gradient(135deg, rgba(46,46,46,0.9) 0%, rgba(33,33,33,0.95) 100%)'
            : 'linear-gradient(135deg, rgba(248,255,248,0.9) 0%, rgba(255,255,255,0.95) 100%)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid',
          borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}
      >        <Typography 
          variant="body2" 
          sx={{ 
            opacity: 0.8,
            fontWeight: 500,
            mb: 1
          }}
        >
          © {new Date().getFullYear()} Qupon: Generator Kupon Qurban
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            opacity: 0.6,
            fontSize: '0.75rem'
          }}
        >
          Dibuat dengan ❤️ untuk kemudahan pengaturan qurban
        </Typography>
      </Box>

      {/* Global loading indicator */}
      {isLoading && <LoadingComponent />}

      {/* Scroll to top button */}
      <ScrollTop>
        <Fab 
          color="primary" 
          size="small" 
          aria-label="scroll back to top"          sx={{
            background: 'linear-gradient(135deg, #8bc34a 0%, #ffca28 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #689f38 0%, #ff8f00 100%)',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Box>
  );
};

export default MainLayout;
