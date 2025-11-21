import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Review from "@/models/Review";
import { verifyToken } from "@/utils/jwt";

export async function DELETE(req: Request) {
  try {
    await connectDB();

    const token = req.headers.get("cookie")?.replace("token=", "");
    const user: any = verifyToken(token);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await Review.findOneAndDelete({
      _id: id,
      userId: user.id,
    });

    return NextResponse.json({ message: "Review deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
