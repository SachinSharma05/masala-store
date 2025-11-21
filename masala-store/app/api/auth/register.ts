import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { hashPassword } from "@/utils/hash";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    if (!email || !password)
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });

    const exists = await User.findOne({ email });
    if (exists)
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });

    const hashed = hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "user",
    });

    return NextResponse.json({ message: "Registered", user }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
