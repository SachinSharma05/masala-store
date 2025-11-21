import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    if (!data.name || !data.price)
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });

    const slug = data.slug || data.name.toLowerCase().replace(/\s+/g, "-");

    const exists = await Product.findOne({ slug });
    if (exists)
      return NextResponse.json({ message: "Product slug exists" }, { status: 400 });

    const product = await Product.create({ ...data, slug });

    return NextResponse.json({ product }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
