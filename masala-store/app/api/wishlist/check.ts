import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Wishlist from "@/models/Wishlist";
import { verifyToken } from "@/utils/jwt";

export async function GET(req: Request) {
  try {
    await connectDB();

    const cookie = req.headers.get("cookie");
    const token = cookie?.replace("token=", "");
    if (!token)
      return NextResponse.json({ inWishlist: false }, { status: 200 });

    const user: any = verifyToken(token);
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId)
      return NextResponse.json({ inWishlist: false }, { status: 200 });

    const item = await Wishlist.findOne({ userId: user.id, productId });

    return NextResponse.json({ inWishlist: !!item });
  } catch (err: any) {
    return NextResponse.json({ inWishlist: false });
  }
}
