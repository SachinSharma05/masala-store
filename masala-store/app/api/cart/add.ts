import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Cart from "@/models/Cart";
import { verifyToken } from "@/utils/jwt";

export async function POST(req: Request) {
  try {
    await connectDB();

    const cookie = req.headers.get("cookie");
    const token = cookie?.replace("token=", "");
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user: any = verifyToken(token);
    const { productId, qty } = await req.json();

    if (!productId || !qty)
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });

    let cart = await Cart.findOne({ userId: user.id });

    // Create new cart
    if (!cart) {
      cart = await Cart.create({
        userId: user.id,
        items: [{ productId, qty }],
      });
    } else {
      // Check if product exists
      const existing = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existing) {
        existing.qty += qty; // Increase qty
      } else {
        cart.items.push({ productId, qty });
      }

      await cart.save();
    }

    return NextResponse.json({ cart });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
