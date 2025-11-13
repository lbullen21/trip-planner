// Example of importing and using JSON data with TypeScript
import destinationsData from '../data/destinations.json';
import { Destination } from '../utils/types';

export const destinations: Destination[] = destinationsData.destinations;

// Helper functions for working with the data
export const getDestinationById = (id: number): Destination | undefined => {
  return destinations.find(dest => dest.id === id);
};

export const getDestinationsByCountry = (country: string): Destination[] => {
  return destinations.filter(dest => dest.country === country);
};