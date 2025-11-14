
import AddTrip from "./AddTrip.component";
import TripTile from "./TripTile.component";

const MainBody = () => {
    return (
        <div className="flex flex-row w-full min-h-screen border border-t-0 rounded-b-lg border-gray-400">
            <div className="p-6 bg-white w-3/4 min-h-screen border-r border-gray-400">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Future trips</h1>
                <TripTile />
            </div>
            <div className="p-6 bg-gray-50 w-1/4 min-h-screen">
                <AddTrip />
            </div>
            
        </div>
    );
};

export default MainBody;