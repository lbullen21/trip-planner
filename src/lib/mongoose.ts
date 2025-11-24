import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

interface GlobalWithMongoose extends Global {
  mongoose?: MongooseCache;
}

// Ensure we use a global variable in development to prevent multiple connections
let cached: MongooseCache = (global as GlobalWithMongoose).mongoose || { conn: null, promise: null };

if (!cached) {
  cached = (global as GlobalWithMongoose).mongoose = { conn: null, promise: null };
}

async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;