"use client";

import { useState } from 'react';
import TripTile from './TripTile.component';
import AddTrip from './AddTrip.component';
import { destinations as initialDestinations } from '../lib/data';
import { Destination } from '../utils/types';

interface TripManagerProps {
    children?: React.ReactNode;
}

const TripManager = ({ children }: TripManagerProps) => {
    const [destinations, setDestinations] = useState<Destination[]>(initialDestinations);

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
        <div className="flex flex-row w-full min-h-screen border border-t-0 rounded-b-lg border-gray-400">
            {/* Main content area */}
            <div className="p-6 bg-white w-3/4 min-h-screen border-r border-gray-400">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Trips</h1>
                <TripTile 
                    destinations={destinations}
                    onAddTrip={handleAddTrip}
                    onReorderTrips={handleReorderTrips}
                    onDeleteTrip={handleDelete}
                />
            </div>

            {/* Right sidebar */}
            <div className="p-6 bg-gray-50 w-1/4 min-h-screen">
                <AddTrip onAddTrip={handleAddTrip} />
                {children}
            </div>
        </div>
    );
};

export default TripManager;