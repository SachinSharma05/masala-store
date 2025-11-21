import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Pincode from "@/models/Pincode";

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const data = await req.json();

    const updated = await Pincode.findByIdAndUpdate(id, data, { new: true });

    return NextResponse.json({ updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
