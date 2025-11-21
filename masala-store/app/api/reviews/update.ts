import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Review from "@/models/Review";
import { verifyToken } from "@/utils/jwt";

export async function PUT(req: Request) {
  try {
    await connectDB();

    const token = req.headers.get("cookie")?.replace("token=", "");
    const user: any = verifyToken(token);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const data = await req.json();

    const updated = await Review.findOneAndUpdate(
      { _id: id, userId: user.id },
      data,
      { new: true }
    );

    return NextResponse.json({ updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
