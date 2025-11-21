import { NextResponse } from "next/server";
import Stripe from "stripe";
import { verifyToken } from "@/utils/jwt";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2022-11-15" });

export async function POST(req: Request) {
  try {
    await connectDB();
    const cookie = req.headers.get("cookie");
    const token = cookie?.replace("token=", "");
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user: any = verifyToken(token);
    const { amount, currency = "inr", orderId, metadata } = await req.json();

    if (!amount) return NextResponse.json({ message: "Amount required" }, { status: 400 });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: { userId: user.id, orderId: orderId || "", ...(metadata || {}) },
      automatic_payment_methods: { enabled: true },
    });

    // Optionally save the client_secret / id in your Order record
    if (orderId) {
      await Order.findByIdAndUpdate(orderId, {
        "payment.transactionId": paymentIntent.id,
        "payment.status": "pending",
      });
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
