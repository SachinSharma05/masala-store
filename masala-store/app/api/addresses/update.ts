import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Address from "@/models/Address";
import { verifyToken } from "@/utils/jwt";

export async function PUT(req: Request) {
  try {
    await connectDB();

    const cookie = req.headers.get("cookie");
    const token = cookie?.replace("token=", "");
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user: any = verifyToken(token);
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ message: "ID required" }, { status: 400 });

    const data = await req.json();

    if (data.isDefault) {
      await Address.updateMany(
        { userId: user.id },
        { $set: { isDefault: false } }
      );
    }

    const updated = await Address.findOneAndUpdate(
      { _id: id, userId: user.id },
      data,
      { new: true }
    );

    return NextResponse.json({ updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
