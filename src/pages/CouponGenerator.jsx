import { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Fade,
  Zoom,
  Tooltip,
  IconButton,
  LinearProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InfoIcon from '@mui/icons-material/Info';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TuneIcon from '@mui/icons-material/Tune';
import NumbersIcon from '@mui/icons-material/Numbers';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import PreviewIcon from '@mui/icons-material/Preview';

import { generateCoupons } from '../utils/couponGenerator';

const CouponGenerator = ({ setCoupons, setShowPreview, setIsLoading }) => {  const [settings, setSettings] = useState({
    numberOfCoupons: 10,
    paperSize: 'A4',
    orientation: 'portrait',
    couponSize: { width: 85, height: 55 },
    margins: { top: 10, right: 10, bottom: 10, left: 10 },
    columns: 2,
    rows: 4,
    fontSizeTitle: 14,
    fontSizeContent: 12,
    title: 'KUPON QURBAN',
    subtitle: 'Idul Adha 1446 H',
    additionalText: 'Masjid Al-Iman',
    showLogo: true,
    showQrCode: true,
    colorScheme: 'blackwhite',
    borderStyle: 'solid',
    startingNumber: 1,
    useColors: false,
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (prop) => (event) => {
    setSettings({
      ...settings,
      [prop]: event.target.value,
    });
  };

  const handleSliderChange = (prop) => (event, newValue) => {
    setSettings({
      ...settings,
      [prop]: newValue,
    });
  };

  const handleGenerateCoupons = async () => {
    setIsGenerating(true);
    if (setIsLoading) setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const generatedCoupons = generateCoupons(settings);
    setCoupons(generatedCoupons);
    setShowPreview(true);
    setIsGenerating(false);
    if (setIsLoading) setIsLoading(false);
  };

  return (
    <Box>
      <Box 
        sx={{ 
          textAlign: 'center', 
          mb: 4,
          p: 4,
          borderRadius: 3,
          background: 'linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(255,140,66,0.1) 100%)',
          border: '1px solid rgba(255,107,53,0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in={true} timeout={1000}>
            <Box>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2
                }}
              >
                <AutoAwesomeIcon sx={{ color: '#ff6b35', fontSize: 32 }} />
                Generator Kupon Qurban
                <AutoAwesomeIcon sx={{ color: '#ff6b35', fontSize: 32 }} />
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  opacity: 0.8,
                  fontSize: '1.1rem',
                  maxWidth: 600,
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                Buat kupon qurban dengan mudah dan professional. Sesuaikan desain, ukuran, dan informasi sesuai kebutuhan masjid Anda.
              </Typography>
            </Box>
          </Fade>
        </Box>
      </Box>

      {isGenerating && (
        <Box sx={{ mb: 3 }}>
          <LinearProgress 
            sx={{ 
              height: 6, 
              borderRadius: 3,
              backgroundColor: 'rgba(255,107,53,0.2)',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(90deg, #ff6b35, #ff8c42)',
                borderRadius: 3,
              }
            }} 
          />
          <Typography variant="body2" align="center" sx={{ mt: 1, opacity: 0.7 }}>
            Sedang membuat kupon...
          </Typography>
        </Box>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Zoom in={true} timeout={600}>
            <Card 
              elevation={0}
              sx={{ 
                border: '1px solid rgba(255,107,53,0.2)',
                borderRadius: 3,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(255,107,53,0.15)',
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <NumbersIcon sx={{ color: 'primary.main', mr: 2, fontSize: 28 }} />
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Pengaturan Dasar
                  </Typography>
                  <Tooltip title="Tentukan jumlah kupon yang akan dibuat">
                    <IconButton size="small" sx={{ ml: 1 }}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Jumlah Kupon"
                      type="number"
                      fullWidth
                      value={settings.numberOfCoupons}
                      onChange={handleChange('numberOfCoupons')}
                      InputProps={{
                        inputProps: { min: 1, max: 1000 },
                        startAdornment: (
                          <InputAdornment position="start">
                            <ContentCopyIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      helperText="Maksimal 1000 kupon"
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Mulai dari Nomor"
                      type="number"
                      fullWidth
                      value={settings.startingNumber}
                      onChange={handleChange('startingNumber')}
                      InputProps={{
                        inputProps: { min: 1 },
                        startAdornment: (
                          <InputAdornment position="start">
                            <NumbersIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      helperText="Nomor kupon pertama"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Zoom>
        </Grid>

        <Grid item xs={12}>
          <Zoom in={true} timeout={800}>
            <Card 
              elevation={0}
              sx={{ 
                border: '1px solid rgba(76,175,80,0.2)',
                borderRadius: 3,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(76,175,80,0.15)',
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <TextFieldsIcon sx={{ color: 'success.main', mr: 2, fontSize: 28 }} />
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Konten Kupon
                  </Typography>
                </Box>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Judul Kupon"
                      fullWidth
                      value={settings.title}
                      onChange={handleChange('title')}
                      helperText="Teks utama kupon"
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Subjudul"
                      fullWidth
                      value={settings.subtitle}
                      onChange={handleChange('subtitle')}
                      helperText="Informasi tambahan seperti tahun"
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Teks Tambahan"
                      fullWidth
                      value={settings.additionalText}
                      onChange={handleChange('additionalText')}
                      helperText="Nama masjid atau organisasi"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Zoom>
        </Grid>

        <Grid item xs={12}>
          <Zoom in={true} timeout={1000}>
            <Card 
              elevation={0}
              sx={{ 
                border: '1px solid rgba(33,150,243,0.2)',
                borderRadius: 3,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(33,150,243,0.15)',
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Accordion defaultExpanded={false}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <TuneIcon sx={{ color: 'info.main', mr: 2, fontSize: 28 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      Pengaturan Lanjutan
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 3 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Ukuran Kertas</InputLabel>
                          <Select
                            value={settings.paperSize}
                            onChange={handleChange('paperSize')}
                            label="Ukuran Kertas"
                          >
                            <MenuItem value="A4">A4 (210 × 297 mm)</MenuItem>
                            <MenuItem value="A5">A5 (148 × 210 mm)</MenuItem>
                            <MenuItem value="Letter">Letter (8.5 × 11 in)</MenuItem>
                            <MenuItem value="Legal">Legal (8.5 × 14 in)</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Orientasi</InputLabel>
                          <Select
                            value={settings.orientation}
                            onChange={handleChange('orientation')}
                            label="Orientasi"
                          >
                            <MenuItem value="portrait">Portrait</MenuItem>
                            <MenuItem value="landscape">Landscape</MenuItem>
                          </Select>
                        </FormControl>                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Skema Warna</InputLabel>
                          <Select
                            value={settings.useColors ? 'colored' : 'blackwhite'}
                            onChange={(e) => setSettings({
                              ...settings,
                              useColors: e.target.value === 'colored'
                            })}
                            label="Skema Warna"
                          >
                            <MenuItem value="blackwhite">Hitam Putih</MenuItem>
                            <MenuItem value="colored">Berwarna</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                          <Typography gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <FormatSizeIcon color="primary" />
                            Ukuran Font Judul: {settings.fontSizeTitle}px
                          </Typography>
                          <Slider
                            value={settings.fontSizeTitle}
                            onChange={handleSliderChange('fontSizeTitle')}
                            min={10}
                            max={24}
                            step={1}
                            valueLabelDisplay="auto"
                          />
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                          <Typography gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <FormatSizeIcon color="secondary" />
                            Ukuran Font Konten: {settings.fontSizeContent}px
                          </Typography>
                          <Slider
                            value={settings.fontSizeContent}
                            onChange={handleSliderChange('fontSizeContent')}
                            min={8}
                            max={18}
                            step={1}
                            valueLabelDisplay="auto"
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          </Zoom>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Fade in={true} timeout={1200}>
          <Box>
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              onClick={handleGenerateCoupons}
              disabled={isGenerating}
              startIcon={isGenerating ? null : <PreviewIcon />}
              sx={{ 
                px: 6, 
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)',
                boxShadow: '0 4px 20px rgba(255,107,53,0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #ff5722 0%, #ff7043 100%)',
                  boxShadow: '0 6px 30px rgba(255,107,53,0.4)',
                  transform: 'translateY(-2px)',
                },
                '&:disabled': {
                  background: 'rgba(255,107,53,0.5)',
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {isGenerating ? 'Membuat Kupon...' : 'Generate Kupon'}
            </Button>
            <Typography variant="body2" sx={{ mt: 2, opacity: 0.7 }}>
              Klik untuk membuat {settings.numberOfCoupons} kupon qurban
            </Typography>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};

export default CouponGenerator;
