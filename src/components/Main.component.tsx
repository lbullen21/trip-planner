
import TripTile from "./TripTile.component";

const MainBody = () => {

    return (
    <div className="w-full min-h-screen border border-t-0 rounded-b-lg border-gray-400">
        <div className="p-6 bg-white w-3/4 min-h-screen border-r border-gray-400">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Trip Planner</h1>
        <TripTile />
        </div>
    </div>
    );
};

export default MainBody;