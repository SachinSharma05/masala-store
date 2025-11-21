import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Wishlist from "@/models/Wishlist";
import { verifyToken } from "@/utils/jwt";

export async function GET(req: Request) {
  try {
    await connectDB();

    const cookie = req.headers.get("cookie");
    const token = cookie?.replace("token=", "");
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user: any = verifyToken(token);

    const items = await Wishlist.find({ userId: user.id }).populate(
      "productId",
      "name price images slug"
    );

    return NextResponse.json({ items });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
