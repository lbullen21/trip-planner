// Core application types
export interface Destination {
  image: string;
  startDate: string;
  endDate: string;
  id: number;
  name: string;
  country: string;
  description: string;
  attractions: string[];
}

export interface Trip {
  id: number;
  title: string;
  destinations: Destination[];
  startDate: string;
  endDate: string;
  budget?: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  trips: Trip[];
}

// You can add more types here that aren't just data-related
export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
