// scripts/seed-db.ts
import mongoose from 'mongoose';
import { config } from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const MONGODB_URI = process.env.MONGODB_URI;

// Trip Schema
const TripSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    attractions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.models.Trip || mongoose.model('Trip', TripSchema);

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
    await mongoose.connect(MONGODB_URI);
    
    console.log('Clearing existing trips...');
    await Trip.deleteMany({});
    
    console.log('Adding sample trips...');
    const createdTrips = await Trip.insertMany(sampleTrips);
    
    console.log(`Successfully seeded ${createdTrips.length} trips:`);
    createdTrips.forEach(trip => {
      console.log(`- ${trip.name}, ${trip.country}`);
    });
    
    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();