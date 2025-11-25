"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage?: string;
  className?: string;
}

const ImageUpload = ({ onImageUpload, currentImage, className = "" }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Only JPEG, PNG, and WebP are allowed.');
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('File too large. Maximum size is 5MB.');
      return;
    }

    setError(null);
    setIsUploading(true);

    // Show preview immediately
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Upload failed');
      }

      // Clean up preview URL and use the uploaded image
      URL.revokeObjectURL(previewUrl);
      setPreview(result.imageUrl);
      onImageUpload(result.imageUrl);

    } catch (error) {
      console.error('Upload error:', error);
      setError(error instanceof Error ? error.message : 'Upload failed');
      setPreview(currentImage || null);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setPreview(null);
    setError(null);
    onImageUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      {/* Upload area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
        {preview ? (
          // Image preview
          <div className="relative">
            <div className="w-full h-32 relative rounded overflow-hidden">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-600">
                {isUploading ? 'Uploading...' : 'Image selected'}
              </span>
              <div className="space-x-2">
                <button
                  type="button"
                  onClick={triggerFileSelect}
                  disabled={isUploading}
                  className="text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={removeImage}
                  disabled={isUploading}
                  className="text-sm text-red-600 hover:text-red-700 disabled:text-gray-400"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Upload prompt
          <div 
            className="text-center cursor-pointer py-8"
            onClick={triggerFileSelect}
          >
            <div className="text-gray-400 mb-2">
              <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-gray-600">
              {isUploading ? 'Uploading...' : 'Click to upload image'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, WebP up to 5MB
            </p>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded p-2">
          {error}
        </div>
      )}

      {/* Upload status */}
      {isUploading && (
        <div className="flex items-center space-x-2 text-sm text-blue-600">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span>Uploading image...</span>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;