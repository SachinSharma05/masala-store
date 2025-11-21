import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({ message: "Order ID required" }, { status: 400 });

    const order = await Order.findById(id).populate("userId", "name email");

    if (!order)
      return NextResponse.json({ message: "Order not found" }, { status: 404 });

    return NextResponse.json({ order });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
