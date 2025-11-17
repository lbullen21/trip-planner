"use client";

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { 
    DndContext, 
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Destination } from "../utils/types";

const SortableTripTile = ({ destination, onDelete }: { destination: Destination, onDelete: (id: number) => void }) => {
    const router = useRouter();
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: destination.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric'
        });
    };

    const handleTileClick = (e: React.MouseEvent) => {
        // Don't navigate if clicking on drag handle or delete button
        const target = e.target as HTMLElement;
        if (target.closest('[data-drag-handle]') || target.closest('[data-delete-button]')) {
            return;
        }
        router.push(`/trip/${destination.id}`);
    };

    return (
        <div 
            ref={setNodeRef} 
            style={style} 
            className="border border-gray-200 rounded-lg p-4 mb-4 text-black hover:shadow-lg transition-all duration-200 bg-white relative cursor-pointer"
            onClick={handleTileClick}
        >
            {/* Drag handle */}
            <div 
                {...listeners} 
                {...attributes}
                data-drag-handle
                className="absolute top-2 right-2 cursor-move p-1 rounded hover:bg-gray-100 transition-colors z-10"
                title="Drag to reorder"
            >
                <Image 
                    src="/draggable.svg" 
                    alt="Drag handle" 
                    width={25} 
                    height={25} 
                    className="opacity-50 hover:opacity-100 transition-opacity"
                />
            </div>
            
            {/* Delete button */}
            <div 
                data-delete-button
                className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer p-1 rounded hover:bg-red-100 transition-colors z-10"
                title="Delete trip"
                onClick={() => onDelete(destination.id)}
            >
                <Image
                    src="/delete.png"
                    alt="Delete trip"
                    width={25}
                    height={25}
                    className="opacity-50 hover:opacity-100 transition-opacity"
                />
            </div>
            <h2 className="text-xl font-bold pr-8">{destination.name}</h2>
            <div className="flex flex-row">
                <Image
                    src={destination.image}
                    alt={destination.name}
                    width={128}
                    height={128}
                    className="w-32 h-32 object-cover rounded-lg mr-4"
                />
                <div className="flex flex-col">
                    <p>{destination.description}</p>
                    <p>
                        {formatDate(destination.startDate)} - {formatDate(destination.endDate)}
                    </p>
                    <h3 className="font-semibold">Attractions:</h3>
                    <ul className="list-disc list-inside">
                        {destination.attractions.map((attraction: string, index: number) => (
                            <li key={index}>{attraction}</li>
                        ))}
                    </ul>
                </div>   
            </div>
        </div>
    );
};

interface TripTileProps {
    destinations: Destination[];
    onReorderTrips: (newDestinations: Destination[]) => void;
    onDeleteTrip: (id: number) => void;
}

const TripTile = ({ destinations, onReorderTrips, onDeleteTrip }: TripTileProps) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = destinations.findIndex((item: Destination) => item.id === active.id);
            const newIndex = destinations.findIndex((item: Destination) => item.id === over?.id);
            const reorderedDestinations = arrayMove(destinations, oldIndex, newIndex);
            onReorderTrips(reorderedDestinations);
        }
    }

    return (
        <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext 
                items={destinations.map(d => d.id)}
                strategy={verticalListSortingStrategy}
            >
                {destinations.map((destination) => (
                    <SortableTripTile 
                        key={destination.id} 
                        destination={destination} 
                        onDelete={onDeleteTrip}
                    />
                ))}
            </SortableContext>
        </DndContext>
    );
};

export default TripTile;