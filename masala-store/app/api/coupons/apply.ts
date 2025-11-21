import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Coupon from "@/models/Coupon";
import { verifyToken } from "@/utils/jwt";

export async function POST(req: Request) {
  try {
    await connectDB();

    const cookie = req.headers.get("cookie");
    const token = cookie?.replace("token=", "");
    if (!token)
      return NextResponse.json({ message: "Login required" }, { status: 401 });

    const user: any = verifyToken(token);
    const { code, total } = await req.json();

    if (!code || !total)
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });

    const coupon = await Coupon.findOne({ code });
    if (!coupon)
      return NextResponse.json({ message: "Invalid coupon" }, { status: 400 });

    if (coupon.status !== "active")
      return NextResponse.json({ message: "Coupon inactive" }, { status: 400 });

    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date())
      return NextResponse.json({ message: "Coupon expired" }, { status: 400 });

    if (coupon.usedBy.includes(user.id))
      return NextResponse.json({ message: "Already used" }, { status: 400 });

    if (total < coupon.minOrder)
      return NextResponse.json(
        { message: `Minimum order ₹${coupon.minOrder}` },
        { status: 400 }
      );

    let discountAmt = 0;

    if (coupon.type === "percentage") {
      discountAmt = (total * coupon.discount) / 100;
      if (coupon.maxDiscount)
        discountAmt = Math.min(discountAmt, coupon.maxDiscount);
    } else {
      discountAmt = coupon.discount;
    }

    const finalTotal = Math.max(total - discountAmt, 0);

    return NextResponse.json({
      valid: true,
      discount: discountAmt,
      finalTotal,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
