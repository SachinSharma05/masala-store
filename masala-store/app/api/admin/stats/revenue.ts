import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET() {
  try {
    await connectDB();

    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    const [today, week, month, total] = await Promise.all([
      Order.aggregate([
        { $match: { createdAt: { $gte: startOfDay } } },
        { $group: { _id: null, revenue: { $sum: "$total" } } },
      ]),
      Order.aggregate([
        { $match: { createdAt: { $gte: weekAgo } } },
        { $group: { _id: null, revenue: { $sum: "$total" } } },
      ]),
      Order.aggregate([
        { $match: { createdAt: { $gte: monthAgo } } },
        { $group: { _id: null, revenue: { $sum: "$total" } } },
      ]),
      Order.aggregate([
        { $group: { _id: null, revenue: { $sum: "$total" } } },
      ]),
    ]);

    return NextResponse.json({
      today: today[0]?.revenue || 0,
      week: week[0]?.revenue || 0,
      month: month[0]?.revenue || 0,
      total: total[0]?.revenue || 0,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
