import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function PUT(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const data = await req.json();

    if (!id)
      return NextResponse.json({ message: "Order ID required" }, { status: 400 });

    const order = await Order.findByIdAndUpdate(id, data, { new: true });

    return NextResponse.json({ order });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
