import React from 'react';



export const Navbar: React.FC = () => {
  return (
    <nav className="navbar w-full text-black flex justify-between p-6 mt-10 border border-gray-800 rounded-lg">
      <div className="flex items-center">Travel Planner</div>
      <button className="bg-blue-500 text-white px-6 py-2 rounded">New Trip</button>
    </nav>
  );
};

export default Navbar;