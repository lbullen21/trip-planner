"use client";

import { useState, useEffect } from 'react';
import TripTile from './TripTile.component';
import AddTrip from './AddTrip.component';
import { Destination } from '../utils/types';

interface TripManagerProps {
    children?: React.ReactNode;
}

const TripManager = ({ children }: TripManagerProps) => {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load trips from API on mount
    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/trips');
            const result = await response.json();
            
            if (result.success) {
                setDestinations(result.data);
            } else {
                throw new Error(result.error || 'Failed to fetch trips');
            }
        } catch (error) {
            console.error('Error fetching trips:', error);
            setError('Failed to load trips from database');
            // Keep destinations empty if API fails - only use database data
            setDestinations([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddTrip = async (newTrip: Omit<Destination, 'id'>) => {
        try {
            const response = await fetch('/api/trips', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTrip),
            });
            
            const result = await response.json();
            
            if (result.success) {
                setDestinations(prev => [result.data, ...prev]);
            } else {
                throw new Error(result.error || 'Failed to add trip');
            }
        } catch (error) {
            console.error('Error adding trip:', error);
            setError('Failed to add trip');
        }
    };

    const handleReorderTrips = (reorderedDestinations: Destination[]) => {
        setDestinations(reorderedDestinations);
    };
    
    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/trips/${id}`, {
                method: 'DELETE',
            });
            
            const result = await response.json();
            
            if (result.success) {
                setDestinations(prev => prev.filter(destination => destination.id !== id));
            } else {
                throw new Error(result.error || 'Failed to delete trip');
            }
        } catch (error) {
            console.error('Error deleting trip:', error);
            setError('Failed to delete trip');
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col lg:flex-row w-full min-h-screen border border-t-0 rounded-b-lg border-gray-400">
                <div className="p-6 bg-white lg:w-3/4 min-h-screen lg:border-r border-gray-400 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading your trips...</p>
                    </div>
                </div>
                <div className="p-6 bg-gray-50 lg:w-1/4 min-h-screen border-t lg:border-t-0 border-gray-400">
                    <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-32 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen border border-t-0 rounded-b-lg border-gray-400">
            {/* Main content area */}
            <div className="p-6 bg-white lg:w-3/4 min-h-screen lg:border-r border-gray-400">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Trips</h1>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                {destinations.length === 0 && !isLoading && !error && (
                    <div className="text-center py-12 text-gray-500">
                        <p className="text-lg mb-2">No trips found</p>
                        <p>Add your first trip using the form on the right!</p>
                    </div>
                )}
                <TripTile 
                    destinations={destinations}
                    onReorderTrips={handleReorderTrips}
                    onDeleteTrip={handleDelete}
                />
            </div>

            {/* Sidebar - appears on right for desktop, below on mobile */}
            <div className="p-6 bg-gray-50 lg:w-1/4 min-h-screen border-t lg:border-t-0 border-gray-400">
                <AddTrip onAddTrip={handleAddTrip} />
                {children}
            </div>
        </div>
    );
};

export default TripManager;