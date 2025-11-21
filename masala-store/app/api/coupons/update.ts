import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Coupon from "@/models/Coupon";

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({ message: "ID required" }, { status: 400 });

    const data = await req.json();
    const coupon = await Coupon.findByIdAndUpdate(id, data, { new: true });

    return NextResponse.json({ coupon });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
