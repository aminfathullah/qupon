// Helper function to generate a simplified QR code data URL
// In a real application, you would use a proper QR code library
const generateQRCode = (text) => {
  // This is just a placeholder representation of a QR code
  const canvas = document.createElement('canvas');
  canvas.width = 50;
  canvas.height = 50;
  const ctx = canvas.getContext('2d');
  
  // Draw a simple representation of a QR code
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 50, 50);
  ctx.fillStyle = '#000000';
  
  // Draw border
  ctx.fillRect(0, 0, 50, 5);
  ctx.fillRect(0, 0, 5, 50);
  ctx.fillRect(45, 0, 5, 50);
  ctx.fillRect(0, 45, 50, 5);
  
  // Draw positioning squares
  ctx.fillRect(10, 10, 10, 10);
  ctx.fillRect(30, 10, 10, 10);
  ctx.fillRect(10, 30, 10, 10);
  
  // Draw some random dots to look like a QR code
  for (let i = 0; i < 10; i++) {
    const x = 15 + Math.floor(Math.random() * 20);
    const y = 15 + Math.floor(Math.random() * 20);
    ctx.fillRect(x, y, 2, 2);
  }
  
  return canvas.toDataURL();
};

// Generate coupons based on settings
export const generateCoupons = (settings) => {
  const coupons = [];
  const startNumber = parseInt(settings.startingNumber) || 1;
  
  for (let i = 0; i < settings.numberOfCoupons; i++) {
    const couponNumber = startNumber + i;
    
    const coupon = {
      number: couponNumber,
      title: settings.title,
      subtitle: settings.subtitle,
      additionalText: settings.additionalText,
      qrCode: settings.showQrCode ? generateQRCode(`QURBAN-${couponNumber}`) : null,
      colorScheme: settings.colorScheme,
      borderStyle: settings.borderStyle,
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
