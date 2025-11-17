// Helper function to get image path for destinations
export const getDestinationImage = (destinationName: string): string => {
  // Convert destination name to lowercase and remove spaces
  const normalizedName = destinationName.toLowerCase().replace(/\s+/g, '');
  
  // Available images in the public/images folder
  const availableImages: { [key: string]: string } = {
    'paris': '/images/Paris.jpeg',
    'tokyo': '/images/Tokyo.jpeg',
    'london': '/images/London.jpeg',
    'edinburgh': '/images/Edinburgh.jpeg',
  };
  
  // Check for exact match
  if (availableImages[normalizedName]) {
    return availableImages[normalizedName];
  }
  
  // Check for partial matches
  for (const [imageName, imagePath] of Object.entries(availableImages)) {
    if (normalizedName.includes(imageName) || imageName.includes(normalizedName)) {
      return imagePath;
    }
  }
  
  // Default to placeholder if no match found
  return '/images/placeholder.jpg';
};

// Helper to get all available destination images for selection
export const getAvailableImages = () => {
  return [
    { name: 'Paris', path: '/images/Paris.jpeg' },
    { name: 'Tokyo', path: '/images/Tokyo.jpeg' },
    { name: 'London', path: '/images/London.jpeg' },
    { name: 'Edinburgh', path: '/images/Edinburgh.jpeg' },
    { name: 'Custom', path: '/images/placeholder.jpg' },
  ];
};