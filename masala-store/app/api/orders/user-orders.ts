import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { verifyToken } from "@/utils/jwt";

export async function GET(req: Request) {
  try {
    await connectDB();

    const token = req.headers.get("cookie")?.replace("token=", "");
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user: any = verifyToken(token);

    const orders = await Order.find({ userId: user.id }).sort({ createdAt: -1 });

    return NextResponse.json({ orders });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
