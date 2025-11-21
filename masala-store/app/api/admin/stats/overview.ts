import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Product from "@/models/Product";
import Order from "@/models/Order";

export async function GET() {
  try {
    await connectDB();

    const [users, products, orders, revenueData] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        { $group: { _id: null, totalRevenue: { $sum: "$total" } } },
      ]),
    ]);

    const orderStatus = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    return NextResponse.json({
      users,
      products,
      orders,
      totalRevenue: revenueData[0]?.totalRevenue || 0,
      orderStatus, // {pending, confirmed, shipped, delivered}
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
