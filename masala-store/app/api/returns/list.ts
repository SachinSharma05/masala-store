import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Return from "@/models/Return";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let filters: any = {};
    if (status) filters.status = status;

    const returns = await Return.find(filters)
      .populate("userId", "name email")
      .populate("orderId", "total")
      .populate("products.productId", "name images")
      .sort({ createdAt: -1 });

    return NextResponse.json({ returns });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
