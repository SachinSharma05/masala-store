import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    let filters: any = {};

    if (search) filters.name = { $regex: search, $options: "i" };
    if (category) filters.category = category;
    if (featured) filters.featured = featured === "true";

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(filters).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Product.countDocuments(filters),
    ]);

    return NextResponse.json({
      products,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
