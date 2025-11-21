import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET() {
  try {
    await connectDB();

    // Prepare last 7 days range
    const now = new Date();
    const startDate = new Date();
    startDate.setDate(now.getDate() - 6); // last 7 days including today

    // Aggregate revenue grouped by date
    const data = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          sales: { $sum: "$total" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Prepare last 7 days array with default 0
    const days: { day: string; date: string; sales: number }[] = [];
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);

      const formatted = d.toISOString().split("T")[0];

      const found = data.find((x: any) => x._id === formatted);

      days.push({
        day: weekday[d.getDay()],
        date: formatted,
        sales: found?.sales || 0,
      });
    }

    return NextResponse.json({ data: days });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
