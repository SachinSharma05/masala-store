import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { verifyToken } from "@/utils/jwt";

export async function POST(req: Request) {
  try {
    await connectDB();

    const cookie = req.headers.get("cookie");
    const token = cookie?.replace("token=", "");
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user: any = verifyToken(token);

    const { amount, currency = "INR", receiptId, orderId } = await req.json();
    if (!amount) return NextResponse.json({ message: "Amount required" }, { status: 400 });

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    // amount in paise
    const options = {
      amount: Math.round(amount * 100),
      currency,
      receipt: receiptId || `rcpt_${Date.now()}`,
      payment_capture: 1,
    };

    const rOrder = await razorpay.orders.create(options);

    // optionally link this razorpay order id to your Order model
    if (orderId) {
      await Order.findByIdAndUpdate(orderId, { "payment.transactionId": rOrder.id });
    }

    return NextResponse.json({ order: rOrder });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
