"use client";

import { useState, useEffect } from 'react';
import TripTile from './TripTile.component';
import AddTrip from './AddTrip.component';
import { destinations as initialDestinations } from '../lib/data';
import { Destination } from '../utils/types';

interface TripManagerProps {
    children?: React.ReactNode;
}

const TripManager = ({ children }: TripManagerProps) => {
    const [destinations, setDestinations] = useState<Destination[]>([]);

    // Load trips from localStorage on mount
    useEffect(() => {
        const savedTrips = localStorage.getItem('trips');
        if (savedTrips) {
            setDestinations(JSON.parse(savedTrips));
        } else {
            // Use initial destinations if no saved trips
            setDestinations(initialDestinations);
            localStorage.setItem('trips', JSON.stringify(initialDestinations));
        }
    }, []);

    // Save to localStorage whenever destinations change
    useEffect(() => {
        if (destinations.length > 0) {
            localStorage.setItem('trips', JSON.stringify(destinations));
        }
    }, [destinations]);

    const handleAddTrip = (newTrip: Destination) => {
        setDestinations(prev => [...prev, newTrip]);
    };

    const handleReorderTrips = (reorderedDestinations: Destination[]) => {
        setDestinations(reorderedDestinations);
    };
    const handleDelete = (id: number) => {
        setDestinations(prev => prev.filter(destination => destination.id !== id));
    }

    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen border border-t-0 rounded-b-lg border-gray-400">
            {/* Main content area */}
            <div className="p-6 bg-white lg:w-3/4 min-h-screen lg:border-r border-gray-400">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Trips</h1>
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