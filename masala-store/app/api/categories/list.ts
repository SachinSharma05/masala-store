import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    let filters: any = {};
    if (search) filters.name = { $regex: search, $options: "i" };
    if (status) filters.status = status;

    const skip = (page - 1) * limit;

    const [categories, total] = await Promise.all([
      Category.find(filters).skip(skip).limit(limit).sort({ order: 1 }),
      Category.countDocuments(filters),
    ]);

    return NextResponse.json({
      categories,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
