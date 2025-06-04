import { useRef } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Alert,
  Paper,
  Divider
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useReactToPrint } from 'react-to-print';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const CouponPreview = ({ coupons, setShowPreview }) => {
  const printRef = useRef();
  
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Kupon-Qurban-${new Date().toLocaleDateString()}`,
  });
  
  const handleSavePDF = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    const imgProps= pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Kupon-Qurban-${new Date().toLocaleDateString()}.pdf`);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3 }}>
        Preview Kupon Qurban
      </Typography>
      
      <Alert severity="success" sx={{ mb: 3 }}>
        {coupons.length} kupon berhasil dibuat! Anda dapat mencetak atau menyimpan sebagai PDF.
      </Alert>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => setShowPreview(false)}
        >
          Kembali
        </Button>
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
        >
          Cetak Kupon
        </Button>
        
        <Button
          variant="contained"
          color="secondary"
          startIcon={<PictureAsPdfIcon />}
          onClick={handleSavePDF}
        >
          Simpan PDF
        </Button>
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      <Box sx={{ mt: 2, p: 1, border: '1px dashed #ccc' }}>
        <Box
          ref={printRef}
          sx={{
            width: '100%',
            overflow: 'auto',
            '@media print': {
              width: '100%',
              height: 'auto',
              overflow: 'visible',
            }
          }}
        >
          <Grid container spacing={0}>
            {coupons.map((coupon, index) => (
              <Grid item key={index} xs={6} md={4} lg={3}>
                <Paper
                  elevation={0}
                  sx={{
                    m: 0.5,
                    p: 1.5,
                    height: '100%',
                    border: '1px solid #000',
                    pageBreakInside: 'avoid',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: 1,
                    '@media print': {
                      boxShadow: 'none',
                    }
                  }}
                >
                  <Typography 
                    variant="h6" 
                    align="center" 
                    sx={{ fontWeight: 'bold' }}
                  >
                    {coupon.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    align="center" 
                    sx={{ mb: 1 }}
                  >
                    {coupon.subtitle}
                  </Typography>
                  
                  <Divider sx={{ my: 1 }} />
                  
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center',
                      p: 1,
                      flexGrow: 1,
                    }}
                  >
                    <Typography 
                      variant="h4" 
                      align="center" 
                      sx={{ fontWeight: 'bold' }}
                    >
                      {coupon.number}
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 1 }} />
                  
                  {coupon.additionalText && (
                    <Typography 
                      variant="body2" 
                      align="center" 
                    >
                      {coupon.additionalText}
                    </Typography>
                  )}
                  
                  {coupon.qrCode && (
                    <Box 
                      sx={{ 
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'center',
                        mt: 1
                      }}
                    >
                      <Box 
                        component="img" 
                        src={coupon.qrCode}
                        alt="QR Code"
                        sx={{ width: 50, height: 50 }}
                      />
                    </Box>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default CouponPreview;
