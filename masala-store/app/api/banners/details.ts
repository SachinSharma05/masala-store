import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Banner from "@/models/Banner";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ message: "ID required" }, { status: 400 });

    const banner = await Banner.findById(id);
    if (!banner) return NextResponse.json({ message: "Not found" }, { status: 404 });

    return NextResponse.json({ banner });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
