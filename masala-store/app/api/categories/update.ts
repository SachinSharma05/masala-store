import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";

export async function PUT(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({ message: "ID required" }, { status: 400 });

    const data = await req.json();

    const category = await Category.findByIdAndUpdate(id, data, { new: true });

    return NextResponse.json({ category });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
