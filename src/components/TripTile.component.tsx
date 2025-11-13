import { destinations } from "../lib/data";
import Image from "next/image";

const TripTile = () => {
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric'
        });
    };
    return (
        <>
        {destinations.map((destination) =>(
        <div className="border border-gray-200 rounded-lg p-4 mb-4 text-black" key={destination.id}>
            <h2 className="text-xl font-bold">{destination.name}</h2>
            <div className="flex flex-row">
                <Image
                    src={destination.image}
                    alt={destination.name}
                    width={128}
                    height={128}
                    className="w-32 h-32 object-cover rounded-lg mr-4"
                />
                <div className="flex flex-col">
                    <p>{destination.description}</p>
                    <p>
                        {formatDate(destination.startDate)} - {formatDate(destination.endDate)}
                    </p>
                    <h3 className="font-semibold">Attractions:</h3>
                    <ul className="list-disc list-inside">
                        {destination.attractions.map((attraction, index) => (
                            <li key={index}>{attraction}</li>
                        ))}
                    </ul>
                </div>   
            </div>
        </div>
        ))}
        </>
        
        
    );
};

export default TripTile;