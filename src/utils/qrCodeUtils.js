// Lazy import QRCode library to reduce bundle size
const loadQRCode = () => import('qrcode');

/**
 * Generate QR code as data URL
 * @param {string} text - Text to encode in QR code
 * @param {object} options - QR code options
 * @returns {Promise<string>} - Data URL of the QR code
 */
export const generateQRCodeDataURL = async (text, options = {}) => {
  try {
    const QRCode = await loadQRCode();
    
    const defaultOptions = {
      width: 100,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M'
    };

    const mergedOptions = { ...defaultOptions, ...options };
    
    return await QRCode.default.toDataURL(text, mergedOptions);
  } catch (error) {
    console.error('Error generating QR code data URL:', error);
    throw error;
  }
};

/**
 * Generate QR code to canvas element
 * @param {HTMLCanvasElement} canvas - Canvas element to draw QR code
 * @param {string} text - Text to encode in QR code
 * @param {object} options - QR code options
 * @returns {Promise<void>}
 */
export const generateQRCodeToCanvas = async (canvas, text, options = {}) => {
  try {
    const QRCode = await loadQRCode();
    
    const defaultOptions = {
      width: 100,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M'
    };

    const mergedOptions = { ...defaultOptions, ...options };
    
    await QRCode.default.toCanvas(canvas, text, mergedOptions);
  } catch (error) {
    console.error('Error generating QR code to canvas:', error);
    throw error;
  }
};

/**
 * Generate QR code as SVG string
 * @param {string} text - Text to encode in QR code
 * @param {object} options - QR code options
 * @returns {Promise<string>} - SVG string of the QR code
 */
export const generateQRCodeSVG = async (text, options = {}) => {
  try {
    const QRCode = await loadQRCode();
    
    const defaultOptions = {
      width: 100,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M'
    };

    const mergedOptions = { ...defaultOptions, ...options };
    
    return await QRCode.default.toString(text, { 
      type: 'svg',
      ...mergedOptions 
    });
  } catch (error) {
    console.error('Error generating QR code SVG:', error);
    throw error;
  }
};

/**
 * Validate QR code text and provide encoding suggestions
 * @param {string} text - Text to validate
 * @returns {object} - Validation result and suggestions
 */
export const validateQRCodeText = (text) => {
  const result = {
    isValid: true,
    warnings: [],
    suggestions: []
  };

  if (!text || text.trim().length === 0) {
    result.isValid = false;
    result.warnings.push('Text cannot be empty');
    return result;
  }

  // Check text length
  if (text.length > 2953) {
    result.warnings.push('Text is very long and may result in a complex QR code');
    result.suggestions.push('Consider shortening the text or using a URL shortener');
  }

  // Check for special characters that might cause issues
  const hasSpecialChars = /[^\x20-\x7E]/.test(text);
  if (hasSpecialChars) {
    result.warnings.push('Text contains special characters');
    result.suggestions.push('Special characters may increase QR code complexity');
  }

  // Suggest URL format for web links
  if (text.includes('.') && !text.startsWith('http')) {
    result.suggestions.push('Consider adding http:// or https:// for web URLs');
  }

  return result;
};

/**
 * Get recommended error correction level based on use case
 * @param {string} useCase - Use case: 'print', 'display', 'mobile', 'outdoor'
 * @returns {string} - Recommended error correction level
 */
export const getRecommendedErrorCorrectionLevel = (useCase = 'general') => {
  const recommendations = {
    'print': 'H',      // High - for printed materials that might get damaged
    'outdoor': 'H',    // High - for outdoor signs that might get weathered
    'display': 'M',    // Medium - for digital displays
    'mobile': 'M',     // Medium - for mobile app usage
    'general': 'M'     // Medium - general purpose
  };

  return recommendations[useCase] || 'M';
};
