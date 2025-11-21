import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug)
      return NextResponse.json({ message: "Slug required" }, { status: 400 });

    const category = await Category.findOne({ slug });

    if (!category)
      return NextResponse.json({ message: "Category not found" }, { status: 404 });

    return NextResponse.json({ category });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
