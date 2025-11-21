import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Return from "@/models/Return";

export async function PUT(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const data = await req.json();

    if (!id) return NextResponse.json({ message: "ID required" }, { status: 400 });

    const updated = await Return.findByIdAndUpdate(id, data, { new: true });

    return NextResponse.json({ return: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
