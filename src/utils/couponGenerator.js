import { generateQRCodeDataURL } from './qrCodeUtils';

// Helper function to generate a QR code data URL using QRCode.js
const generateQRCode = async (text, size = 80, errorCorrectionLevel = 'H') => {
  try {
    const qrDataURL = await generateQRCodeDataURL(text, {
      width: size,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: errorCorrectionLevel
    });
    return qrDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    // Fallback to a simple placeholder if QR generation fails
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#000000';
    ctx.strokeRect(0, 0, size, size);
    
    // Draw "QR" text as placeholder
    ctx.font = `${size/4}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText('QR', size/2, size/2 + size/8);
    
    return canvas.toDataURL();
  }
};

// Generate coupons based on settings
export const generateCoupons = async (settings) => {
  const coupons = [];
  const startNumber = parseInt(settings.startingNumber) || 1;
  
  for (let i = 0; i < settings.numberOfCoupons; i++) {
    const couponNumber = startNumber + i;
    const qrCodeText = `${settings.qrCodePrefix || 'QURBAN'}-${couponNumber}`;
    const qrCodeData = settings.showQrCode ? 
      await generateQRCode(
        qrCodeText, 
        settings.qrCodeSize || 80, 
        settings.qrCodeErrorCorrection || 'H'
      ) : null;
    
    const coupon = {
      number: couponNumber,
      title: settings.title,
      subtitle: settings.subtitle,
      additionalText: settings.additionalText,
      qrCode: qrCodeData,
      qrCodeText: qrCodeText, // Store the text for reference
      colorScheme: settings.colorScheme,
      borderStyle: settings.borderStyle,
      useColors: settings.useColors,
    };
    
    coupons.push(coupon);
  }
  
  return coupons;
};

// Calculate how many coupons fit on a page based on settings
export const calculateLayout = (settings) => {
  // Paper dimensions in mm
  const paperSizes = {
    'A4': { width: 210, height: 297 },
    'A5': { width: 148, height: 210 },
    'Letter': { width: 215.9, height: 279.4 },
    'Legal': { width: 215.9, height: 355.6 }
  };
  
  let paperWidth = paperSizes[settings.paperSize].width;
  let paperHeight = paperSizes[settings.paperSize].height;
  
  // Swap width and height for landscape
  if (settings.orientation === 'landscape') {
    [paperWidth, paperHeight] = [paperHeight, paperWidth];
  }
  
  // Available space after margins
  const availableWidth = paperWidth - settings.margins.left - settings.margins.right;
  const availableHeight = paperHeight - settings.margins.top - settings.margins.bottom;
  
  // Calculate coupon spacing
  const spacePerCouponWidth = availableWidth / settings.columns;
  const spacePerCouponHeight = availableHeight / settings.rows;
  
  return {
    paperWidth,
    paperHeight,
    couponsPerPage: settings.columns * settings.rows,
    spacePerCouponWidth,
    spacePerCouponHeight
  };
};
