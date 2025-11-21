import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Return from "@/models/Return";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ message: "ID required" }, { status: 400 });

    const returnReq = await Return.findById(id)
      .populate("userId", "name email")
      .populate("orderId")
      .populate("products.productId", "name images");

    if (!returnReq)
      return NextResponse.json({ message: "Return not found" }, { status: 404 });

    return NextResponse.json({ return: returnReq });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
