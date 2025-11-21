import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Wishlist from "@/models/Wishlist";
import { verifyToken } from "@/utils/jwt";

export async function POST(req: Request) {
  try {
    await connectDB();

    const cookie = req.headers.get("cookie");
    const token = cookie?.replace("token=", "");
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user: any = verifyToken(token);
    const { productId } = await req.json();

    if (!productId)
      return NextResponse.json({ message: "productId required" }, { status: 400 });

    const item = await Wishlist.findOne({ userId: user.id, productId });

    if (item)
      return NextResponse.json({ message: "Already in wishlist" }, { status: 200 });

    const wishlist = await Wishlist.create({
      userId: user.id,
      productId,
    });

    return NextResponse.json({ wishlist }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
