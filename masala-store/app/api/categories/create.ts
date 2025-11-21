import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";

export async function POST(req: Request) {
  try {
    await connectDB();

    const data = await req.json();
    const { name } = data;

    if (!name)
      return NextResponse.json({ message: "Name is required" }, { status: 400 });

    const slug = data.slug || name.toLowerCase().replace(/\s+/g, "-");

    const exists = await Category.findOne({ slug });
    if (exists)
      return NextResponse.json({ message: "Category slug exists" }, { status: 400 });

    const category = await Category.create({ ...data, slug });

    return NextResponse.json({ category }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
