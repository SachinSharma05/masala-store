import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { verifyToken } from "@/utils/jwt";

export async function GET(req: Request) {
  try {
    await connectDB();
    
    const cookie = req.headers.get("cookie");
    const token = cookie?.replace("token=", "");

    if (!token)
      return NextResponse.json({ message: "Not logged in" }, { status: 401 });

    const decoded: any = verifyToken(token);

    const user = await User.findById(decoded.id).select("-password");

    return NextResponse.json({ user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
