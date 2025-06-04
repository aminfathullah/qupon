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
  Stack,
  Slider,
  Divider,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PrintIcon from '@mui/icons-material/Print';
import SettingsIcon from '@mui/icons-material/Settings';

import { generateCoupons } from '../utils/couponGenerator';

const CouponGenerator = ({ setCoupons, setShowPreview }) => {
  const [settings, setSettings] = useState({
    numberOfCoupons: 10,
    paperSize: 'A4',
    orientation: 'portrait',
    couponSize: { width: 85, height: 55 }, // mm
    margins: { top: 10, right: 10, bottom: 10, left: 10 }, // mm
    columns: 2,
    rows: 4,
    fontSizeTitle: 14,
    fontSizeContent: 12,
    title: 'KUPON QURBAN',
    subtitle: 'Idul Adha 1446 H',
    additionalText: 'Masjid Al-Iman',
    showLogo: true,
    showQrCode: true,
    colorScheme: 'default',
    borderStyle: 'solid',
    startingNumber: 1,
  });

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

  const handleGenerateCoupons = () => {
    const generatedCoupons = generateCoupons(settings);
    setCoupons(generatedCoupons);
    setShowPreview(true);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3 }}>
        Generator Kupon Qurban
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        Silahkan masukkan jumlah kupon dan sesuaikan pengaturan sesuai kebutuhan Anda.
      </Alert>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Jumlah Kupon"
            type="number"
            fullWidth
            value={settings.numberOfCoupons}
            onChange={handleChange('numberOfCoupons')}
            InputProps={{
              inputProps: { min: 1 }
            }}
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
              inputProps: { min: 1 }
            }}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }}>
            <Chip icon={<SettingsIcon />} label="Pengaturan Dasar" />
          </Divider>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <TextField
            label="Judul Kupon"
            fullWidth
            value={settings.title}
            onChange={handleChange('title')}
          />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <TextField
            label="Subjudul"
            fullWidth
            value={settings.subtitle}
            onChange={handleChange('subtitle')}
          />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <TextField
            label="Teks Tambahan"
            fullWidth
            value={settings.additionalText}
            onChange={handleChange('additionalText')}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Pengaturan Lanjutan</Typography>
            </AccordionSummary>
            <AccordionDetails>
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
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Kolom"
                    type="number"
                    fullWidth
                    value={settings.columns}
                    onChange={handleChange('columns')}
                    InputProps={{
                      inputProps: { min: 1, max: 5 }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Baris"
                    type="number"
                    fullWidth
                    value={settings.rows}
                    onChange={handleChange('rows')}
                    InputProps={{
                      inputProps: { min: 1, max: 10 }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Style Border</InputLabel>
                    <Select
                      value={settings.borderStyle}
                      onChange={handleChange('borderStyle')}
                      label="Style Border"
                    >
                      <MenuItem value="solid">Solid</MenuItem>
                      <MenuItem value="dashed">Dashed</MenuItem>
                      <MenuItem value="dotted">Dotted</MenuItem>
                      <MenuItem value="double">Double</MenuItem>
                      <MenuItem value="none">No Border</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Skema Warna</InputLabel>
                    <Select
                      value={settings.colorScheme}
                      onChange={handleChange('colorScheme')}
                      label="Skema Warna"
                    >
                      <MenuItem value="default">Default (Orange)</MenuItem>
                      <MenuItem value="green">Hijau</MenuItem>
                      <MenuItem value="blue">Biru</MenuItem>
                      <MenuItem value="monochrome">Monokrom</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Ukuran Font Judul: {settings.fontSizeTitle}
                  </Typography>
                  <Slider
                    value={settings.fontSizeTitle}
                    onChange={handleSliderChange('fontSizeTitle')}
                    min={10}
                    max={24}
                    step={1}
                    valueLabelDisplay="auto"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Ukuran Font Konten: {settings.fontSizeContent}
                  </Typography>
                  <Slider
                    value={settings.fontSizeContent}
                    onChange={handleSliderChange('fontSizeContent')}
                    min={8}
                    max={18}
                    step={1}
                    valueLabelDisplay="auto"
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button 
          variant="contained" 
          color="primary"
          size="large"
          onClick={handleGenerateCoupons}
          startIcon={<ContentCopyIcon />}
          sx={{ mr: 2 }}
        >
          Generate Kupon
        </Button>
      </Box>
    </Box>
  );
};

export default CouponGenerator;
