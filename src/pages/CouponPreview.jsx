import { useEffect, useRef, useState } from 'react';
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
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import '../components/PrintStyles.css';
import { calculateLayout } from '../utils/couponGenerator';

const CouponPreview = ({ coupons, settings, setShowPreview, setIsLoading: setMainIsLoading }) => {
  const printRef = useRef();
  const gridRef = useRef();
  
  const theme = useTheme();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const [isGeneratingPdfOrPrinting, setIsGeneratingPdfOrPrinting] = useState(false);
  const [gridSize, setGridSize] = useState({ width: 0, height: 0 });
  console.log('Grid Size:', gridSize);


  const getScreenDPI = () => {
  // Create a temporary element with width 1 inch
  const div = document.createElement('div');
  div.style.width = '1in';
  div.style.height = '1in';
  div.style.position = 'absolute';
  div.style.left = '-100%';
  document.body.appendChild(div);
  const dpi = div.offsetWidth;
  document.body.removeChild(div);
  return dpi;
};

const calculateCouponsPerPage = () => {
  if (gridSize.width === 0 || gridSize.height === 0) {
    console.warn('Grid size not set yet, cannot calculate coupons per page');
    return settings.columns * settings.rows; // Default to settings if grid size is not available
  }

  // Get paper dimensions in pixels (convert from mm to pixels using DPI)
  const { paperWidth, paperHeight } = layout;
  const pageWidthPx = paperWidth * (dpi / 25.4);
  const pageHeightPx = paperHeight * (dpi / 25.4);
  
  // Account for page margins and padding (approximately 10mm on each side)
  const usableWidthPx = pageWidthPx - ((5 * 2) * (dpi / 25.4));
  const usableHeightPx = pageHeightPx - ((2 * 2) * (dpi / 25.4));

  // Calculate max number of columns and rows that can fit
  const maxColumns = Math.floor(usableWidthPx / gridSize.width);
  const maxRows = Math.floor(usableHeightPx / gridSize.height);

  // Ensure we have at least 1 column and row
  const columns = Math.max(1, maxColumns);
  const rows = Math.max(1, maxRows);
  
  console.log('Calculated layout:', {
    actualCouponSize: gridSize,
    pageSize: { width: pageWidthPx, height: pageHeightPx },
    usableSize: { width: usableWidthPx, height: usableHeightPx },
    columns,
    rows,
    couponsPerPage: columns * rows
  });
  
  return columns * rows;
};

      const dpi = getScreenDPI(); // Dynamically get DPI
      
  // Calculate how many coupons per page based on settings
  const layout = calculateLayout(settings);
  const couponsPerPage = calculateCouponsPerPage();


  // Split coupons into pages
  const couponPages = [];
  for (let i = 0; i < coupons.length; i += couponsPerPage) {
    couponPages.push(coupons.slice(i, i + couponsPerPage));
  }

  useEffect(() => {
    if (!gridRef.current) return;
    const observer = new window.ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) return; // Ignore zero dimensions
        setGridSize({ width, height });
      }
    });
    observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, [gridRef, zoomLevel, settings]);
  
  const handleSavePDF = async () => {
    setIsGeneratingPdfOrPrinting(true);
    if (setMainIsLoading) setMainIsLoading(true);
    
    try {
      const { paperWidth, paperHeight } = calculateLayout(settings);
      const pdf = new jsPDF({
        orientation: settings.orientation,
        unit: 'mm',
        format: settings.paperSize.toLowerCase(),
      });
      
      // PDF dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Process each page separately
      for (let pageIndex = 0; pageIndex < couponPages.length; pageIndex++) {
        // If not the first page, add a new page to PDF
        if (pageIndex > 0) {
          pdf.addPage();
        }
        
        // Get the specific page element
        const pageElement = document.getElementById(`page-${pageIndex}`);
        
        // Render page to canvas
        const canvas = await html2canvas(pageElement, {
          scale: 2, // Higher scale for better quality
          useCORS: true,
          logging: false,
          windowWidth: paperWidth * (dpi / 25.4),
          windowHeight: paperHeight * (dpi / 25.4)
        });
        
        // Convert canvas to image
        const imgData = canvas.toDataURL('image/png');
        
        // Calculate image dimensions to fit PDF page
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const aspectRatio = canvasWidth / canvasHeight;
        
        // Calculate dimensions to fit the page while maintaining aspect ratio
        let imgWidth = pdfWidth;
        let imgHeight = imgWidth / aspectRatio;
        
        if (imgHeight > pdfHeight) {
          imgHeight = pdfHeight;
          imgWidth = imgHeight * aspectRatio;
        }
        
        // Center the image on the page
        const x = (pdfWidth - imgWidth) / 2;
        const y = (pdfHeight - imgHeight) / 2;
        
        // Add image to current PDF page
        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      }
      
      // Save the PDF with a formatted date in the filename
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
          {couponPages.length} halaman kupon telah siap! Pratinjau, cetak, atau simpan sebagai PDF
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
            Berhasil Membuat {coupons.length} Kupon dalam {couponPages.length} Halaman!
          </Typography>
          <Typography variant="body2">
            Kupon sudah siap untuk dicetak atau disimpan. {couponsPerPage} kupon per halaman.
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
                  startIcon={<PictureAsPdfIcon />}
                  onClick={handleSavePDF}
                  disabled={isGeneratingPdfOrPrinting}
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
                        secondary={`${coupons.length} kupon dalam ${couponPages.length} halaman`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <VisibilityIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Kupon per Halaman"
                        secondary={`${couponsPerPage} kupon (${settings.columns} kolom × ${settings.rows} baris)`}
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
                        primary="Format Cetak"
                        secondary={`${settings.paperSize} - ${settings.orientation}`}
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

      {/* Page Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Stack direction="row" spacing={1}>
          {couponPages.map((_, index) => (
            <Chip
              key={index}
              label={`Halaman ${index + 1}`}
              variant="outlined"
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                const pageElement = document.getElementById(`page-${index}`);
                pageElement?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Preview Container with Pages */}
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
            Preview Kupon ({couponPages.length} Halaman)
          </Typography>
          
          <Box
            sx={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'top center',
              transition: 'transform 0.3s ease',
              overflow: 'auto',
            }}
          >
            <Box ref={printRef}>
              {couponPages.map((pageCoupons, pageIndex) => (
                <Box
                  key={pageIndex}
                  id={`page-${pageIndex}`}
                  sx={{
                    width: settings.paperSize === 'A4' ? '210mm' : settings.paperSize === 'A5' ? '148mm' : settings.paperSize === 'Letter' ? '215.9mm' : '215.9mm',
                    height: settings.paperSize === 'A4' ? '297mm' : settings.paperSize === 'A5' ? '210mm' : settings.paperSize === 'Letter' ? '279.4mm' : '355.6mm',
                    ...(settings.orientation === 'landscape' && {
                      width: settings.paperSize === 'A4' ? '297mm' : settings.paperSize === 'A5' ? '210mm' : settings.paperSize === 'Letter' ? '279.4mm' : '355.6mm',
                      height: settings.paperSize === 'A4' ? '210mm' : settings.paperSize === 'A5' ? '148mm' : settings.paperSize === 'Letter' ? '215.9mm' : '215.9mm',
                    }),
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    backgroundColor: 'white',
                    boxShadow: theme.shadows[2],
                    mb: pageIndex < couponPages.length - 1 ? 4 : 0,
                    p: 2,
                    mx: 'auto',
                    position: 'relative',
                    pageBreakAfter: pageIndex < couponPages.length - 1 ? 'always' : 'auto',
                    '@media print': {
                      width: '100%',
                      height: 'auto',
                      overflow: 'visible',
                      padding: 0,
                      margin: 0,
                      backgroundColor: '#ffffff',
                      color: '#000000',
                      border: 'none',
                      boxShadow: 'none',
                      pageBreakAfter: pageIndex < couponPages.length - 1 ? 'always' : 'auto',
                    }
                  }}
                >

                  <Grid 
                    container 
                    spacing={0.2} 
                    sx={{ 
                      height: '100%',
                      justifyContent: 'flex-start',
                      alignContent: 'flex-start'
                    }}
                  >
                    {pageCoupons.map((coupon, couponIndex) => {
                      const overallIndex = pageIndex * couponsPerPage + couponIndex;
                      return (
                        <Grid 
                          item 
                          ref={gridRef}
                          key={overallIndex} 
                          xs={12 / settings.columns}
                          sx={{
                            height: `${100 / settings.rows}%`,
                            display: 'flex'
                          }}
                        >
                          <Zoom in timeout={200 + couponIndex * 50}>
                            <Paper
                              elevation={0}
                              className="coupon-container"
                              sx={{
                                width: '100%',
                                height: '100%',
                                border: coupon.useColors ? `2px solid ${theme.palette.primary.main}` : '2px solid #000',
                                borderRadius: 2,
                                p: 1.5,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                pageBreakInside: 'avoid',
                                position: 'relative',
                                overflow: 'hidden',
                                backgroundColor: '#ffffff',
                                color: '#000000',
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
                            >
                              {/* Corner decoration - only if colored */}
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
                                  height: '30px'
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
                      );
                    })}
                  </Grid>
                </Box>
              ))}
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
        onClick={handleSavePDF}
        disabled={isGeneratingPdfOrPrinting}
      >
        <PrintIcon />
      </Fab>
    </Container>
  );
};

export default CouponPreview;