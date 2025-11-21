import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Cart from "@/models/Cart";
import { verifyToken } from "@/utils/jwt";

export async function DELETE(req: Request) {
  try {
    await connectDB();

    const cookie = req.headers.get("cookie");
    const token = cookie?.replace("token=", "");
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user: any = verifyToken(token);
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    let cart = await Cart.findOne({ userId: user.id });
    if (!cart) return NextResponse.json({ message: "Cart empty" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    return NextResponse.json({ cart });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
