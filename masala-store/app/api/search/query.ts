import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";

/**
 * query params:
 *  q - search string
 *  type - 'product' | 'category' | 'pickle' | 'all'
 *  limit - number
 */

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") || "").trim();
    const type = (searchParams.get("type") || "all").toLowerCase();
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50);

    if (!q) {
      return NextResponse.json({ results: [] });
    }

    const regex = { $regex: q, $options: "i" };

    const results: any = {};

    if (type === "product" || type === "all" || type === "pickle") {
      // If type === 'pickle' we filter category or tag equals 'pickle'
      const productFilter: any =
        type === "pickle"
          ? { $or: [{ category: "pickle" }, { tags: "pickle" }], name: regex }
          : { $or: [{ name: regex }, { description: regex }, { slug: regex }] };

      results.products = await Product.find(productFilter)
        .select("name price images slug category featured")
        .limit(limit)
        .lean();
    }

    if (type === "category" || type === "all") {
      results.categories = await Category.find({
        name: regex,
      })
        .select("name slug image")
        .limit(limit)
        .lean();
    }

    return NextResponse.json({ results });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
