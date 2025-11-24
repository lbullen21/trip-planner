import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongoose';
import Trip from '../../../../models/Trip';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    const resolvedParams = await params;
    const trip = await Trip.findOne({ id: parseInt(resolvedParams.id) });
    
    if (!trip) {
      return NextResponse.json(
        { success: false, error: 'Trip not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: trip });
  } catch (error) {
    console.error('Error fetching trip:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch trip' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    const resolvedParams = await params;
    const body = await request.json();
    
    const trip = await Trip.findOneAndUpdate(
      { id: parseInt(resolvedParams.id) },
      body,
      { new: true, runValidators: true }
    );
    
    if (!trip) {
      return NextResponse.json(
        { success: false, error: 'Trip not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: trip });
  } catch (error) {
    console.error('Error updating trip:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update trip' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    const resolvedParams = await params;
    
    const trip = await Trip.findOneAndDelete({ id: parseInt(resolvedParams.id) });
    
    if (!trip) {
      return NextResponse.json(
        { success: false, error: 'Trip not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: trip });
  } catch (error) {
    console.error('Error deleting trip:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete trip' },
      { status: 500 }
    );
  }
}