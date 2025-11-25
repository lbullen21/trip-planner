
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Destination } from '../utils/types';
import ImageUpload from './ImageUpload.component';

interface AddTripProps {
    onAddTrip: (newTrip: Omit<Destination, 'id'>) => void;
}

const AddTrip = ({ onAddTrip }: AddTripProps) => {
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        description: '',
        startDate: '',
        endDate: '',
        attractions: '',
        customImage: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Require image upload
        if (!formData.customImage) {
            alert('Please upload an image for your trip.');
            return;
        }
        
        // Create a new destination object (without ID - API will generate it)
        const newTrip: Omit<Destination, 'id'> = {
            name: formData.name,
            country: formData.country,
            description: formData.description,
            startDate: formData.startDate,
            endDate: formData.endDate,
            image: formData.customImage, // Use uploaded image
            attractions: formData.attractions.split(',').map(attraction => attraction.trim()).filter(attraction => attraction.length > 0)
        };

        onAddTrip(newTrip);
        
        // Reset form
        setFormData({
            name: '',
            country: '',
            description: '',
            startDate: '',
            endDate: '',
            attractions: '',
            customImage: ''
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (imageUrl: string) => {
        setFormData(prev => ({
            ...prev,
            customImage: imageUrl
        }));
    };

    return (
        <div className="border border-gray-200 rounded-lg p-4 mb-4 text-black hover:shadow-lg transition-all duration-200 bg-white">
            <h2 className="text-xl font-bold mb-2">Add New Trip</h2>
            <form onSubmit={handleSubmit} className="border border-gray-300 rounded-lg p-4 bg-white"> 
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="name">Destination Name</label>
                    <input 
                        className="w-full border border-gray-300 rounded px-3 py-2" 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Barcelona, New York, Rome"
                        required
                    />
                </div>

                {/* Image Upload */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Photo *</label>
                    <p className="text-sm text-gray-500 mb-3">Upload an image for your trip</p>
                    
                    <ImageUpload
                        onImageUpload={handleImageUpload}
                        currentImage={formData.customImage}
                    />

                    {/* Image Preview */}
                    {formData.customImage && (
                        <div className="mt-3">
                            <div className="w-32 h-32 border border-gray-300 rounded overflow-hidden">
                                <Image
                                    src={formData.customImage}
                                    alt="Preview"
                                    width={128}
                                    height={128}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                                Uploaded image
                            </p>
                        </div>
                    )}
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="country">Country</label>
                    <input 
                        className="w-full border border-gray-300 rounded px-3 py-2" 
                        type="text" 
                        id="country" 
                        name="country" 
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
                    <textarea 
                        className="w-full border border-gray-300 rounded px-3 py-2" 
                        id="description" 
                        name="description" 
                        rows={3}
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="startDate">Start Date</label>
                    <input 
                        className="w-full border border-gray-300 rounded px-3 py-2" 
                        type="date" 
                        id="startDate" 
                        name="startDate" 
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="endDate">End Date</label>
                    <input 
                        className="w-full border border-gray-300 rounded px-3 py-2" 
                        type="date" 
                        id="endDate" 
                        name="endDate" 
                        value={formData.endDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="attractions">
                        Attractions (comma-separated)
                    </label>
                    <input 
                        className="w-full border border-gray-300 rounded px-3 py-2" 
                        type="text" 
                        id="attractions" 
                        name="attractions" 
                        placeholder="e.g., Eiffel Tower, Louvre Museum, Notre-Dame"
                        value={formData.attractions}
                        onChange={handleInputChange}
                    />
                </div>
                
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors" 
                    type="submit"
                >
                    Add Trip
                </button>
            </form>
        </div>
    );
};

export default AddTrip;