import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .limit(10);

    return NextResponse.json({ orders });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
