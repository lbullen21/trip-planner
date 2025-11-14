"use client";

import { useState } from "react";
import Image from "next/image";
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
import { destinations as initialDestinations } from "../lib/data";
import { Destination } from "../utils/types";

const SortableTripTile = ({ destination }: { destination: Destination }) => {
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

    return (
        <div 
            ref={setNodeRef} 
            style={style} 
            {...listeners} 
            {...attributes}
            className="border border-gray-200 rounded-lg p-4 mb-4 text-black cursor-move hover:shadow-lg transition-all duration-200 bg-white"
        >
            <h2 className="text-xl font-bold">{destination.name}</h2>
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

const TripTile = () => {
    const [destinations, setDestinations] = useState<Destination[]>(initialDestinations);
    
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setDestinations((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over?.id);

                return arrayMove(items, oldIndex, newIndex);
            });
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
                    <SortableTripTile key={destination.id} destination={destination} />
                ))}
            </SortableContext>
        </DndContext>
    );
};

export default TripTile;