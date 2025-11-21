import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Coupon from "@/models/Coupon";

export async function GET() {
  try {
    await connectDB();
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    return NextResponse.json({ coupons });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
