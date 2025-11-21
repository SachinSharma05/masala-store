import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { 
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      orderId 
    } = await req.json();

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature)
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid)
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });

    // Mark order as paid
    if (orderId) {
      await Order.findByIdAndUpdate(orderId, {
        "payment.status": "completed",
        "payment.transactionId": razorpay_payment_id,
        status: "confirmed",
      });
    }

    return NextResponse.json({ success: true, message: "Payment verified" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
