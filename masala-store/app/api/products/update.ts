import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function PUT(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({ message: "ID required" }, { status: 400 });

    const data = await req.json();

    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    return NextResponse.json({ product });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
