import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Return from "@/models/Return";
import { verifyToken } from "@/utils/jwt";

export async function POST(req: Request) {
  try {
    await connectDB();

    const cookie = req.headers.get("cookie");
    const token = cookie?.replace("token=", "");
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user: any = verifyToken(token);

    const data = await req.json();
    const { orderId, products, reason, description, images, refundAmount } = data;

    if (!orderId || !products || !reason)
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });

    const returnReq = await Return.create({
      userId: user.id,
      orderId,
      products,
      reason,
      description,
      images,
      refund: { amount: refundAmount },
    });

    return NextResponse.json({ return: returnReq }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
