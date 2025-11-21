import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    let filters: any = {};
    if (status) filters.status = status;

    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      Order.find(filters)
        .populate("userId", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Order.countDocuments(filters),
    ]);

    return NextResponse.json({
      orders,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
