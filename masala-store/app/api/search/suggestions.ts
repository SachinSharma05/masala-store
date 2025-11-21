import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";

export async function GET(req: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") || "").trim();

    if (!q) return NextResponse.json({ suggestions: [] });

    const regex = { $regex: "^" + q, $options: "i" };

    // Fetch in parallel
    const [products, categories, pickleItems] = await Promise.all([
      Product.find({ name: regex }).select("name slug").limit(5),
      Category.find({ name: regex }).select("name slug").limit(5),
      Product.find({
        category: "pickle",
        name: regex,
      }).select("name slug").limit(5),
    ]);

    const suggestions = [
      ...products.map((p) => ({ type: "product", name: p.name, slug: p.slug })),
      ...categories.map((c) => ({ type: "category", name: c.name, slug: c.slug })),
      ...pickleItems.map((p) => ({ type: "pickle", name: p.name, slug: p.slug })),
    ];

    return NextResponse.json({ suggestions });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
