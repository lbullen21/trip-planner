"use client";

import { useRouter } from 'next/navigation';
import { useState, use, useEffect } from 'react';
import Image from 'next/image';
import { Destination } from '../../../utils/types';
import { getDestinationImage } from '../../../utils/imageHelper';
import ImageUpload from '../../../components/ImageUpload.component';

interface TripPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function TripPage({ params }: TripPageProps) {
    const router = useRouter();
    const resolvedParams = use(params);
    
    const [trip, setTrip] = useState<Destination | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    
    // Initialize form data based on trip
    const [editFormData, setEditFormData] = useState({
        name: '',
        country: '',
        description: '',
        startDate: '',
        endDate: '',
        attractions: '',
        customImage: ''
    });

    const [imageMode, setImageMode] = useState<'auto' | 'custom'>('auto');

    // Load trip data from API on mount
    useEffect(() => {
        const fetchTrip = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/trips/${resolvedParams.id}`);
                const result = await response.json();
                
                if (result.success) {
                    const tripData = result.data;
                    setTrip(tripData);
                    // Initialize edit form with trip data
                    setEditFormData({
                        name: tripData.name,
                        country: tripData.country,
                        description: tripData.description,
                        startDate: tripData.startDate,
                        endDate: tripData.endDate,
                        attractions: tripData.attractions.join(', '),
                        customImage: tripData.image.startsWith('/uploads/') ? tripData.image : ''
                    });
                    setImageMode(tripData.image.startsWith('/uploads/') ? 'custom' : 'auto');
                } else {
                    // Trip not found, redirect to main page
                    router.push('/');
                }
            } catch (error) {
                console.error('Error fetching trip:', error);
                router.push('/');
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchTrip();
    }, [resolvedParams.id, router]);

    const handleSave = async () => {
        if (!trip) return;

        try {
            // Determine which image to use
            let imagePath = '';
            if (imageMode === 'custom' && editFormData.customImage) {
                imagePath = editFormData.customImage;
            } else {
                imagePath = getDestinationImage(editFormData.name);
            }

            const updatedTrip = {
                name: editFormData.name,
                country: editFormData.country,
                description: editFormData.description,
                startDate: editFormData.startDate,
                endDate: editFormData.endDate,
                image: imagePath,
                attractions: editFormData.attractions
                    .split(',')
                    .map(attraction => attraction.trim())
                    .filter(attraction => attraction.length > 0)
            };

            const response = await fetch(`/api/trips/${trip.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTrip),
            });

            const result = await response.json();

            if (result.success) {
                setTrip(result.data);
                setIsEditing(false);
            } else {
                throw new Error(result.error || 'Failed to update trip');
            }
        } catch (error) {
            console.error('Error updating trip:', error);
            // You might want to show an error message to the user
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (imageUrl: string) => {
        setEditFormData(prev => ({
            ...prev,
            customImage: imageUrl
        }));
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric'
        });
    };

    if (isLoading || !trip) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading trip details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with back button */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => router.push('/')}
                            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Trips
                        </button>
                        <div className="flex space-x-2">
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                                >
                                    Edit Trip
                                </button>
                            ) : (
                                <div className="space-x-2">
                                    <button
                                        onClick={handleSave}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-4xl mx-auto px-6 py-8">
                {!isEditing ? (
                    // View mode
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Image */}
                            <div className="lg:w-1/3">
                                <div className="w-full h-64 lg:h-80 rounded-lg overflow-hidden">
                                    <Image
                                        src={trip.image}
                                        alt={trip.name}
                                        width={400}
                                        height={320}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Trip details */}
                            <div className="lg:w-2/3">
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">{trip.name}</h1>
                                <p className="text-xl text-gray-600 mb-4">{trip.country}</p>
                                
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                                    <p className="text-gray-700 leading-relaxed">{trip.description}</p>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Travel Dates</h3>
                                    <p className="text-gray-700">
                                        {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                                    </p>
                                </div>

                                {trip.attractions.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Attractions</h3>
                                        <ul className="list-disc list-inside space-y-1">
                                            {trip.attractions.map((attraction, index) => (
                                                <li key={index} className="text-gray-700">{attraction}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    // Edit mode
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Edit Trip Details</h2>
                        
                        <form className="space-y-6">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Destination Name
                                </label>
                                <input
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={editFormData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                                    Country
                                </label>
                                <input
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={editFormData.country}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            {/* Image Selection */}
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Photo</label>
                                
                                <div className="flex space-x-1 mb-3">
                                    <button
                                        type="button"
                                        onClick={() => setImageMode('auto')}
                                        className={`px-3 py-1 text-sm rounded ${
                                            imageMode === 'auto' 
                                            ? 'bg-blue-500 text-white' 
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        Auto-detect
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setImageMode('custom')}
                                        className={`px-3 py-1 text-sm rounded ${
                                            imageMode === 'custom' 
                                            ? 'bg-blue-500 text-white' 
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        Upload custom
                                    </button>
                                </div>

                                {imageMode === 'custom' && (
                                    <ImageUpload
                                        onImageUpload={handleImageUpload}
                                        currentImage={editFormData.customImage}
                                    />
                                )}

                                {/* Image Preview */}
                                {imageMode === 'custom' && editFormData.customImage && (
                                    <div className="mt-3">
                                        <div className="w-32 h-32 border border-gray-300 rounded overflow-hidden">
                                            <Image
                                                src={editFormData.customImage}
                                                alt="Preview"
                                                width={128}
                                                height={128}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">Custom uploaded image</p>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                    id="description"
                                    name="description"
                                    rows={4}
                                    value={editFormData.description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                                        Start Date
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        value={editFormData.startDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                                        End Date
                                    </label>
                                    <input
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                        type="date"
                                        id="endDate"
                                        name="endDate"
                                        value={editFormData.endDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="attractions">
                                    Attractions (comma-separated)
                                </label>
                                <input
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="attractions"
                                    name="attractions"
                                    placeholder="e.g., Eiffel Tower, Louvre Museum, Notre-Dame"
                                    value={editFormData.attractions}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}