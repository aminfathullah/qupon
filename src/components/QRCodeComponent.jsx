import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';

// Lazy import QRCode library
const loadQRCode = () => import('qrcode');

const QRCodeComponent = ({ 
  value, 
  size = 50, 
  margin = 1,
  errorCorrectionLevel = 'M',
  darkColor = '#000000',
  lightColor = '#FFFFFF',
  style = {},
  ...props 
}) => {
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const generateQR = async () => {
      try {
        // Dynamically import QRCode library
        const QRCode = await loadQRCode();
        
        if (!isMounted || !canvasRef.current) return;

        // Generate QR code to canvas
        await QRCode.default.toCanvas(canvasRef.current, value, {
          width: size,
          margin: margin,
          color: {
            dark: darkColor,
            light: lightColor
          },
          errorCorrectionLevel: errorCorrectionLevel
        });

        if (isMounted) {
          setIsLoaded(true);
        }
      } catch (error) {
        console.error('Error generating QR code:', error);
        
        // Fallback: draw a simple placeholder
        if (isMounted && canvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          canvas.width = size;
          canvas.height = size;
          
          ctx.fillStyle = lightColor;
          ctx.fillRect(0, 0, size, size);
          ctx.fillStyle = darkColor;
          ctx.strokeRect(0, 0, size, size);
          
          // Draw "QR" text as placeholder
          ctx.font = `${size/4}px Arial`;
          ctx.textAlign = 'center';
          ctx.fillText('QR', size/2, size/2 + size/8);
          
          setIsLoaded(true);
        }
      }
    };

    generateQR();

    return () => {
      isMounted = false;
    };
  }, [value, size, margin, errorCorrectionLevel, darkColor, lightColor]);

  return (
    <Box 
      sx={{ 
        display: 'inline-block',
        opacity: isLoaded ? 1 : 0.5,
        transition: 'opacity 0.2s ease-in-out',
        ...style 
      }}
      {...props}
    >
      <canvas 
        ref={canvasRef}
        style={{
          display: 'block',
          maxWidth: '100%',
          height: 'auto'
        }}
      />
    </Box>
  );
};

export default QRCodeComponent;
