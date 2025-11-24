import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongoose';
import Trip, { ITrip } from '../../../models/Trip';

export async function GET() {
  try {
    console.log('=== VERCEL DEBUG START ===');
    console.log('Environment check:', {
      nodeEnv: process.env.NODE_ENV,
      hasMongoUri: !!process.env.MONGODB_URI,
      mongoUriLength: process.env.MONGODB_URI?.length || 0,
      mongoUriStart: process.env.MONGODB_URI?.substring(0, 50) + '...'
    });
    
    console.log('Connecting to database...');
    await connectToDatabase();
    console.log('Database connection successful');
    
    const trips = await Trip.find({}).sort({ createdAt: -1 });
    console.log(`Found ${trips.length} trips`);
    console.log('=== VERCEL DEBUG END ===');
    
    return NextResponse.json({ success: true, data: trips });
  } catch (error) {
    console.error('=== VERCEL ERROR START ===');
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    console.error('=== VERCEL ERROR END ===');
    
    return NextResponse.json(
      { success: false, error: 'Failed to fetch trips', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    // Generate a unique ID for the trip
    const latestTrip = await Trip.findOne().sort({ id: -1 });
    const newId = latestTrip ? latestTrip.id + 1 : 1;
    
    const tripData: Partial<ITrip> = {
      ...body,
      id: newId,
    };
    
    const trip = await Trip.create(tripData);
    return NextResponse.json({ success: true, data: trip }, { status: 201 });
  } catch (error) {
    console.error('Error creating trip:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create trip' },
      { status: 500 }
    );
  }
}