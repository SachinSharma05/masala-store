import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Pincode from "@/models/Pincode";

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    if (!data.pincode)
      return NextResponse.json({ message: "Pincode required" }, { status: 400 });

    const exists = await Pincode.findOne({ pincode: data.pincode });
    if (exists)
      return NextResponse.json({ message: "Pincode exists" }, { status: 400 });

    const pincode = await Pincode.create(data);

    return NextResponse.json({ pincode }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
