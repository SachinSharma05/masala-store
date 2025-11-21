import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Address from "@/models/Address";
import { verifyToken } from "@/utils/jwt";

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const cookie = req.headers.get("cookie");
    const token = cookie?.replace("token=", "");
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user: any = verifyToken(token);

    const data = await req.json();

    if (!data.name || !data.phone || !data.address)
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });

    // If new address is default, remove default from others
    if (data.isDefault) {
      await Address.updateMany(
        { userId: user.id },
        { $set: { isDefault: false } }
      );
    }

    const address = await Address.create({
      userId: user.id,
      ...data,
    });

    return NextResponse.json({ address }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
