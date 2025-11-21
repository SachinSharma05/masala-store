import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Banner from "@/models/Banner";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const active = searchParams.get("active");

    const filter: any = {};
    if (active === "true") filter.active = true;

    const banners = await Banner.find(filter).sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ banners });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
