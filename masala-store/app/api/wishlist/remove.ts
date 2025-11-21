import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Wishlist from "@/models/Wishlist";
import { verifyToken } from "@/utils/jwt";

export async function DELETE(req: Request) {
  try {
    await connectDB();

    const cookie = req.headers.get("cookie");
    const token = cookie?.replace("token=", "");
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user: any = verifyToken(token);
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId)
      return NextResponse.json({ message: "productId required" }, { status: 400 });

    await Wishlist.findOneAndDelete({ userId: user.id, productId });

    return NextResponse.json({ message: "Removed from wishlist" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
