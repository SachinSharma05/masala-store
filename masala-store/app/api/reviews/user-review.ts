import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Review from "@/models/Review";
import { verifyToken } from "@/utils/jwt";

export async function GET(req: Request) {
  try {
    await connectDB();

    const token = req.headers.get("cookie")?.replace("token=", "");
    if (!token) return NextResponse.json({ review: null });

    const user: any = verifyToken(token);
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    const review = await Review.findOne({ productId, userId: user.id });

    return NextResponse.json({ review });
  } catch (err: any) {
    return NextResponse.json({ review: null });
  }
}
