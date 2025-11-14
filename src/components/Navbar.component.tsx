
import React from 'react';
import Image from 'next/image';

const Navbar: React.FC = () => {
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
      <button className="bg-blue-700 text-white px-6 py-2 rounded">Share</button>
    </nav>
  );
};

export default Navbar;