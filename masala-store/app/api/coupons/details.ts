import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Coupon from "@/models/Coupon";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code)
      return NextResponse.json({ message: "Code required" }, { status: 400 });

    const coupon = await Coupon.findOne({ code });

    if (!coupon)
      return NextResponse.json({ message: "Coupon not found" }, { status: 404 });

    return NextResponse.json({ coupon });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
