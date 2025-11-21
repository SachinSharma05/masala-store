import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Banner from "@/models/Banner";
import User from "@/models/User";
import { verifyToken } from "@/utils/jwt";

export async function POST(req: Request) {
  try {
    await connectDB();

    const cookie = req.headers.get("cookie");
    const token = cookie?.replace("token=", "");
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded: any = verifyToken(token);
    const admin = await User.findById(decoded.id);
    if (!admin || admin.role !== "admin")
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const data = await req.json();
    if (!data.title || !data.image) return NextResponse.json({ message: "Missing fields" }, { status: 400 });

    const banner = await Banner.create(data);
    return NextResponse.json({ banner }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
