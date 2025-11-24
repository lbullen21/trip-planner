import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongoose';
import Trip, { ITrip } from '../../../models/Trip';

export async function GET() {
  try {
    await connectToDatabase();
    const trips = await Trip.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: trips });
  } catch (error) {
    console.error('Error fetching trips:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch trips' },
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