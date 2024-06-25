import connectToDatabase from "@/app/lib/database";
import userLocation from "@/app/models/details";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDatabase();
  try {
    const { image, latitude, longitude, direction } = await req.json();
    console.log('Received Data:', image, latitude, longitude, direction);
    const newLocation = new userLocation({ image, latitude, longitude, direction });
    await newLocation.save();

    return NextResponse.json({ message: 'User Created' }, { status: 201 });
  } catch (error) {
    console.error('Error saving to database:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req) {
  await connectToDatabase();
  try {
    const data = await userLocation.find({});
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching data from database:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
