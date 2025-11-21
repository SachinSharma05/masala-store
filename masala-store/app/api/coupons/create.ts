import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Coupon from "@/models/Coupon";

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    if (!data.code || !data.type || !data.discount)
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });

    const exists = await Coupon.findOne({ code: data.code });
    if (exists)
      return NextResponse.json({ message: "Coupon already exists" }, { status: 400 });

    const coupon = await Coupon.create(data);

    return NextResponse.json({ coupon }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
