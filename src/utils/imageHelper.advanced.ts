// Generate more placeholder images for common destinations
export const generatePlaceholderImage = (destinationName: string, width: number = 400, height: number = 300) => {
  const encodedName = encodeURIComponent(destinationName);
  return `https://via.placeholder.com/${width}x${height}/4F46E5/ffffff?text=${encodedName}`;
};

// Common destination images mapping for auto-detection
export const DESTINATION_KEYWORDS: { [key: string]: string } = {
  // European Cities
  'paris': '/images/Paris.jpeg',
  'london': '/images/London.jpeg',
  'edinburgh': '/images/Edinburgh.jpeg',
  'rome': '/images/placeholder.jpg',
  'barcelona': '/images/placeholder.jpg',
  'amsterdam': '/images/placeholder.jpg',
  
  // Asian Cities
  'tokyo': '/images/Tokyo.jpeg',
  'kyoto': '/images/Tokyo.jpeg', // Fallback to Tokyo image
  'osaka': '/images/Tokyo.jpeg',
  'seoul': '/images/placeholder.jpg',
  'bangkok': '/images/placeholder.jpg',
  
  // American Cities
  'newyork': '/images/placeholder.jpg',
  'losangeles': '/images/placeholder.jpg',
  'chicago': '/images/placeholder.jpg',
  'sanfrancisco': '/images/placeholder.jpg',
  
  // Other Popular Destinations
  'sydney': '/images/placeholder.jpg',
  'dubai': '/images/placeholder.jpg',
  'singapore': '/images/placeholder.jpg',
  'istanbul': '/images/placeholder.jpg',
};

// Enhanced image detection with better matching
export const getDestinationImageEnhanced = (destinationName: string): string => {
  if (!destinationName) return '/images/placeholder.jpg';
  
  const normalizedName = destinationName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '');
  
  // Direct match
  if (DESTINATION_KEYWORDS[normalizedName]) {
    return DESTINATION_KEYWORDS[normalizedName];
  }
  
  // Partial matches
  for (const [keyword, imagePath] of Object.entries(DESTINATION_KEYWORDS)) {
    if (normalizedName.includes(keyword) || keyword.includes(normalizedName)) {
      return imagePath;
    }
  }
  
  return '/images/placeholder.jpg';
};