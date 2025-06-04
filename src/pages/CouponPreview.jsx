import { useRef, useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Alert,
  Paper,
  Divider,
  Card,
  CardContent,
  Fade,
  Zoom,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  ButtonGroup,
  Container,
  Fab,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useReactToPrint } from 'react-to-print';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import '../components/PrintStyles.css';
import { calculateLayout } from '../utils/couponGenerator'; // Import calculateLayout

const CouponPreview = ({ coupons, settings, setShowPreview, setIsLoading: setMainIsLoading }) => { // Renamed setIsLoading to avoid conflict
  const printRef = useRef();
  const theme = useTheme();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const [isGeneratingPdfOrPrinting, setIsGeneratingPdfOrPrinting] = useState(false); // Local loading state for PDF/Print actions

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Kupon-Qurban-${new Date().toLocaleDateString()}`,
    onBeforeGetContent: () => {
      setIsGeneratingPdfOrPrinting(true);
      if (setMainIsLoading) setMainIsLoading(true); // Also set global loading if needed
      return Promise.resolve();
    },
    onAfterPrint: () => {
      setIsGeneratingPdfOrPrinting(false);
      if (setMainIsLoading) setMainIsLoading(false);
    }
  });
  
  const handleSavePDF = async () => {
    setIsGeneratingPdfOrPrinting(true);
    if (setMainIsLoading) setMainIsLoading(true);
    try {
      const element = printRef.current;
      const { paperWidth, paperHeight } = calculateLayout(settings); // Get paper dimensions

      const canvas = await html2canvas(element, {
        scale: 2, // Adjust scale as needed for quality
        useCORS: true,
        logging: false,
        width: paperWidth * (96 / 25.4), // Convert mm to pixels (assuming 96 DPI)
        height: paperHeight * (96 / 25.4),
        windowWidth: paperWidth * (96 / 25.4),
        windowHeight: paperHeight * (96 / 25.4),
      });
      const data = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        orientation: settings.orientation,
        unit: 'mm',
        format: settings.paperSize.toLowerCase(), // Use paperSize from settings
      });

      // Get PDF page dimensions
      const pdfPageWidth = pdf.internal.pageSize.getWidth();
      const pdfPageHeight = pdf.internal.pageSize.getHeight();

      // Calculate image dimensions to fit the page while maintaining aspect ratio
      const imgProps = pdf.getImageProperties(data);
      const aspectRatio = imgProps.width / imgProps.height;

      let imgWidth = pdfPageWidth;
      let imgHeight = imgWidth / aspectRatio;

      if (imgHeight > pdfPageHeight) {
        imgHeight = pdfPageHeight;
        imgWidth = imgHeight * aspectRatio;
      }

      // Center the image on the page (optional)
      const x = (pdfPageWidth - imgWidth) / 2;
      const y = (pdfPageHeight - imgHeight) / 2;

      pdf.addImage(data, 'PNG', x, y, imgWidth, imgHeight);
      pdf.save(`Kupon-Qurban-${new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPdfOrPrinting(false);
      if (setMainIsLoading) setMainIsLoading(false);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.6));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          borderRadius: 4,
          p: 4,
          mb: 4,
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Typography 
          variant="h3" 
          align="center" 
          sx={{ 
            fontWeight: 'bold',
            mb: 2,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          Preview Kupon Qurban
        </Typography>
        <Typography 
          variant="h6" 
          align="center" 
          sx={{ 
            opacity: 0.9,
            maxWidth: 600,
            mx: 'auto'
          }}
        >
          Kupon Anda telah siap! Pratinjau, cetak, atau simpan sebagai PDF
        </Typography>
        
        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -30,
            left: -30,
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        />
      </Box>

      {/* Success Alert */}
      <Fade in timeout={800}>
        <Alert 
          severity="success" 
          icon={<CheckCircleIcon />}
          sx={{ 
            mb: 4,
            borderRadius: 2,
            '& .MuiAlert-icon': {
              fontSize: '2rem'
            }
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Berhasil Membuat {coupons.length} Kupon!
          </Typography>
          <Typography variant="body2">
            Kupon sudah siap untuk dicetak atau disimpan. Pastikan printer Anda sudah siap.
          </Typography>
        </Alert>
      </Fade>

      {/* Action Bar */}
      <Card sx={{ mb: 4, overflow: 'visible' }}>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            {/* Navigation */}
            <Grid item xs={12} md={4}>
              <Button
                variant="outlined"
                size="large"
                startIcon={<ArrowBackIcon />}
                onClick={() => setShowPreview(false)}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1.5,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[4]
                  }
                }}
                fullWidth
              >
                Kembali ke Generator
              </Button>
            </Grid>

            {/* Main Actions */}
            <Grid item xs={12} md={8}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PrintIcon />}
                  onClick={handlePrint}
                  disabled={isGeneratingPdfOrPrinting} // Use local loading state
                  sx={{
                    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
                    borderRadius: 2,
                    px: 3,
                    py: 1.5,
                    boxShadow: theme.shadows[4],
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[8]
                    },
                    flex: 1
                  }}
                >
                  {isGeneratingPdfOrPrinting ? 'Menyiapkan...' : 'Cetak Kupon'}
                </Button>

                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PictureAsPdfIcon />}
                  onClick={handleSavePDF}
                  disabled={isGeneratingPdfOrPrinting} // Use local loading state
                  sx={{
                    background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.secondary.dark} 90%)`,
                    borderRadius: 2,
                    px: 3,
                    py: 1.5,
                    boxShadow: theme.shadows[4],
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[8]
                    },
                    flex: 1
                  }}
                >
                  {isGeneratingPdfOrPrinting ? 'Membuat PDF...' : 'Simpan PDF'}
                </Button>
              </Stack>
            </Grid>
          </Grid>

          {/* Zoom Controls */}
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
            <Tooltip title="Perkecil">
              <IconButton 
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.6}
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  '&:hover': {
                    background: theme.palette.action.hover
                  }
                }}
              >
                <ZoomOutIcon />
              </IconButton>
            </Tooltip>
            
            <Chip 
              label={`${Math.round(zoomLevel * 100)}%`}
              variant="outlined"
              sx={{ 
                px: 2,
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
              onClick={() => setZoomLevel(1)}
            />
            
            <Tooltip title="Perbesar">
              <IconButton 
                onClick={handleZoomIn}
                disabled={zoomLevel >= 2}
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  '&:hover': {
                    background: theme.palette.action.hover
                  }
                }}
              >
                <ZoomInIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>

      {/* Info Panel */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 0 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: theme.palette.action.hover
              }
            }}
            onClick={() => setShowInfo(!showInfo)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <InfoIcon color="primary" />
              <Typography variant="h6" fontWeight="bold">
                Informasi Kupon
              </Typography>
            </Box>
            {showInfo ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Box>
          
          <Collapse in={showInfo}>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Total Kupon"
                        secondary={`${coupons.length} kupon siap cetak`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <VisibilityIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Format Cetak"
                        secondary="A4 - Portrait, optimized untuk printer"
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <PictureAsPdfIcon color="secondary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="PDF Quality"
                        secondary="High resolution untuk hasil terbaik"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PrintIcon color="info" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Print Tips"
                        secondary="Gunakan kertas putih berkualitas baik"
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </CardContent>
      </Card>

      {/* Preview Container */}
      <Card 
        sx={{ 
          mb: 4,
          background: `linear-gradient(135deg, 
            ${theme.palette.background.paper} 0%, 
            ${theme.palette.grey[50]} 100%
          )`,
          border: `2px dashed ${theme.palette.primary.main}`,
          borderRadius: 3
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography 
            variant="h5" 
            align="center" 
            sx={{ 
              mb: 3,
              fontWeight: 'bold',
              color: theme.palette.primary.main
            }}
          >
            Preview Kupon
          </Typography>
          
          <Box
            sx={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'top center',
              transition: 'transform 0.3s ease',
              overflow: 'auto',
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              backgroundColor: 'white',
              boxShadow: theme.shadows[2],
              // Apply paper size to the preview container
              width: settings.paperSize === 'A4' ? '210mm' : settings.paperSize === 'A5' ? '148mm' : settings.paperSize === 'Letter' ? '215.9mm' : '215.9mm', // Width based on paper size
              height: settings.paperSize === 'A4' ? '297mm' : settings.paperSize === 'A5' ? '210mm' : settings.paperSize === 'Letter' ? '279.4mm' : '355.6mm', // Height based on paper size
              // Adjust for landscape orientation
              ...(settings.orientation === 'landscape' && {
                width: settings.paperSize === 'A4' ? '297mm' : settings.paperSize === 'A5' ? '210mm' : settings.paperSize === 'Letter' ? '279.4mm' : '355.6mm',
                height: settings.paperSize === 'A4' ? '210mm' : settings.paperSize === 'A5' ? '148mm' : settings.paperSize === 'Letter' ? '215.9mm' : '215.9mm',
              }),
            }}
          >
            <Box
              ref={printRef}
              sx={{
                width: '100%',
                p: 2,
                '@media print': {
                  width: '100%',
                  height: 'auto',
                  overflow: 'visible',
                  padding: 0,
                  margin: 0,
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  '& *': {
                    backgroundColor: '#ffffff !important',
                    color: '#000000 !important',
                    border: '2px solid #000000 !important'
                  }
                }
              }}            >
              <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
                {coupons.map((coupon, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2.4}>
                    <Zoom in timeout={200 + index * 50}><Paper
                        elevation={0}
                        className="coupon-container"
                        sx={{
                          height: 240, // Increased height to prevent truncation
                          border: coupon.useColors ? `2px solid ${theme.palette.primary.main}` : '2px solid #000',
                          borderRadius: 2,
                          p: 1.5,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          pageBreakInside: 'avoid',
                          position: 'relative',
                          overflow: 'hidden',
                          backgroundColor: '#ffffff', // Always white background
                          color: '#000000', // Always black text
                          '&:hover': {
                            boxShadow: coupon.useColors ? theme.shadows[4] : '0 4px 8px rgba(0,0,0,0.2)',
                            transform: 'translateY(-2px)',
                            transition: 'all 0.3s ease'
                          },
                          '@media print': {
                            boxShadow: 'none',
                            backgroundColor: '#ffffff',
                            color: '#000000',
                            border: '2px solid #000',
                            '&:hover': {
                              transform: 'none'
                            }
                          }
                        }}
                      >                        {/* Corner decoration - only if colored */}
                        {coupon.useColors && (
                          <Box
                            className="print-hide"
                            sx={{
                              position: 'absolute',
                              top: -10,
                              right: -10,
                              width: 20,
                              height: 20,
                              borderRadius: '50%',
                              background: theme.palette.primary.main,
                              opacity: 0.1
                            }}
                          />
                        )}
                        
                        <Box>
                          <Typography 
                            variant="subtitle1" 
                            align="center" 
                            sx={{ 
                              fontWeight: 'bold',
                              fontSize: '1rem',
                              lineHeight: 1.3,
                              color: '#000000',
                              mb: 0.5
                            }}
                          >
                            {coupon.title}
                          </Typography>
                          {coupon.subtitle && (
                            <Typography 
                              variant="caption" 
                              align="center" 
                              display="block"
                              sx={{ 
                                mt: 0.5,
                                color: '#666666',
                                fontSize: '0.8rem'
                              }}
                            >
                              {coupon.subtitle}
                            </Typography>
                          )}
                        </Box>
                        
                        <Divider className="coupon-divider" sx={{ my: 1, borderColor: '#000000' }} />
                        
                        <Box 
                          className="coupon-number-bg"
                          sx={{ 
                            display: 'flex', 
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexGrow: 1,
                            background: coupon.useColors 
                              ? `linear-gradient(45deg, ${theme.palette.primary.light}20, ${theme.palette.secondary.light}20)`
                              : '#f8f8f8',
                            borderRadius: 1,
                            mx: -0.5,
                            border: '1px solid #e0e0e0',
                            minHeight: '80px' // Ensure adequate space for number
                          }}
                        >
                          <Typography 
                            variant="h2" 
                            align="center" 
                            sx={{ 
                              fontWeight: 'bold',
                              color: coupon.useColors ? theme.palette.primary.main : '#000000',
                              textShadow: coupon.useColors ? '1px 1px 2px rgba(0,0,0,0.1)' : 'none',
                              fontSize: { xs: '2rem', md: '2.5rem' }
                            }}
                          >
                            {coupon.number}
                          </Typography>
                        </Box>
                        <Divider className="coupon-divider" sx={{ my: 1, borderColor: '#000000' }} />
                        
                        <Box sx={{ minHeight: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          {coupon.additionalText && (
                            <Typography 
                              variant="caption" 
                              align="center" 
                              display="block"
                              sx={{ 
                                fontSize: '0.75rem',
                                lineHeight: 1.3,
                                color: '#000000',
                                mb: 1
                              }}
                            >
                              {coupon.additionalText}
                            </Typography>
                          )}
                          
                          {coupon.qrCode && (
                            <Box 
                              sx={{ 
                                display: 'flex', 
                                justifyContent: 'center',
                                mt: 'auto'
                              }}
                            >
                              <Box 
                                component="img" 
                                src={coupon.qrCode}
                                alt="QR Code"
                                className="qr-code"
                                sx={{ 
                                  width: 35, 
                                  height: 35,
                                  border: '1px solid #000',
                                  borderRadius: 0.5,
                                  backgroundColor: '#ffffff'
                                }}
                              />
                            </Box>
                          )}
                        </Box>
                      </Paper>
                    </Zoom>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Floating Action Button for Quick Actions */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
          '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: theme.shadows[12]
          }
        }}
        onClick={handlePrint}
        disabled={isGeneratingPdfOrPrinting} // Use local loading state
      >
        <PrintIcon />
      </Fab>
    </Container>
  );
};

export default CouponPreview;
