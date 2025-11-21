import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();

    const lowStock = await Product.find({ stock: { $lte: 10 } })
      .select("name stock images slug")
      .sort({ stock: 1 });    

    return NextResponse.json({ lowStock });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
