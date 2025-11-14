
const AddTrip = () => {
    return (
        <div className="border border-gray-200 rounded-lg p-4 mb-4 text-black hover:shadow-lg transition-all duration-200 bg-white">
            <h2 className="text-xl font-bold mb-2">Add New Trip</h2>
            {/* Form fields for adding a new trip */}
            <form className="border border-gray-300 rounded-lg p-4 bg-white"> 
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="destination">Destination</label>
                    <input className="w-full border border-gray-300 rounded px-3 py-2" type="text" id="destination" name="destination" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="startDate">Start Date</label>
                    <input className="w-full border border-gray-300 rounded px-3 py-2" type="date" id="startDate" name="startDate" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="endDate">End Date</label>
                    <input className="w-full border border-gray-300 rounded px-3 py-2" type="date" id="endDate" name="endDate" />
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Add Trip</button>
            </form>
        </div>
    );
};
export default AddTrip;