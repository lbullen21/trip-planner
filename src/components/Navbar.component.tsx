"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    // Prevent multiple simultaneous share operations
    if (isSharing) {
      return;
    }

    if (navigator.share) {
      try {
        setIsSharing(true);
        await navigator.share({
          title: 'PlanIT - Plan your next trip with ease',
          text: 'Check out this amazing trip planning app!',
          url: window.location.href,
        });
        console.log('Content shared successfully');
      } catch (error) {
        console.error('Error sharing content:', error);
      } finally {
        setIsSharing(false);
      }
    } else {
      console.log('Web Share API not supported in this browser.');
      // You can implement a fallback here, like a modal with copy-to-clipboard functionality
    }
  };
  return (
    <nav className="navbar w-full text-black flex justify-between p-6 mt-10 border bg-white border-gray-400 rounded-t-lg">
      <div className="flex items-center space-x-3">
        <Image 
          src="/globe.svg" 
          alt="Globe icon" 
          width={50} 
          height={50} 
          className="text-gray-700"
        />
        <h1 className="text-3xl font-bold">PlanIt</h1>
      </div>
      <button 
        className={`px-6 py-2 rounded text-white transition-colors ${
          isSharing 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-700 hover:bg-blue-800'
        }`}
        onClick={handleShare}
        disabled={isSharing}
      >
        {isSharing ? 'Sharing...' : 'Share'}
      </button>
    </nav>
  );
};

export default Navbar;