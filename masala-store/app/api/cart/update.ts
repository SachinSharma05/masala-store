import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Cart from "@/models/Cart";
import { verifyToken } from "@/utils/jwt";

export async function PUT(req: Request) {
  try {
    await connectDB();

    const cookie = req.headers.get("cookie");
    const token = cookie?.replace("token=", "");
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user: any = verifyToken(token);
    const { productId, qty } = await req.json();

    let cart = await Cart.findOne({ userId: user.id });
    if (!cart)
      return NextResponse.json({ message: "Cart empty" }, { status: 400 });

    cart.items = cart.items.map((item) =>
      item.productId.toString() === productId ? { ...item, qty } : item
    );

    await cart.save();

    return NextResponse.json({ cart });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
