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
    description: "The City of Light",
    startDate: "2024-09-01",
    endDate: "2024-09-07",
    image: "/images/Paris.jpeg",
    attractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame"]
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japan", 
    startDate: "2024-10-10",
    endDate: "2024-10-20",
    image: "/images/Tokyo.jpeg",
    description: "A blend of tradition and modernity",
    attractions: ["Shibuya Crossing", "Sensoji Temple", "Tokyo Tower"]
  },
  {
    id: 3,
    name: "London",
    country: "United Kingdom",
    description: "A historic city blending royal heritage with modern culture",
    startDate: "2025-09-15",
    endDate: "2025-09-22",
    image: "/images/London.jpeg",
    attractions: ["Big Ben", "Tower Bridge", "British Museum", "Buckingham Palace"]
  },
  {
    id: 4,
    name: "Edinburgh",
    country: "Scotland",
    description: "A medieval city with stunning architecture and rich history",
    startDate: "2025-10-05",
    endDate: "2025-10-12",
    image: "/images/Edinburgh.jpeg",
    attractions: ["Edinburgh Castle", "Royal Mile", "Arthur's Seat", "Holyrood Palace"]
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