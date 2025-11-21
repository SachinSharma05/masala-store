import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Pincode from "@/models/Pincode";

export async function GET() {
  try {
    await connectDB();
    const pincodes = await Pincode.find().sort({ pincode: 1 });
    return NextResponse.json({ pincodes });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
