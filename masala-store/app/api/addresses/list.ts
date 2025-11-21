import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Address from "@/models/Address";
import { verifyToken } from "@/utils/jwt";

export async function GET(req: Request) {
  try {
    await connectDB();

    const cookie = req.headers.get("cookie");
    const token = cookie?.replace("token=", "");
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user: any = verifyToken(token);

    const addresses = await Address.find({ userId: user.id }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    return NextResponse.json({ addresses });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
