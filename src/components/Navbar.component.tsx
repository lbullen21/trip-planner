
const Navbar: React.FC = () => {
  return (
    <nav className="navbar w-full text-black flex justify-between p-6 mt-10 border bg-white border-gray-400 rounded-t-lg">
      <div className="flex items-center">Travel Planner</div>
      <button className="bg-gray-900 text-white px-6 py-2 rounded">Sign in</button>
    </nav>
  );
};

export default Navbar;