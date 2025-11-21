import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Review from "@/models/Review";

export async function GET(req: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    const reviews = await Review.find({ productId })
      .populate("userId", "name avatar")
      .sort({ createdAt: -1 });

    return NextResponse.json({ reviews });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
