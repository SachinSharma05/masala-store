import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Review from "@/models/Review";
import { verifyToken } from "@/utils/jwt";

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const token = req.headers.get("cookie")?.replace("token=", "");
    if (!token) return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });

    const user: any = verifyToken(token);
    const data = await req.json();

    const existing = await Review.findOne({
      productId: data.productId,
      userId: user.id,
    });

    if (existing)
      return NextResponse.json(
        { message: "You already reviewed this product" },
        { status: 400 }
      );

    const review = await Review.create({
      userId: user.id,
      ...data,
    });

    return NextResponse.json({ review }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
