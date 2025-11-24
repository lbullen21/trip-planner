import mongoose from 'mongoose';

export interface ITrip {
  _id?: string;
  id: number;
  name: string;
  country: string;
  description: string;
  startDate: string;
  endDate: string;
  image: string;
  attractions: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const TripSchema = new mongoose.Schema<ITrip>(
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
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Prevent model re-compilation during development
export default mongoose.models.Trip || mongoose.model<ITrip>('Trip', TripSchema);