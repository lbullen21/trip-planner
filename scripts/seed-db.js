import connectToDatabase from '../src/lib/mongoose';
import Trip from '../src/models/Trip';

const sampleTrips = [
  {
    id: 1,
    name: "Paris",
    country: "France", 
    description: "The City of Light awaits with its iconic landmarks, world-class museums, and romantic atmosphere.",
    startDate: "2024-06-15",
    endDate: "2024-06-22",
    image: "/paris.jpg",
    attractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral", "Champs-Élysées"]
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japan",
    description: "Experience the perfect blend of ancient tradition and cutting-edge modernity in Japan's vibrant capital.",
    startDate: "2024-08-10",
    endDate: "2024-08-18", 
    image: "/tokyo.jpg",
    attractions: ["Senso-ji Temple", "Tokyo Skytree", "Shibuya Crossing", "Imperial Palace"]
  },
  {
    id: 3,
    name: "New York City",
    country: "United States",
    description: "The city that never sleeps offers endless entertainment, iconic landmarks, and diverse neighborhoods to explore.",
    startDate: "2024-09-05",
    endDate: "2024-09-12",
    image: "/nyc.jpg", 
    attractions: ["Statue of Liberty", "Central Park", "Times Square", "Brooklyn Bridge", "9/11 Memorial"]
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to database...');
    await connectToDatabase();
    
    console.log('Clearing existing trips...');
    await Trip.deleteMany({});
    
    console.log('Adding sample trips...');
    const createdTrips = await Trip.insertMany(sampleTrips);
    
    console.log(`Successfully seeded ${createdTrips.length} trips:`);
    createdTrips.forEach(trip => {
      console.log(`- ${trip.name}, ${trip.country}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();