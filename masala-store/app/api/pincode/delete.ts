import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Pincode from "@/models/Pincode";

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await Pincode.findByIdAndDelete(id);

    return NextResponse.json({ message: "Pincode deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
