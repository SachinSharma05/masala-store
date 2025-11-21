import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug)
      return NextResponse.json({ message: "Slug required" }, { status: 400 });

    const product = await Product.findOne({ slug });

    if (!product)
      return NextResponse.json({ message: "Not found" }, { status: 404 });

    return NextResponse.json({ product });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
