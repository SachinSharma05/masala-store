import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Banner from "@/models/Banner";
import User from "@/models/User";
import { verifyToken } from "@/utils/jwt";

export async function PUT(req: Request) {
  try {
    await connectDB();
    const cookie = req.headers.get("cookie");
    const token = cookie?.replace("token=", "");
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded: any = verifyToken(token);
    const admin = await User.findById(decoded.id);
    if (!admin || admin.role !== "admin")
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ message: "ID required" }, { status: 400 });

    const data = await req.json();
    const updated = await Banner.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json({ banner: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
