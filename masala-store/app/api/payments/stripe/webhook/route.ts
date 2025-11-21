import Stripe from "stripe";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function POST(req: Request) {
  try {
    const body = await req.arrayBuffer();
    const rawBody = Buffer.from(body);

    const signature = req.headers.get("stripe-signature")!;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        endpointSecret
      );
    } catch (err: any) {
      return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    await connectDB();

    if (event.type === "payment_intent.succeeded") {
      const intent = event.data.object as Stripe.PaymentIntent;
      const orderId = intent.metadata.orderId;

      if (orderId) {
        await Order.findByIdAndUpdate(orderId, {
          "payment.status": "completed",
          "payment.transactionId": intent.id,
          status: "confirmed",
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 500 });
  }
}
