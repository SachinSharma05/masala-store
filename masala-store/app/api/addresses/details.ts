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
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ message: "ID required" }, { status: 400 });

    const address = await Address.findOne({ _id: id, userId: user.id });

    if (!address)
      return NextResponse.json({ message: "Address not found" }, { status: 404 });

    return NextResponse.json({ address });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
