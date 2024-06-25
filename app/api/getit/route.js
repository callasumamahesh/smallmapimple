import connectToDatabase from "@/app/lib/database";
import userLocation from "@/app/models/details";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  try {
    const locations = await userLocation.find({});
return NextResponse.json({ data:locations }, { status: 201 });
// res.status(200).json({ success: true, data: locations });
  } catch (error) {
return NextResponse.json({ data:'false' }, { status: 400 });
// res.status(400).json({ success: false });
  }
//   switch (req.method) {
//     case 'GET':
//       try {
//         const locations = await userLocation.find({});
//     return NextResponse.json({ data:locations }, { status: 201 });
//     // res.status(200).json({ success: true, data: locations });
//       } catch (error) {
//     return NextResponse.json({ data:'false' }, { status: 400 });
//     // res.status(400).json({ success: false });
//       }
//       break;
//     default:
//       res.status(400).json({ success: false });
//       break;
//   }
}