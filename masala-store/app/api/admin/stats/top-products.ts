import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET() {
  try {
    await connectDB();

    const topProducts = await Order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.productId",
          name: { $first: "$products.name" },
          image: { $first: "$products.image" },
          totalSold: { $sum: "$products.qty" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 10 },
    ]);

    return NextResponse.json({ topProducts });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
