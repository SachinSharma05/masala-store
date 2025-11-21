import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Pincode from "@/models/Pincode";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const pincode = searchParams.get("pincode");

    if (!pincode)
      return NextResponse.json({ message: "Pincode required" }, { status: 400 });

    const data = await Pincode.findOne({ pincode });

    if (!data)
      return NextResponse.json(
        { serviceable: false, message: "Not serviceable" },
        { status: 200 }
      );

    return NextResponse.json({
      serviceable: data.isServiceable,
      cod: data.cod,
      deliveryCharge: data.deliveryCharge,
      estimatedDays: data.estimatedDays,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
