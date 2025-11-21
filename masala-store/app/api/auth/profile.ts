import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { verifyToken } from "@/utils/jwt";

export async function PUT(req: Request) {
  try {
    await connectDB();

    const token = req.headers.get("cookie")?.replace("token=", "");
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded: any = verifyToken(token);
    const data = await req.json();

    const user = await User.findByIdAndUpdate(decoded.id, data, { new: true });

    return NextResponse.json({ message: "Updated", user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
