export const calculateAspect = (width, height) => {
  // Simplified aspect ratio calculator
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
};

export const parseExif = (exifData) => {
  // Extract camera metadata
  return {
    camera: exifData.Model || 'Unknown',
    lens: exifData.LensModel || exifData.LensInfo?.toString(),
    iso: exifData.ISO
  };
};